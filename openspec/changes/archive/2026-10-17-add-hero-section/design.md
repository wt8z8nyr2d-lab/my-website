# Design

## Context

当前项目是 Vite 脚手架生成的单页应用，`src/App.tsx` 仍是计数器占位内容；Tailwind CSS v4 已通过 `@tailwindcss/vite` 插件接入，但尚未定义暗色模式的 class variant。项目没有主题系统、没有 Canvas 绘制代码、没有内容配置文件，也没有任何已归档的 specs。见 `proposal.md` 了解动机。

关键约束：

- 粒子仅做缓慢漂移，不得加入入场、视差或滚动动画；reduced motion 与不可见时必须暂停。
- 不引入新的运行时依赖。
- 首屏加载 < 2 秒；Hero 文案必须先于粒子层可见。
- 部署到 GitHub Pages，base path 为 `/my-website/`。
- 样式全部使用 Tailwind CSS，禁止内联 style；组件文件使用 PascalCase。

## Goals / Non-Goals

**Goals:**

- 用 class 策略实现可手动切换、可持久化、跟随系统且首屏无闪烁的亮/暗主题。
- 用原生 Canvas 绘制缓慢漂移的装饰粒子，并在 reduced motion、页面不可见或 Hero 离开视口时暂停。
- 建立可复用的 Hero 结构与内容配置，便于后续替换真实文案。
- 满足键盘操作、屏幕阅读器忽略装饰层、AA 对比度等无障碍要求。

**Non-Goals:**

- 不实现粒子入场、视差、滚动动画或 CSS 关键帧动画。
- 不实现 Navbar、Projects 区块、其他页面区块或后端接口。
- 不引入 react-router、动画库或粒子库。
- 不处理真实个人文案的最终内容。

## Decisions

### 1. 主题用 class + Tailwind v4 自定义 variant

在 `src/index.css` 中使用 `@custom-variant dark (&:where(.dark, .dark *))`，把 Tailwind 默认的 `prefers-color-scheme` 策略改为 class 策略；主题状态由 `<html>` 上的 `dark` class 决定。

理由：项目要求手动切换，系统媒体查询无法被用户覆盖。备选方案 `next-themes` 功能完整但引入依赖，且本项目只需要少量逻辑，自研更可控。

### 2. 首屏主题由内联脚本决定，React 只做同步

在 `index.html` 的 `<head>` 中放置一段尽量小的内联脚本：读取 `localStorage` 的偏好，若不存在则读取 `matchMedia('(prefers-color-scheme: dark)')`，在 React 加载前给 `<html>` 设置 `dark` class。React 侧的 `ThemeProvider` 使用同一套优先级重新计算主题，负责响应切换、监听系统变化与跨标签页同步。

理由：Vite 是纯客户端渲染，若等 React 挂载后再设主题，首屏会先绘制错误主题，产生闪烁（FOUC）。内联脚本是唯一能在首帧前执行的方式。脚本整体包在 `try/catch` 中，存储不可用时静默回退到系统偏好。

### 3. 主题状态模型：`'light' | 'dark' | null`

`null` 表示"从未手动选择"，此时跟随系统并监听 `matchMedia` 变化；手动切换后写入 `localStorage`，不再跟随系统。监听 `storage` 事件实现多标签页同步。写存储时捕获异常，异常时仅保留内存状态。

### 4. 粒子层用原生 Canvas，rAF 驱动缓慢漂移

新增 `ParticleCanvas.tsx`：根据容器面积计算粒子数量（设最小/最大值），使用固定种子生成初始位置与速度，绘制圆点与近距离连线；`devicePixelRatio` 上限取 2。动画使用 `requestAnimationFrame` 与 delta time，速度控制在约 6–16 px/s，位置越界后环绕。

暂停策略：`prefers-reduced-motion: reduce` 时只绘制一次静态画面并停止循环；`document.visibilityState === 'hidden'` 或 Hero 通过 `IntersectionObserver` 离开视口时取消 rAF；恢复时重置计时基准，避免 delta 过大导致粒子跳变。

