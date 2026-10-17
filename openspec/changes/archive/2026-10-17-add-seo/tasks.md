# Tasks

## 1. Phase 1：基础元数据与 robots.txt

- [x] 1.1 更新 `index.html`：设置正式 `<title>`、`meta description`、`meta author`、`meta robots=index, follow` 与绝对 URL 的 canonical，验证：构建产物中标题不再为 `my-website`，描述非空且仅一条 canonical
- [x] 1.2 新增 `public/robots.txt`：分别允许 `Googlebot` 与 `*`，无阻断性 `Disallow`，验证：开发服务器请求 `/robots.txt` 返回 200 且内容正确
- [x] Phase 1 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 2

## 2. Phase 2：社交元数据与分享图

- [x] 2.1 在 `index.html` 添加 Open Graph 标签（type/site_name/title/description/url/image/尺寸/locale），验证：DOM 中 `og:image` 为绝对 URL 且尺寸标注为 1200×630
- [x] 2.2 添加 Twitter Card 标签（card/title/description/image），验证：`twitter:card` 为 `summary_large_image`，图片 URL 与 OG 一致
- [x] 2.3 生成本地 `public/og-image.png`（1200×630，深色品牌视觉），验证：文件存在、PNG 格式、尺寸准确
- [x] Phase 2 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 3

## 3. Phase 3：语义审查与验收

- [x] 3.1 审查地标与标题层级：`header`/`nav[aria-label]`/`main`、唯一 `h1`、区块 `h2`、卡片 `h3`，验证：标题大纲连续无跳级
- [x] 3.2 审查图片与外链语义：内容图片 `alt`、装饰层 `aria-hidden`、外链 `target`/`rel`、控件可访问名称，验证：无缺失或错误属性；发现问题时做最小修复
- [x] 3.3 运行 `npm run build` 并在浏览器中核对 title/description/canonical/OG/Twitter/robots.txt/分享图，验证：构建通过、控制台无错误、占位域名已集中标注
- [x] Phase 3 完成，暂停并总结变更，等待用户 review 确认

## Workflow follow-up

- 用户确认全部 Phase 后，归档该变更并同步主 specs。
