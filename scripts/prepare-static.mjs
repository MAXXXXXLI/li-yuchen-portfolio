import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const staticRoot = path.join(root, "dist", "client");
const workRoot = path.join(staticRoot, "work");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

if (!existsSync(staticRoot)) {
  throw new Error(`Static export directory not found: ${staticRoot}`);
}

if (existsSync(workRoot)) {
  for (const filename of readdirSync(workRoot)) {
    if (!filename.endsWith(".html")) continue;
    const slug = filename.slice(0, -".html".length);
    const routeDirectory = path.join(workRoot, slug);
    mkdirSync(routeDirectory, { recursive: true });
    cpSync(path.join(workRoot, filename), path.join(routeDirectory, "index.html"));
  }
}

if (basePath) {
  const rewriteStaticReferences = (filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    if (extension !== ".html" && extension !== ".css") return;

    const source = readFileSync(filePath, "utf8");
    const rewritten = extension === ".html"
      ? source.replace(/(["'(=])\/(?:_next|projects|og\.png|favicon\.svg|file\.svg|globe\.svg|window\.svg)/g, (match, prefix) => `${prefix}${basePath}${match.slice(prefix.length)}`)
      : source.replace(/url\((\/(?:_next|projects)\/)/g, `url(${basePath}$1`);

    if (rewritten !== source) writeFileSync(filePath, rewritten, "utf8");
  };

  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(entryPath);
      else rewriteStaticReferences(entryPath);
    }
  };

  visit(staticRoot);
}

// GitHub Pages must be told to serve directories beginning with `_` as-is.
writeFileSync(path.join(staticRoot, ".nojekyll"), "", "utf8");

console.log(`Static GitHub Pages files ready in ${staticRoot}`);
