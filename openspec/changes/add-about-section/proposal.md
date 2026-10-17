# Proposal

## Why

站点目前只有 Hero、项目展示与联系占位，缺少对站点主人的背景介绍。访客无法了解「我是谁」，个人品牌的可信度不足。需要新增「关于我」区域，用照片、个人简介与品牌标签补齐这一段叙事。

## What Changes

- 在 Hero 与 Projects 之间新增「关于我」区域。
- 左侧展示个人照片，右侧展示 3 段个人简介。
- 区域下方展示品牌标签「快乐蜂」。
- 新增 `src/content/about.ts` 作为简介与品牌标签的数据源，先使用占位文案。
- 照片使用本地占位素材，`loading="lazy"`，并提供加载失败降级。
- 桌面端左右两栏，移动端上下堆叠；自动适配亮/暗主题。
- 不修改顶部导航，不新增「关于」链接。

## Capabilities

### New Capabilities

- `about-section`: 「关于我」区域的位置与布局、照片展示与降级、3 段个人简介、品牌标签，以及响应式、主题与无障碍行为。

### Modified Capabilities

无。新增区块不改变 Hero、导航、项目展示或主题切换的现有需求。

## Impact

- 代码：更新 `src/App.tsx`；新增 `src/components/AboutSection.tsx`、`src/content/about.ts`、`src/assets/about/portrait.svg`。
- 现有功能：Hero、导航、Projects、Contact 与主题切换行为不变；新增区块插入后各锚点仍可正常跳转。
- 依赖：不新增运行时依赖。
- 性能：照片懒加载并预留固定宽高比，避免首屏阻塞与布局偏移。
- 部署：照片通过 `import` 引入，兼容 GitHub Pages 的 `/my-website/` base path。

## Out of Scope

以下内容严禁在本次变更中实现：

- 联系我的表单：不新增任何表单、输入框或提交逻辑。
- 导航栏「关于」链接或活跃高亮。
- 真实个人照片与真实简介文案：本次使用占位素材与占位文案。
- 动画、轮播、照片切换或多图相册。
- 后端、CMS 或远程内容接口。
- 社交链接、简历下载或技能进度条。

## Assumptions

- 「关于我」放置在 Hero 与 Projects 之间，锚点为 `id="about"`。
- 照片使用本地 SVG 占位头像，后续替换为真实照片。
- 「快乐蜂」作为纯文本品牌标签展示，不附带链接。
- 个人简介为 3 段占位文案，中文书写。
