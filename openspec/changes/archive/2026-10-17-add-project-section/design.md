# Design

## Context

站点已有 Hero、固定导航栏与一个最简的 `#projects` 占位区块（`ProjectsSection.tsx`）。Hero CTA 与导航「项目」链接都已指向 `#projects`，`scroll-mt-20` 已应用。主 specs 包含 `hero-section`、`theme-switching`、`site-navigation`。见 `proposal.md` 了解动机与已确认的默认假设。

关键约束：

- 保留 `id="projects"` 与 `scroll-mt-20`，不改 Hero CTA 的 href。
- 截图必须懒加载并预留空间；不支持依赖新运行时包。
- 悬浮特效应在 reduced motion 下取消位移。
- 样式使用 Tailwind，禁止内联 style；组件 PascalCase。

## Goals / Non-Goals

**Goals:**

- 用数据驱动的卡片网格替换占位区块，至少展示 4 个项目。
- 卡片包含截图、名称、简介与 GitHub 外链，并具备图片降级。
- 悬浮微特效明显但不夸张，且尊重 reduced motion。
- 保持导航与 Hero CTA 的锚点、滚动偏移、主题适配和无障碍行为不变。

**Non-Goals:**

- 不实现详情页、搜索、筛选、排序、分页、轮播或图片缩放。
- 不接入后端、CMS 或真实项目内容。

## Decisions

### 1. 数据模型与占位素材

新增 `src/content/projects.ts`：

```ts
export type Project = {
  id: string
  name: string
  description: string
  githubUrl: string
  image: string
}
```

导出 `projects: Project[]`，包含 4 条占位数据。截图放在 `src/assets/projects/project-1.svg` 至 `project-4.svg`，在数据文件中通过 `import` 引入，确保 Vite 按 base path 生成正确 URL。SVG 为 16:9，带渐变与项目编号，避免依赖外部图片服务。

### 2. 组件拆分与网格

- 新增 `ProjectCard.tsx`：单张卡片。
- 重写 `ProjectsSection.tsx`：`<section id="projects" class="scroll-mt-20">`，内部 `mx-auto max-w-6xl px-4 sm:px-6`，标题 `h2`，网格 `grid gap-6 sm:grid-cols-2 lg:grid-cols-4`。
- 手机 1 列、平板 2 列、桌面 1×4，与规格一致。桌面加宽到 `max-w-6xl`，为 4 列卡片保留可用宽度。
- 每张卡片使用 `<article>`，项目名称用 `h3`，保持唯一 `h1` 在 Hero。

### 3. 卡片内容与样式

卡片结构：

```
article (flex flex-col)
├── img (loading="lazy", aspect-video, object-cover, alt="<名称> 截图")
└── div (flex flex-1 flex-col p-5)
    ├── h3 项目名称
    ├── p  项目简介
    └── a  GitHub（mt-auto，target="_blank" rel="noopener noreferrer"）
```

主题通过 Tailwind `dark:` 与现有变量实现：`bg-white dark:bg-slate-900`、`border-slate-200 dark:border-slate-800`、文字使用 `--hero-text` / `--hero-text-muted`。`githubUrl` 为空时不渲染链接。

### 4. 截图懒加载与降级

`<img loading="lazy" width="640" height="360" class="aspect-video w-full object-cover">` 预留 16:9 空间，避免 CLS。使用 `onError` 将图片替换为占位块（项目首字母 + 主题背景），保持卡片结构与高度不变。`alt` 使用「项目名称 + 截图」。

### 5. 悬浮微特效

卡片默认 `shadow-sm`，悬浮时 `hover:-translate-y-1 hover:shadow-lg hover:border-cyan-400`。使用 `transition` 平滑过渡；通过 `motion-reduce:hover:translate-y-0!` 与 `motion-reduce:transition-none!` 提升优先级，覆盖悬浮位移与过渡，在 reduced motion 下仅保留边框/阴影状态变化。

说明：上一变更禁止动画，本次变更显式要求悬浮微特效，范围以本变更的 `project-showcase` 规格为准；除此之外不新增其他动画。

### 6. 锚点与集成

`ProjectsSection` 继续作为 `#projects` 目标，保留 `scroll-mt-20`。Hero CTA 与导航链接无需改代码，只做回归验证。`#contact` 占位区块保持不变。

## Risks / Trade-offs

- **图片加载失败导致卡片塌陷** → 固定宽高比 + `onError` 占位块。
- **悬浮位移对前庭敏感用户不友好** → `motion-reduce` 取消位移与过渡。
- **长名称/简介撑破卡片** → 正常换行，容器 `min-w-0`，实测 375px。
- **占位数据被误认为真实内容** → 统一占位文案与 URL，后续通过 `projects.ts` 替换。
- **修改 `#projects` 语义影响导航规格** → 通过 `site-navigation` 的 MODIFIED delta 显式记录。
- **SVG 资源路径在 GitHub Pages 下失效** → 使用 `import` 由 Vite 处理 base path。

## Migration Plan

1. 新增 SVG 占位素材与 `projects.ts`。
2. 新增 `ProjectCard.tsx`，重写 `ProjectsSection.tsx`。
3. `npm run build` + 浏览器走查；回滚时还原上述文件即可，无数据迁移。

## Open Questions

无。真实项目内容与链接后续替换 `projects.ts` 与素材文件。
