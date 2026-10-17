# Proposal

## Why

个人品牌站目前仍是 Vite 默认占位页（计数器示例），没有任何品牌展示内容。访客打开站点后无法获知站点主人的身份与定位，也无法快速进入项目列表。需要先建立首屏 Hero，作为品牌站的第一入口。

## What Changes

- 新增全屏高度 Hero 区块：居中展示姓名、职业、一句话介绍。
- 新增 CTA 按钮，使用锚点跳转到 `#projects`（Projects 区块本身不在本次范围）。
- 新增背景层：CSS 渐变底色 + Canvas 粒子缓慢漂移叠加。
- 新增亮/暗主题系统：支持手动切换、持久化偏好、默认跟随系统。
- 新增内容配置文件 `src/content/profile.ts`，姓名/职业/介绍先使用占位文案。
- 替换现有 `src/App.tsx` 中的 Vite 占位内容。

## Capabilities

### New Capabilities

- `hero-section`: 首屏 Hero 的品牌信息展示、CTA 锚点跳转、渐变加缓慢漂移粒子背景，以及响应式与无障碍行为。
- `theme-switching`: 亮/暗主题的切换、持久化、跟随系统偏好，以及首屏无闪烁加载。

### Modified Capabilities

无。项目当前没有已归档的 specs。

## Impact

- 代码：`src/App.tsx`、`src/index.css`、`src/main.tsx`、`index.html`；新增 `src/components/`、`src/content/`、`src/hooks/`（或 `src/theme/`）。
- 现有功能：Vite 默认计数器示例被移除。项目当前无其他业务功能，不影响既有用户流程。
- 依赖：不新增运行时依赖，粒子层使用原生 Canvas 实现。
- 配置：需要为 Tailwind CSS v4 增加 class 模式的 `dark` variant 定义。
- 部署：不改变 GitHub Pages 的 base path；Hero 中不引用绝对根路径资源。

## Out of Scope

以下内容严禁在本次变更中实现：

- 其他动画效果：除粒子背景的缓慢漂移外，不做入场动画、视差、滚动动画或 CSS 关键帧动画。
- 导航栏：不新增 Navbar、移动端菜单或任何固定导航。
- 后端 API：不新增后端服务、接口调用或数据持久化服务。
- Projects 区块：本次只提供 `#projects` 锚点目标约定，不实现项目列表内容。
- 其他页面区块：不实现 About、Contact、Footer 等区块。
- 真实个人文案：本次使用占位文案，正式内容后续替换。
