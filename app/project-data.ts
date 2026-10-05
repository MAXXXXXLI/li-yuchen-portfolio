export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  tags: string[];
  method: string;
};

export const projects: Project[] = [
  {
    slug: "weatherflow",
    title: "WeatherFlow",
    subtitle: "Coordinating Global Weather Style and Local Semantic Response via Velocity Projection",
    summary:
      "自动定位局部语义与全局天气轨迹的冲突，并在采样早期完成隐状态与速度校正，让天气变化落在正确区域。",
    heroImage: "/projects/weatherflow/image-1.png",
    heroAlt: "WeatherFlow 在多种天气和季节下的编辑结果",
    tags: ["Semantic–Style Velocity Conflict", "Conflict Region Tracing", "Semantic–Style Velocity Projection"],
    method: "Rectified Flow · Zero-shot Editing",
  },
  {
    slug: "pc-weather",
    title: "PC-Weather",
    subtitle: "Region-Aware Weather Editing Along a Unified Global Trajectory",
    summary:
      "用反照率稳定材质身份，用区域指令描述道路、车辆、植被等不同响应，再在速度空间注入必要的局部变化。",
    heroImage: "/projects/pc-weather/image-2.png",
    heroAlt: "PC-Weather 与多种图像编辑方法的天气迁移比较",
    tags: ["Intrinsic Anchoring", "Regional Instruction Refinement", "Region-Aware Velocity Composition"],
    method: "Regional Control · Flow Composition",
  },
  {
    slug: "msga-edit",
    title: "MsGA-Edit",
    subtitle: "Structure-Preserving Severe Weather Editing with Multi-Source Guidance",
    summary:
      "把语义、边缘、深度与空间特征注入扩散模型的自注意力，在增强雨雪雾外观时保持道路、车辆与建筑布局。",
    heroImage: "/projects/msga/image-7.png",
    heroAlt: "MsGA-Edit 生成不同强度的雪、雾、沙尘和秋季外观",
    tags: ["Structure-Aware Guidance", "Multi-source Guided Attention", "Depth-Aware Value Injection"],
    method: "Diffusion · Structure Guidance",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
