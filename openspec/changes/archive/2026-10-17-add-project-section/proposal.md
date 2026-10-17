# Proposal

## Why

上一变更在 `#projects` 位置只创建了最简占位区块，访客无法看到任何项目内容。需要把它替换为完整的项目展示区，让 Hero 的 CTA 与顶部导航的「项目」链接真正落到有信息价值的区块上。

## What Changes

- 在 Hero 下方新增项目展示区，保留锚点 `id="projects"` 与 `scroll-mt-20`。
- 使用卡片网格展示至少 4 个项目；每张卡片包含截图、项目名称、项目简介与 GitHub 链接。
- 新增 `src/content/projects.ts` 作为项目数据源，先使用 4 条占位数据。
- 截图使用本地 SVG 占位图，并通过 `loading="lazy"` 延迟加载。
- 鼠标悬浮卡片时提供上浮、阴影加深与边框高亮的微特效；reduced motion 下取消位移。
- Hero CTA 已指向 `#projects`，本次保持该锚点不变并验证跳转；顶部导航的「项目」链接同步生效。
- 修改 `site-navigation` 主规格：`#projects` 从「最简占位区块」变为「项目展示区」，`#contact` 仍为占位区块。

## Capabilities

### New Capabilities

- `project-showcase`: 项目展示区的位置与网格布局、卡片内容、截图加载与降级、悬浮微特效、响应式与无障碍。

### Modified Capabilities

- `site-navigation`: 修改「导航链接跳转目标区块」需求，`#projects` 现在指向项目展示区而非最简占位区块。

## Impact

- 代码：重写 `src/components/ProjectsSection.tsx`；新增 `src/components/ProjectCard.tsx`、`src/content/projects.ts`、`src/assets/projects/*.svg`。
- 现有功能：Hero CTA 与导航「项目」链接的目标从占位区块变为完整展示区；`#home`、`#contact` 与主题切换行为不变。
- 依赖：不新增运行时依赖。
- 性能：截图使用本地资源、`loading="lazy"` 与固定宽高比，避免首屏阻塞和布局偏移。
- 部署：图片通过 `import` 引入，兼容 GitHub Pages 的 `/my-website/` base path。

## Out of Scope

以下内容严禁在本次变更中实现：

- 项目详情页：不新增任何项目详情路由或弹层。
- 项目搜索功能：不新增搜索框、筛选或过滤。
- 分类、标签、排序或分页。
- 后端、CMS 或远程数据接口。
- 真实项目内容：本次使用占位文案、占位截图与占位 GitHub 链接，后续替换。
- 图片悬浮缩放、跑马灯或轮播。
- 导航栏活跃链接高亮。

## Assumptions

- 「项目的见解」按「项目简介」处理：每张卡片一到两句描述。
- 悬浮微特效采用卡片上浮 + 阴影 + 边框高亮，不做图片缩放。
- 桌面端采用 1×4 网格，平板 2 列，手机 1 列。
- 占位 GitHub 链接统一指向 `https://github.com/`，由后续内容替换。
