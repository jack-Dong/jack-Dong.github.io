# jack-Dong.github.io

个人主页静态站点（单页 `index.html`）。

## 结构说明

- 主页文件：`index.html`
- 资源目录：`imgs/`
- 其它附件：论文/项目相关 `pdf`、`pptx`

当前页面已拆分为：

- 个人经历
- 最近消息（非文章动态）
- 随笔（当前 11 篇知乎文章卡片）
- 项目经历
- 论文
- 专利与竞赛

## 本地预览

在项目根目录直接打开 `index.html` 即可预览，或使用任意静态服务器。

## 内容维护

- 更新“最近消息”：编辑 `index.html` 中 `section#about` 下的“最近消息”卡片。
- 更新“随笔”：编辑 `index.html` 中 `section#zhihu-posts` 下的 `essay-card` 列表。
- 新增随笔建议格式：`来源标识 + 标题 + 摘要 + 阅读全文链接`。
- 文章顺序和链接以 <https://www.zhihu.com/people/dongshizhou/posts> 为准。

## 验证

```bash
node --test tests/homepage.test.js
node --check script.js
```

静态测试会检查知乎文章数量、标题链接映射、知乎主页入口和毛玻璃关键样式。

## 部署

该仓库用于 GitHub Pages，推送到默认分支后即可自动更新站点内容。
