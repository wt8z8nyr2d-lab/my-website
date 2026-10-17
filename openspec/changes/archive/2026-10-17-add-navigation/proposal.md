# Proposal

## Why

当前站点只有首屏 Hero，访客无法快速前往项目或联系信息，也没有全局品牌入口。需要一个固定顶部导航栏，让访客在浏览任意位置时都能回到首页、前往项目或联系区块。

## What Changes

- 新增固定顶部导航栏：左侧显示姓名品牌，右侧提供「首页 / 项目 / 联系我」三个锚点链接。
- 导航栏使用半透明背景 + `backdrop-blur`，滚动内容经过其下方时产生背景模糊。
- 点击导航链接平滑滚动到对应 section，并预留固定导航栏高度的滚动偏移。
- 新增最简 Projects 与 Contact 占位 section（仅 id、标题和占位文案），作为导航目标。
- 将现有 `ThemeToggle` 从独立固定按钮整合进导航栏右侧。
- 窄屏下压缩品牌与链接间距，三个链接保持平铺可见，不做汉堡菜单。

## Capabilities

### New Capabilities

- `site-navigation`: 固定导航栏、品牌入口、三组锚点链接、平滑滚动与固定栏偏移、半透明模糊背景、响应式与键盘无障碍，以及导航目标区块的存在性。

### Modified Capabilities

无。`hero-section` 与 `theme-switching` 的需求不变；本次仅调整 `ThemeToggle` 的挂载位置。

## Impact

- 代码：`src/App.tsx`、`src/index.css`、`src/components/ThemeToggle.tsx`、`src/components/HeroSection.tsx`（补充滚动偏移）；新增 `src/components/Navbar.tsx`、`src/components/ProjectsSection.tsx`、`src/components/ContactSection.tsx`。
- 现有功能：CTA 的 `#projects` 目标从“不存在”变为真实存在，Hero 行为不变；主题切换逻辑不变，仅位置移入导航栏。
- 依赖：不新增运行时依赖。
- 部署：不涉及资源路径或 base path 变化。
- 风险：固定导航栏需要为锚点目标预留高度，避免标题被遮挡。

## Out of Scope

以下内容严禁在本次变更中实现：

- 搜索：不新增搜索框、搜索快捷键或结果面板。
- 多级下拉菜单：不新增任何下拉、二级菜单或大型 mega menu。
- 用户登录与注册：不新增账号、认证或任何用户系统。
- 汉堡菜单与移动端抽屉：窄屏只做紧凑平铺链接。
- 活跃链接高亮：不实现基于滚动位置的高亮状态。
- Projects 项目列表内容、Contact 联系表单或后端接口：只做最简占位区块。
- 其他页面区块、Footer 或路由库。
