# Design

## Context

站点当前只有 Hero（`id="home"`），主题系统已存在，`ThemeToggle` 以独立固定按钮挂在右上角。页面没有 Projects 或 Contact 区块，也没有全局导航。主 specs 已包含 `hero-section` 与 `theme-switching`。见 `proposal.md` 了解动机。

关键约束：

- 固定导航栏不得遮挡锚点目标标题。
- 不引入新依赖，样式全部使用 Tailwind。
- 平滑滚动必须尊重 `prefers-reduced-motion`。
- 不使用内联 style；组件文件使用 PascalCase。

## Goals / Non-Goals

**Goals:**

- 建立固定、半透明模糊、支持亮暗主题的顶部导航栏。
- 提供三个可平滑跳转且不被导航栏遮挡的锚点目标。
- 将主题切换控件自然整合进导航栏。
- 保证 375px 窄屏不溢出、键盘顺序清晰、导航语义正确。

**Non-Goals:**

- 不实现搜索、下拉菜单、登录注册、汉堡菜单或滚动高亮。
- 不实现 Projects 列表内容、Contact 表单或后端接口。

## Decisions

### 1. 导航栏结构

新增 `Navbar.tsx`，使用 `<header>` 包裹 `<nav aria-label="主导航">`。外层 `fixed top-0 inset-x-0 z-50`，内层 `mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6`。

- 左侧品牌为 `<a href="#home">`，内容取 `profile.name`，窄屏使用 `truncate` 与 `max-w-[40%]` 防止挤压右侧。
- 右侧为 `<ul>` 链接列表（首页 / 项目 / 联系我）与 `ThemeToggle`。
- `ThemeToggle` 移除 `fixed top-4 right-4 z-20`，改为普通流内元素，尺寸在窄屏略缩小。

备选：把导航与品牌拆成两个组件。当前规模不值得，单文件更直接。

### 2. 半透明模糊背景

在 `index.css` 增加 `--nav-bg` 变量（亮色与暗色各一套半透明值），导航栏使用 `bg-[var(--nav-bg)] backdrop-blur-md` 与 `border-b`。模糊为常驻状态，不做滚动触发切换，因此没有任何动画或滚动监听。

降级：`--nav-bg` 本身保持较高不透明度（约 0.75–0.85），即使 `backdrop-filter` 不生效，文字与链接仍然可读。

### 3. 平滑滚动与固定栏偏移

在 `index.css` 中：

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

目标区块统一使用 `scroll-mt-20`（80px，略大于导航栏 64px）。链接使用原生锚点，除初始哈希兜底外不写 JavaScript 滚动逻辑，因此键盘行为、哈希更新与无 JS 场景都自然成立。

CSR 页面首次加载时，浏览器解析 HTML 的阶段目标区块尚未渲染，直接访问带哈希的 URL 不会自动定位。因此在 `App` 挂载后补充一次 `scrollIntoView()` 兜底；默认 `behavior: auto` 会遵循 CSS 的 `scroll-behavior`，reduced motion 下自动变为立即跳转，并同样应用 `scroll-margin`。

备选：`scrollIntoView({ behavior })`。需要额外 JavaScript，且对 reduced motion 的判断与原生 CSS 重复，不采用。

### 4. 目标区块占位实现

新增 `ProjectsSection.tsx` 与 `ContactSection.tsx`：

- `id="projects"` / `id="contact"`，`scroll-mt-20`。
- `min-h-[50vh]`，内容垂直居中，标题使用 `h2`（保持页面唯一 `h1` 在 Hero）。
- 文案使用现有 `--hero-text` / `--hero-text-muted` 变量，自动适配主题。
- 仅标题与一句占位文案，不包含项目卡片、表单或链接。

Hero 的 `<section>` 补充 `scroll-mt-20`。

### 5. 窄屏布局

不做汉堡菜单。通过以下方式保证 375px 可用：

- 品牌 `text-base sm:text-lg`，`truncate max-w-[40%]`。
- 链接 `gap-3 sm:gap-6`，`text-sm sm:text-base`。
- 主题切换 `h-9 w-9 sm:h-10 sm:w-10`。
- 容器 `px-4 sm:px-6`，`justify-between`。

### 6. 无障碍

- `<nav aria-label="主导航">` + `<ul>/<li>`。
- 品牌链接 `aria-label="返回首页"`。
- 所有链接与按钮使用 `focus-visible:outline-*`。
- 导航栏不设置 `tabindex`，不捕获焦点；固定定位不改变 DOM 顺序。

## Risks / Trade-offs

- **固定导航栏遮挡锚点标题** → 所有目标 section 统一 `scroll-mt-20`，并在实测中检查 `#projects` / `#contact`。
- **`backdrop-filter` 兼容性** → 高不透明度背景降级；不使用依赖模糊才能阅读的颜色。
- **375px 下品牌 + 三链接 + 主题按钮过挤** → 品牌截断、紧凑间距与更小按钮；实测 `scrollWidth === 375`。
- **平滑滚动影响前庭敏感用户** → 仅在 `no-preference` 下启用。
- **主题切换按钮移入导航栏后位置/层级冲突** → 移除其 fixed/z-index 样式，统一由导航栏控制层级。
- **直接访问带哈希的 URL 时目标区块尚未渲染** → `App` 挂载后调用 `scrollIntoView()` 兜底；默认 `behavior: auto` 遵循 CSS `scroll-behavior` 与 `scroll-margin`，reduced motion 下立即跳转。

## Migration Plan

1. 新增 `Navbar.tsx`、`ProjectsSection.tsx`、`ContactSection.tsx`。
2. 调整 `ThemeToggle` 定位样式，更新 `App.tsx` 组合顺序。
3. 在 `index.css` 增加导航变量与平滑滚动规则，为 Hero 补充滚动偏移。
4. `npm run build` + 浏览器走查；回滚时还原上述文件即可，无数据迁移。

## Open Questions

无。占位区块内容与真实文案后续由各自变更处理。
