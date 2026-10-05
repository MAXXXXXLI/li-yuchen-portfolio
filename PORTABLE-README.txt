李昱辰研究作品集｜便携使用说明

本项目是静态研究作品集网站，压缩包中包含两部分：

1. li-yuchen-portfolio-source
   完整源代码、Markdown 内容、图片、配置文件和 GitHub Pages 工作流。
   适合继续修改网站内容或重新生成发布文件。

2. li-yuchen-portfolio-static
   已经生成好的静态网站文件，适合直接上传到 GitHub Pages、其他静态托管服务，
   或放在任意本地静态服务器中预览。

在其他电脑上编辑和运行源代码

1. 安装 Node.js 22.13 或更高版本（建议使用 LTS 版本）。
2. 进入 li-yuchen-portfolio-source 文件夹。
3. 在终端运行：npm install
4. 启动开发预览：npm run dev
5. 按终端提示打开本地地址（通常是 http://localhost:3000）。

发布到 GitHub Pages

- 直接发布 li-yuchen-portfolio-static 文件夹中的全部内容即可。
- 如果希望以后每次提交后自动构建，使用源代码中的 .github/workflows/deploy-pages.yml。
- 仓库 Pages 路径不是根域名时，工作流会自动处理项目路径；手动构建时可设置
  NEXT_PUBLIC_BASE_PATH=/仓库名。

本地预览静态文件

浏览器可能会限制直接双击 HTML（file://）时加载模块和资源。推荐在
li-yuchen-portfolio-static 文件夹中启动一个简单的静态服务器，例如：

  python -m http.server 4173

然后访问 http://localhost:4173。上传到 GitHub Pages 后无需额外配置即可访问。
