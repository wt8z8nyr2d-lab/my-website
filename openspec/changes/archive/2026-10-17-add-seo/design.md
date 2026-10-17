# Design

## Context

`index.html` 已有 `lang="zh-CN"`、`color-scheme`、视口与 favicon，但标题仍是脚手架默认的 `my-website`，没有描述、canonical、社交元数据。`public/` 下只有 `favicon.svg`，没有 robots.txt 或分享图。当前组件已使用 `header`/`nav`/`main`/`section`、单个 `h1`、`h2`/`h3` 层级、图片 `alt` 与外链 `rel`，语义审查预计无需结构性改动。见 `proposal.md` 了解动机与假设。

关键约束：

- 元数据必须写在静态 HTML 中，保证不执行 JavaScript 的爬虫也能读取。
- 不新增依赖，不改 Vite base path，不改页面布局。
- 占位域名必须集中可替换。

## Goals / Non-Goals

**Goals:**

- 提供完整的 title、description、canonical、robots 与 OG/Twitter 元数据。
- 提供可索引的 robots.txt 与 1200×630 本地分享图。
- 完成语义审查并修复任何阻断性问题。
- 保持现有页面行为与构建流程不变。

**Non-Goals:**

- 不实现 sitemap、JSON-LD、分析统计、Search Console 验证或 hreflang。
- 不修改真实域名、部署配置或页面内容。

## Decisions

### 1. 静态元数据写入 `index.html`

在 `<head>` 中集中写入以下元数据（描述文案可再精简，但必须非空）：

```html
<title>Young.Chou | 前端工程师与独立开发者</title>
<meta name="description" content="Young.Chou 的个人品牌站：前端工程师、独立开发者，展示项目作品、技术实践与个人简介。" />
<meta name="author" content="Young.Chou" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://example.com/my-website/" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Young.Chou" />
<meta property="og:title" content="Young.Chou | 前端工程师与独立开发者" />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://example.com/my-website/" />
<meta property="og:image" content="https://example.com/my-website/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="zh_CN" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="https://example.com/my-website/og-image.png" />
```

不使用 React `useEffect` 动态设置标题：静态 HTML 对所有爬虫最可靠，也避免首屏标题闪烁。占位域名 `https://example.com` 集中出现在 canonical、`og:url`、`og:image`、`twitter:image` 四处，后续统一替换。

### 2. robots.txt

新增 `public/robots.txt`：

```text
User-agent: Googlebot
Allow: /

User-agent: *
Allow: /
```

Vite 会将 `public/` 内容复制到构建产物，部署后位于 `/my-website/robots.txt`。不写 `Sitemap:` 行，因为本次不创建 sitemap，避免指向不存在的资源。

### 3. 社交分享图

生成 1200×630 PNG，保存为 `public/og-image.png`。生成方式为一次性本地渲染（深色渐变 + 姓名 + 职业 + 站点标识），通过无头浏览器截图输出，不纳入构建流程。选择 PNG 而非 SVG，因为主流社交平台对 SVG 分享图支持不稳定。

### 4. 语义审查清单

审查范围限定为当前已应用的页面，不包含其他进行中的变更：

- 地标：`header`、`nav[aria-label]`、`main`。
- 标题：唯一 `h1`，区块 `h2`，卡片 `h3`。
- 图片：内容图片有 `alt`；装饰层 `aria-hidden="true"`。
- 链接：外链 `target="_blank"` + `rel="noopener noreferrer"`。
- 控件：主题切换与导航链接有可访问名称、可见焦点。

当前代码逐项符合预期；若实施时发现偏差，只做最小修复，不重构布局。

## Risks / Trade-offs

- **占位域名导致 canonical / og:url 指向错误站点** → 在 proposal 与任务中标注必须替换；正式部署前统一替换 `example.com`。
- **GitHub Pages 子路径下 robots.txt 不在域名根目录** → Google 只会读取域名根目录的 robots.txt；页面同时提供 `meta robots: index, follow` 作为保障。
- **分享图使用绝对占位 URL** → 域名替换后需同步更新，社交平台可能缓存旧图。
- **元数据与页面内容不一致** → 标题与描述基于当前品牌信息，后续改名时需同步更新。
- **description 过长被截断** → 控制在约 80–120 个中文字符内。
- **社交平台缓存** → 更新后可重新抓取；本次不做验证工具接入。

## Migration Plan

1. 更新 `index.html` 的 `<head>` 元数据。
2. 新增 `public/robots.txt` 与 `public/og-image.png`。
3. 执行语义审查并按需最小修复。
4. `npm run build` + 浏览器/DOM 检查；回滚时还原上述文件即可。

## Open Questions

无。真实域名与最终分享图内容由后续内容更新处理。
