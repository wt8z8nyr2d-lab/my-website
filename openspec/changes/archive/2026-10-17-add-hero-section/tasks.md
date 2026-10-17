# Tasks

## 1. Phase 1：主题基础

- [x] 1.1 在 `src/index.css` 中定义 `@custom-variant dark (&:where(.dark, .dark *))` 及 Hero 相关 CSS 变量（渐变、粒子颜色、文字色），验证：在浏览器 DevTools 手动给 `<html>` 加 `dark` class 后，使用 `dark:` 类的元素样式立即变化
- [x] 1.2 在 `index.html` 中加入首屏主题内联脚本与 `color-scheme` meta，验证：分别预设 `localStorage` 亮/暗偏好后刷新，首帧即呈现对应主题，无白屏闪烁
- [x] 1.3 实现 `src/theme/ThemeProvider.tsx`（context + hook）：读取当前主题、切换、持久化、跟随系统、监听 `storage` 事件，验证：手动切换后刷新保持选择，另一标签页同步变化
- [x] 1.4 实现 `src/components/ThemeToggle.tsx`，使用原生 button，带 `aria-label`、`aria-pressed` 与 `focus-visible` 样式，验证：Tab 可达、Enter/Space 可切换、屏幕阅读器可读出状态
- [x] Phase 1 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 2

## 2. Phase 2：Hero 内容与布局

- [x] 2.1 创建 `src/content/profile.ts`，写入姓名、职业、介绍的占位文案与类型定义，验证：文件可被 TypeScript 正常导入，空字符串字段不会使页面崩溃
- [x] 2.2 实现 `src/components/HeroSection.tsx`：`min-h-svh` 全屏布局、内容居中、唯一 `h1` 展示姓名，验证：桌面与移动视口下内容居中且不被浏览器工具栏裁切
- [x] 2.3 在 Hero 中加入 CTA 原生锚点链接 `href="#projects"`，验证：点击后 URL 哈希变为 `#projects` 且无控制台异常；键盘聚焦时有可见焦点样式
- [x] 2.4 为 Hero 文案与 CTA 添加响应式字号与间距，验证：在 375px、768px、1440px 宽度下无溢出、无水平滚动条
- [x] Phase 2 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 3

## 3. Phase 3：静态渐变与粒子背景

- [x] 3.1 在 Hero 中实现 CSS 渐变背景层与内容层叠放（内容 `relative z-10`，背景 `absolute inset-0`），验证：背景不遮挡点击与文字选中，亮暗主题下渐变均可见
- [x] 3.2 实现 `src/components/ParticleCanvas.tsx`：按容器面积计算数量、DPR 上限 2、一次性绘制静态粒子与连线、从 CSS 变量读取颜色，验证：页面加载后粒子显示且无任何位置变化
- [x] 3.3 为粒子层添加 `ResizeObserver` 重绘与主题变化重绘，验证：缩放窗口或切换主题后粒子重新适配且颜色更新
- [x] 3.4 为 Canvas 绘制添加异常捕获与 `aria-hidden`、`pointer-events-none`，验证：模拟 Canvas 绘制失败时渐变与文案仍显示；辅助技术不朗读装饰层
- [x] Phase 3 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 4

## 4. Phase 3.5：粒子缓慢漂移

- [x] 4.1 将 `ParticleCanvas` 改为 rAF + delta time 的缓慢漂移，速度限制在约 6–16 px/s 并做边缘环绕，验证：粒子连续缓慢移动，无突跳或闪烁
- [x] 4.2 在 `prefers-reduced-motion: reduce` 时只绘制一次静态画面并停止 rAF，验证：开启系统减少动态效果后页面不启动动画循环
- [x] 4.3 使用 `visibilitychange` 与 `IntersectionObserver` 控制暂停/恢复，验证：切到后台或 Hero 滚出视口后 rAF 停止，返回后从原位置继续
- [x] Phase 3.5 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 4

## 5. Phase 5：集成与验收

- [x] 5.1 用 Hero、主题组件替换 `src/App.tsx` 的占位内容，清理不再使用的导入与资源引用，验证：`npm run build` 通过且无 TypeScript 错误
- [x] 5.2 运行 `npm run dev` 手动走查：首屏主题正确、Hero 居中、CTA 可跳转、粒子缓慢漂移（reduced motion 下静止）、主题切换即时生效，验证：控制台无错误与警告
- [x] 5.3 检查两套主题下文案与 CTA 的对比度，验证：使用浏览器对比度检查达到 WCAG AA
- [x] 5.4 检查动画生命周期，验证：Performance 面板录制 5 秒，可见时 rAF 连续运行；切后台或 reduced motion 下无持续帧回调
- [x] Phase 5 完成，暂停并总结变更，等待用户 review 确认

## Workflow follow-up

- 用户确认全部 Phase 后，归档该变更并进入 `/opsx:apply` 之外的后续流程。
