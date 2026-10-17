# Proposal

## Why

站点当前的 HTML 标题仍是脚手架默认的 `my-website`，没有描述、canonical、社交分享元数据或 robots.txt。搜索引擎与社交平台无法获得准确的站点身份信息，分享链接也缺少标题、摘要与配图。需要补齐基础 SEO 与社交身份支持。

## What Changes

- 在 `index.html` 设置站点标题、描述、`lang`、`meta robots` 与 canonical。
- 添加 Open Graph 与 Twitter Card 元数据（标题、描述、类型、URL、图片）。
- 生成 1200×630 的本地社交分享图 `public/og-image.png`。
- 新增 `public/robots.txt`，显式允许 Googlebot 与所有爬虫索引。
- 对现有 HTML 做语义化审查：地标、标题层级、图片 `alt`、外链 `rel`、控件可访问名称；发现阻断问题时修复。
- 站点 URL 暂用占位符 `https://example.com/my-website/`，后续替换为真实部署地址。

## Capabilities

### New Capabilities

- `seo-metadata`: 文档标题与描述、canonical、robots 指令、Open Graph 与 Twitter Card、社交分享图与 robots.txt 的可索引行为。
- `semantic-html`: 页面地标、标题层级、图片替代文本、外链与控件语义等基础可访问性要求。

### Modified Capabilities

无。各区块的结构与行为不变，仅补充文档级元数据并进行语义审查。

## Impact

- 文件：`index.html`、`public/robots.txt`、`public/og-image.png`。
- 可能的小范围语义修复：若审查发现地标、标题或 `alt` 缺失，将补充对应属性；当前代码预期无需结构性改动。
- 现有功能：页面渲染、导航、主题、项目展示与锚点行为不变。
- 依赖：不新增运行时依赖。
- 部署：`robots.txt` 与分享图随 `public/` 一起发布；占位 URL 必须在正式部署前替换。

## Out of Scope

以下内容严禁在本次变更中实现：

- `sitemap.xml`、提交搜索引擎或 Search Console 验证。
- JSON-LD 结构化数据（本次仅 Open Graph + Twitter Card）。
- 分析统计、埋点或第三方追踪脚本。
- 多语言 `hreflang`、RSS、AMP。
- 真实站点 URL、域名或部署配置变更；不修改 Vite base path。
- 页面内容、布局或组件行为的改动。

## Assumptions

- 站点 URL 使用占位符 `https://example.com/my-website/`，与 GitHub Pages base path 形状保持一致。
- 标题为「Young.Chou | 前端工程师与独立开发者」，描述围绕个人品牌与项目展示撰写。
- 社交分享图使用站点现有深色科技风视觉，尺寸 1200×630。
- 语义审查只修复阻断可访问性的问题，不进行大规模重构。
