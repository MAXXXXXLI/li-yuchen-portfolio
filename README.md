# 李昱辰｜生成式模型研究作品集

这是一个面向 GitHub Pages 的静态个人研究作品集，聚焦 Diffusion、Flow Matching、可控生成与 AIGC。首页沿用简洁的学术主页布局，项目详情页支持 Markdown、公式、表格、图片和右侧章节目录。

在线访问：[https://maxxxxxli.github.io/li-yuchen-portfolio/](https://maxxxxxli.github.io/li-yuchen-portfolio/)

## 本地预览

需要 Node.js 22.13 或更高版本：

```bash
npm install
npm run dev
```

打开终端中显示的本地地址即可预览。项目详情页可以直接访问：

- `/work/weatherflow/`
- `/work/pc-weather/`
- `/work/msga-edit/`

## 生成静态文件

```bash
npm run build
```

静态文件会生成到 `dist/client`。构建脚本会同时生成 `work/<项目名>/index.html` 和 `.nojekyll`，因此首页点击项目、直接打开项目链接以及 GitHub Pages 的目录路由都可以正常工作。

若使用 GitHub Pages 的项目站点（例如 `username.github.io/research-portfolio`），构建时设置仓库路径：

```bash
NEXT_PUBLIC_BASE_PATH=/research-portfolio npm run build
```

如果使用 Windows PowerShell，请改为：

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/research-portfolio"; npm run build
```

仓库已经附带 `.github/workflows/deploy-pages.yml`。推送到 `main` 后，GitHub Actions 会自动构建并发布 `dist/client`；在仓库设置中将 Pages 的发布来源设为 **GitHub Actions** 即可。

## 内容维护

- 项目简介和首页卡片：`app/project-data.ts`
- 项目正文：`content/*.md`
- 项目图片：`public/projects/`
- 页面样式：`app/globals.css`
