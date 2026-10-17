# Tasks

## 1. Phase 1：项目数据与素材

- [x] 1.1 创建 `src/assets/projects/project-1.svg` 至 `project-4.svg`：16:9、主题中性、带项目编号的本地占位图，验证：4 个文件存在且可被 `<img>` 正常显示
- [x] 1.2 创建 `src/content/projects.ts`：定义 `Project` 类型与 4 条占位数据（名称、简介、GitHub 链接、图片 import），验证：`npm run build` 通过且 4 条数据可被导入
- [x] Phase 1 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 2

## 2. Phase 2：卡片与网格布局

- [x] 2.1 创建 `src/components/ProjectCard.tsx`：`article` + `img`（`loading="lazy"`、`alt`、16:9、`onError` 占位降级）+ `h3` 名称 + 简介 + 条件渲染的 GitHub 外链（`target="_blank"`、`rel="noopener noreferrer"`），验证：单卡片内容完整，缺失链接时不渲染空链接
- [x] 2.2 重写 `src/components/ProjectsSection.tsx`：保留 `id="projects"` 与 `scroll-mt-20`，添加 `h2` 标题与 `grid gap-6 sm:grid-cols-2 lg:grid-cols-4`，渲染全部项目，验证：桌面 1×4、平板 2 列、手机 1 列
- [x] 2.3 为卡片添加悬浮微特效（上浮、阴影、边框高亮）与 `motion-reduce` 降级，验证：默认悬浮有位移，reduced motion 下位置不变
- [x] Phase 2 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 3

## 3. Phase 3：集成与验收

- [x] 3.1 验证 Hero CTA 与导航「项目」链接均跳转到新的项目展示区，验证：哈希为 `#projects`，标题距顶部不小于导航栏高度
- [x] 3.2 验证响应式与边界：375/768/1440px 无水平溢出、长名称/简介正常换行、截图加载失败显示占位、空 GitHub 链接不渲染
- [x] 3.3 检查无障碍与图片加载：`h2`/`h3` 层级正确、截图 `alt` 有意义、外链 `rel` 正确、键盘焦点可见、截图带 `loading="lazy"` 且预留宽高比
- [x] 3.4 运行 `npm run build` 与浏览器走查，验证：构建通过、控制台无错误、亮/暗主题下卡片可读
- [x] Phase 3 完成，暂停并总结变更，等待用户 review 确认

## Workflow follow-up

- 用户确认全部 Phase 后，归档该变更并同步主 specs。
