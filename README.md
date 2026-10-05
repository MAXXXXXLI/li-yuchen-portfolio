# 李昱辰｜生成式模型研究作品集

在线访问：[https://maxxxxxli.github.io/li-yuchen-portfolio/](https://maxxxxxli.github.io/li-yuchen-portfolio/)

本仓库保存已经生成好的静态网站。网站内容位于 `site/`，包括个人简介、四个研究项目、项目图片、论文 PDF 和论文图片页。

## 发布

推送到 `main` 后，GitHub Actions 会将 `site/` 复制为 Pages 发布产物并自动部署。

## 本地预览

```bash
cd site
python -m http.server 4173
```

然后访问 `http://localhost:4173/`。

