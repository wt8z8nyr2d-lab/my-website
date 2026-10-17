# Design

## Context

站点当前结构为 Navbar → Hero → Projects → Contact。主 specs 包含 `hero-section`、`theme-switching`、`site-navigation`、`project-showcase`。本次在 Hero 与 Projects 之间插入 About，不改动导航与既有区块。见 `proposal.md` 了解动机与假设。

关键约束：

- 照片使用本地资源、懒加载并预留宽高比。
- 不新增依赖；样式使用 Tailwind，禁止内联 style。
- 组件文件名 PascalCase；不使用动画。
- 不包含联系表单。

## Goals / Non-Goals

**Goals:**

- 新增左图右文的「关于我」两栏布局，移动端上下堆叠。
- 展示 3 段简介与「快乐蜂」品牌标签。
- 提供照片加载失败降级与主题适配。
- 保证新增区块不破坏现有锚点、滚动偏移与导航行为。

**Non-Goals:**

- 不实现联系表单、导航「关于」链接、社交链接、简历下载或动画。
- 不使用真实照片与最终文案。

## Decisions

### 1. 数据模型与占位素材

新增 `src/content/about.ts`：

```ts
export type About = {
  photo: string
  paragraphs: string[]
  brandTag: string
}
```

导出 `about: About`，包含 3 段占位简介与 `brandTag: '快乐蜂'`。照片放在 `src/assets/about/portrait.svg`，在数据文件中 `import` 引入，确保 Vite 处理 base path。SVG 使用 4:5 比例、抽象人像与「YC」标识，作为真实照片替换前的占位。

### 2. 组件与布局

新增 `AboutSection.tsx`：

```
<section id="about" class="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
  <div class="mx-auto max-w-5xl">
    <div class="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div> 照片 / 降级块 </div>
      <div>
        <h2>关于我</h2>
        <p>段落 1</p>
        <p>段落 2</p>
        <p>段落 3</p>
      </div>
    </div>
    <div> 品牌标签「快乐蜂」 </div>
  </div>
</section>
```

- 桌面左图右文，`md` 以下堆叠。
- 品牌标签位于两栏下方，使用居中的胶囊样式。
- 保持页面唯一 `h1` 在 Hero，本节使用 `h2`。

### 3. 照片与降级

`<img loading="lazy" width="480" height="600" class="aspect-[4/5] w-full rounded-2xl object-cover" alt="Young.Chou 的照片">`。

使用 `useState` 记录加载失败，通过 `onError` 切换为占位块：固定比例容器 + 主题背景 + 姓名首字母，保持布局稳定。占位块不进入额外的交互。

### 4. 文案与主题

3 段简介从 `about.paragraphs` 映射渲染；数量异常时仅渲染现有段落。文字使用 `--hero-text` / `--hero-text-muted`，品牌标签使用 Tailwind `dark:` 边框与背景，保证两种主题下的可读性。

### 5. 集成

在 `App.tsx` 中按 Hero → About → Projects → Contact 顺序插入。About 的 `id="about"` 与 `scroll-mt-20` 为未来导航链接预留，但本次不修改 Navbar。

## Risks / Trade-offs

- **照片加载失败导致布局塌陷** → 4:5 固定比例容器 + `onError` 占位块。
- **窄屏两栏挤压** → `md` 断点以下改为单列堆叠。
- **长简介撑破布局** → 正常换行，容器 `min-w-0`，实测 375px。
- **新增区块改变锚点位置** → 目标区块均保留 `scroll-mt-20`，回归验证项目/联系跳转。
- **占位照片被误认为真实内容** → 文件命名与文案明确为占位，后续直接替换。
- **base path 下照片失效** → 使用 `import` 由 Vite 生成 URL。

## Migration Plan

1. 新增 `portrait.svg` 与 `about.ts`。
2. 新增 `AboutSection.tsx`，更新 `App.tsx` 组合顺序。
3. `npm run build` + 浏览器走查；回滚时还原上述文件即可，无数据迁移。

## Open Questions

无。真实照片与最终简介后续替换 `portrait.svg` 与 `about.ts`。
