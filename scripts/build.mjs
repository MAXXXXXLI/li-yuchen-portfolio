import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "site");
const output = path.join(root, "dist", "client");

rmSync(path.join(root, "dist"), { recursive: true, force: true });
mkdirSync(path.dirname(output), { recursive: true });
cpSync(source, output, { recursive: true });

console.log(`Static site ready in ${output}`);