理由：零依赖且可控；`tsparticles` 体积大且配置面过宽，纯 CSS 无法表现粒子连线。选择 rAF 而非定时器，保证与刷新率同步并在后台自动降频。

颜色从 CSS 自定义属性（如 `--hero-particle`、`--hero-line`）读取，主题切换时由 CSS 变量更新并触发重绘，避免在 JS 中维护两套色值。绘制逻辑用 `try/catch` 包裹，失败时保留渐变背景。装饰层设置 `aria-hidden="true"`、`pointer-events-none`，并以绝对定位置于内容层之下（内容层 `relative z-10`）。

### 5. 背景采用渐变、粒子、遮罩三层结构

底层为 Tailwind 渐变色块（主题相关），其上是 Canvas 粒子层，再叠加半透明遮罩以保证文字对比度。内容层位于三层之上，使用 `relative z-10`。渐变与遮罩均为静态。

### 6. 组件与文件组织

```
src/
  components/
    HeroSection.tsx      # 布局、文案、CTA
    ParticleCanvas.tsx   # 缓慢漂移的装饰粒子
    ThemeToggle.tsx      # 切换控件
  theme/
    ThemeProvider.tsx    # context + hook + 同步逻辑
  content/
    profile.ts           # 姓名/职业/介绍占位文案
```

`HeroSection` 使用 `min-h-svh` 占满当前可视高度，内容用 flex 居中。CTA 用 `<a href="#projects">`，目标区块未来加 `scroll-mt-*`；本次不实现 Projects 区块，点击后仅更新哈希。

### 7. 无障碍与性能

- 姓名使用唯一 `h1`；背景 Canvas `aria-hidden`。
- ThemeToggle 使用原生 `<button>`，设置 `aria-label` 与 `aria-pressed`，提供 `focus-visible` 样式。
- 文字与 CTA 在两种主题下验证 AA 对比度。
- 不引入图片，因此 lazy loading 规则本次无适用对象；如后续新增 Hero 图片，按约束使用 `loading="lazy"`。
- 不新增依赖，首屏只加载 React、Tailwind 产物与少量组件代码。

## Risks / Trade-offs

- **内联脚本被 CSP 禁止导致主题闪烁** → 脚本保持最小化并包 `try/catch`；同时在 `<meta name="color-scheme">` 与 CSS 中声明 `color-scheme`，保证默认渲染接近目标主题。
- **Canvas 挂载时容器尺寸为 0** → 使用 `ResizeObserver` 且跳过 0 尺寸，避免绘制空画布。
- **粒子在极端宽高比下密度失衡** → 数量按面积计算并设上下限，连线距离按尺寸缩放。
- **`storage` 事件在部分浏览器/隐私模式不可用** → 所有存储访问均捕获异常，降级为当前会话状态。
- **Tailwind v4 自定义 dark variant 配错会导致 `dark:` 不生效** → 在实现阶段用一条 `dark:` 类做冒烟验证。
- **持续 rAF 在低端设备上耗电或掉帧** → 限制粒子数量与 DPR，页面不可见或 Hero 离开视口时暂停，reduced motion 下完全静态。
- **切换主题时 Canvas 颜色不更新** → 监听 `<html>` 的 class 变化，从 CSS 变量重新读取颜色，下一帧即生效。

## Migration Plan

1. 替换 `src/App.tsx` 的占位内容，新增组件、主题与内容文件。
2. 更新 `src/index.css` 与 `index.html`（dark variant、CSS 变量、首屏脚本）。
3. 通过 `npm run build` 与 `npm run dev` 手动验证两套主题。
4. 回滚策略：本次不涉及数据迁移，直接还原上述文件即可恢复占位页。

## Open Questions

无会阻塞设计的问题。真实姓名、职业与介绍文案属于可延后替换的内容，已通过 `src/content/profile.ts` 隔离。
