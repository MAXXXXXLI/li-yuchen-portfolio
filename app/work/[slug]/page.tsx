import type { Metadata } from "next";
import { notFound } from "next/navigation";
import msgaEditMarkdown from "../../../content/msga-edit.md?raw";
import pcWeatherMarkdown from "../../../content/pc-weather.md?raw";
import weatherFlowMarkdown from "../../../content/weatherflow.md?raw";
import { getProject, projects } from "../../project-data";
import MarkdownProject from "./project-detail";

const markdownBySlug: Record<string, string> = {
  "msga-edit": msgaEditMarkdown,
  "pc-weather": pcWeatherMarkdown,
  weatherflow: weatherFlowMarkdown,
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project
    ? { title: project.title, description: project.summary }
    : { title: "项目" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const markdown = markdownBySlug[slug];

  if (!project || !markdown) {
    notFound();
  }

  return <MarkdownProject project={project} markdown={markdown} />;
}
