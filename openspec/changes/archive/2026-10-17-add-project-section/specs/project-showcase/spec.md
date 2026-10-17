# Spec Delta

## Purpose

定义个人品牌站的项目展示区：位于 Hero 下方的响应式卡片网格、每张卡片的截图与文案、GitHub 外链、截图懒加载与降级、悬浮微特效以及相关无障碍要求。

## ADDED Requirements

### Requirement: 项目展示区位置与网格

系统 SHALL 在 Hero 下方渲染项目展示区，保留锚点 `id="projects"`，使用二级标题，并以卡片网格展示项目。内容数据 MUST 至少包含 4 个项目；桌面端 SHALL 为 4 列，平板 SHALL 为 2 列，手机 SHALL 为 1 列。

#### Scenario: 桌面端 1×4 布局

- **GIVEN** 项目数据包含 4 条记录
- **WHEN** 访客在桌面宽度打开页面
- **THEN** 项目展示区显示 4 张卡片，按 4 列 1 行排列，标题与卡片完整可见

#### Scenario: 手机端单列

- **GIVEN** 视口宽度为 375px
- **WHEN** 访客浏览项目展示区
- **THEN** 4 张卡片按单列垂直排列，无水平溢出

#### Scenario: 数据少于 4 条

- **GIVEN** 项目数据异常地少于 4 条
- **WHEN** 展示区渲染
- **THEN** 页面正常渲染现有卡片，不出现空卡片、`undefined` 文本或布局错乱

### Requirement: 项目卡片内容

每张项目卡片 SHALL 包含项目截图、项目名称、项目简介与 GitHub 链接。项目名称 MUST 使用卡片内的三级标题；GitHub 链接 MUST 指向外部地址，并在新标签页打开。

#### Scenario: 完整卡片

- **GIVEN** 一条完整的项目数据
- **WHEN** 卡片渲染
- **THEN** 截图、名称、简介与 GitHub 链接全部可见，链接以新标签页打开 GitHub

#### Scenario: GitHub 链接缺失

- **GIVEN** 某条项目数据的 GitHub 链接为空
- **WHEN** 卡片渲染
- **THEN** 不渲染空的或无效的链接，其余内容正常显示

#### Scenario: 名称或简介过长

- **GIVEN** 项目名称或简介显著长于常规内容
- **WHEN** 卡片在 375px 与桌面宽度下渲染
- **THEN** 文本正常换行，不溢出卡片、不产生水平滚动条

### Requirement: 截图懒加载与降级

项目截图 SHALL 使用本地资源与 `loading="lazy"`，并预留固定宽高比以避免布局偏移。截图 MUST 提供描述性 `alt` 文本。当截图加载失败时，系统 MUST 显示占位背景并保持卡片布局稳定。

#### Scenario: 截图按需加载

- **GIVEN** 项目展示区位于首屏之外
- **WHEN** 页面首次加载
- **THEN** 截图带有 `loading="lazy"`，不阻塞首屏渲染，且图片区域高度已预留

#### Scenario: 截图加载失败

- **GIVEN** 某张截图资源返回失败
- **WHEN** 卡片渲染
- **THEN** 图片位置显示占位背景，卡片高度、名称、简介与链接不受影响

### Requirement: 悬浮微特效

在启用动态效果时，访客用指针悬浮项目卡片，卡片 SHALL 轻微上浮、阴影加深并高亮边框。当系统启用 `prefers-reduced-motion: reduce` 时，卡片 MUST NOT 发生位移，但仍可显示非位移的边框或阴影变化。

#### Scenario: 默认悬浮效果

- **GIVEN** 系统未启用 reduced motion
- **WHEN** 访客将指针悬浮在卡片上
- **THEN** 卡片轻微上移，阴影与边框高亮随之变化

#### Scenario: 减少动态效果

- **GIVEN** 系统启用了 reduced motion
- **WHEN** 访客悬浮卡片
- **THEN** 卡片位置保持不变，仅允许边框或阴影的非位移变化

### Requirement: 展示区无障碍与响应式

项目展示区 SHALL 使用语义化结构：区块标题为 `h2`，卡片为 `article`，项目名称为 `h3`。所有链接 MUST 可通过键盘访问并显示可见焦点样式；外部链接 MUST 使用 `rel="noopener noreferrer"`。

#### Scenario: 屏幕阅读器读取卡片

- **GIVEN** 访客使用屏幕阅读器
- **WHEN** 浏览项目展示区
- **THEN** 可依次识别展示区标题、每张卡片的名称、简介、截图描述与 GitHub 链接

#### Scenario: 键盘访问 GitHub 链接

- **GIVEN** 访客使用 Tab 键
- **WHEN** 焦点进入某张项目卡片
- **THEN** GitHub 链接可获得焦点并显示清晰焦点样式，按 Enter 可在新标签页打开
