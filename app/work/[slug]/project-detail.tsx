"use client";

import { Children, isValidElement, type ReactNode, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { Project } from "../../project-data";
import { sitePath } from "../../site-path";

type TocItem = {
  id: string;
  title: string;
  level: number;
};

function plainText(value: ReactNode): string {
  return Children.toArray(value)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) return plainText(child.props.children);
      return "";
    })
    .join("");
}

function headingId(title: string) {
  return title
    .replace(/<[^>]+>/g, "")
    .replace(/[\\`*_~]/g, "")
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function extractToc(markdown: string): TocItem[] {
  return Array.from(markdown.matchAll(/^(#{2,4})\s+(.+)$/gm)).map((match) => {
    const title = match[2].replace(/[*_`]/g, "").trim();
    return { id: headingId(title), title, level: match[1].length };
  });
}

function resolveProjectImage(slug: string, src?: string) {
  if (!src || /^(https?:|data:)/.test(src)) return src;
  const folder = slug === "msga-edit" ? "msga" : slug;
  const file = decodeURIComponent(src).replaceAll(" ", "-");
  return sitePath(`/projects/${folder}/${file}`);
}

export default function MarkdownProject({
  project,
  markdown,
}: {
  project: Project;
  markdown: string;
}) {
  const normalizedMarkdown = useMemo(
    () =>
      markdown
        .replace(/\\\[/g, () => "\n$$\n")
        .replace(/\\\]/g, () => "\n$$\n")
        .replace(/\\\(/g, "$")
        .replace(/\\\)/g, "$"),
    [markdown],
  );
  const toc = useMemo(() => extractToc(normalizedMarkdown), [normalizedMarkdown]);
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    const headings = toc
      .map(({ id }) => document.getElementById(id))
      .filter((heading): heading is HTMLElement => Boolean(heading));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-14% 0px -72% 0px", threshold: [0, 1] },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [toc]);

  const heading = (level: 2 | 3 | 4) =>
    function Heading({ children }: { children?: ReactNode }) {
      const text = plainText(children);
      const Tag = `h${level}` as "h2" | "h3" | "h4";
      return <Tag id={headingId(text)}>{children}</Tag>;
    };

  return (
    <main className="markdown-page">
      <header className="project-topbar">
        <a href={sitePath("/#work")}>← Back</a>
        <span>{project.method}</span>
        <a href="#top">Top ↑</a>
      </header>

      <div className="project-shell" id="top">
        <article className="markdown-article">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              h2: heading(2),
              h3: heading(3),
              h4: heading(4),
              img: ({ src, alt }) => (
                <figure className="markdown-figure">
                  <img src={resolveProjectImage(project.slug, src)} alt={alt ?? "项目图示"} />
                  {alt && <figcaption>{alt}</figcaption>}
                </figure>
              ),
              p: ({ children, node }) => {
                const firstChild = Children.toArray(children)[0];
                const firstNode = (node as { children?: Array<{ tagName?: string; type?: string }> } | undefined)?.children?.[0];
                if (
                  firstNode?.type === "element" &&
                  firstNode.tagName === "img"
                ) {
                  return <>{children}</>;
                }
                if (isValidElement(firstChild) && (firstChild.type === "figure" || firstChild.type === "img")) {
                  return <>{children}</>;
                }
                return <p>{children}</p>;
              },
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="table-scroll">
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {normalizedMarkdown}
          </ReactMarkdown>
        </article>

        <aside className="project-toc" aria-label="文章目录">
          <p>Contents</p>
          <nav>
            {toc.map((item) => (
              <a
                key={`${item.level}-${item.id}`}
                href={`#${item.id}`}
                className={`toc-level-${item.level} ${activeId === item.id ? "is-active" : ""}`}
                aria-current={activeId === item.id ? "location" : undefined}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </main>
  );
}
