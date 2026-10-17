# Tasks

## 1. Phase 1：导航栏基础

- [x] 1.1 创建 `src/components/Navbar.tsx`：固定顶部、左侧品牌链接（`profile.name`）、右侧三个锚点链接与 `ThemeToggle`，验证：`npm run build` 通过且导航栏渲染在页面顶部
- [x] 1.2 在 `src/index.css` 增加导航背景变量，并为导航栏应用半透明背景、`backdrop-blur-md` 与底边框，验证：亮/暗主题下文字清晰，滚动时内容在导航栏下方呈现模糊
- [x] 1.3 调整 `ThemeToggle` 移除独立 fixed 定位，改为导航栏内元素，验证：切换按钮仍可操作且不与链接重叠
- [x] 1.4 实现窄屏紧凑布局（品牌截断、紧凑间距、缩小按钮），验证：375px 下 `scrollWidth === 375` 且三链接与主题按钮全部可见
- [x] Phase 1 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 2

## 2. Phase 2：目标区块与平滑滚动

- [x] 2.1 创建 `src/components/ProjectsSection.tsx` 与 `src/components/ContactSection.tsx`：分别带 `id="projects"`、`id="contact"`、`h2` 标题与占位文案，验证：页面存在两个目标区块且各自只有一个 `h2`
- [x] 2.2 更新 `src/App.tsx` 组合顺序为 Navbar + Hero + Projects + Contact，并为 Hero 增加 `scroll-mt-20`，验证：三组链接均有真实目标
- [x] 2.3 在 `src/index.css` 增加仅在 `prefers-reduced-motion: no-preference` 下生效的 `scroll-behavior: smooth`，为目标区块统一添加滚动偏移，验证：默认平滑滚动、reduced motion 下立即跳转、标题不被导航栏遮挡
- [x] Phase 2 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 3

## 3. Phase 3：无障碍与验收

- [x] 3.1 检查导航语义与焦点：`nav aria-label="主导航"`、`ul/li` 结构、品牌 `aria-label`、所有交互元素 `focus-visible`，验证：Tab 顺序为品牌→三个链接→主题切换，焦点样式可见
- [x] 3.2 验证导航栏主题适配：切换亮/暗主题后背景与文字即时更新，验证：两种主题下品牌与链接对比度达到 WCAG AA
- [x] 3.3 运行 `npm run dev` 走查：点击三个链接跳转、直接访问 `#projects` / `#contact`、背景模糊、主题切换，验证：控制台无错误，375/768/1440px 无水平溢出
- [x] 3.4 验证 reduced motion 与固定栏偏移：模拟 `prefers-reduced-motion: reduce` 后点击链接立即跳转，验证：标题完整位于导航栏下方
- [x] Phase 3 完成，暂停并总结变更，等待用户 review 确认

## Workflow follow-up

- 用户确认全部 Phase 后，归档该变更并同步主 specs。
