# Spec Delta

## Purpose

定义个人品牌站首屏 Hero 的品牌信息展示、CTA 跳转、装饰性背景与响应式行为，使访客在不滚动的情况下了解站点主人并前往项目区块。

## ADDED Requirements

### Requirement: 全屏 Hero 展示品牌信息

系统 SHALL 在页面首屏渲染一个至少占满当前视口高度的 Hero 区块，并在视觉上水平和垂直居中展示姓名、职业和一句话介绍。姓名 MUST 使用页面唯一的一级标题。

#### Scenario: 桌面端正常展示

- **GIVEN** 访客在桌面浏览器打开站点
- **WHEN** 首屏渲染完成
- **THEN** Hero 高度不小于视口高度，姓名、职业、介绍三组文案居中显示，且页面只有一个 `h1`

#### Scenario: 移动端视口高度变化

- **GIVEN** 访客在移动浏览器打开站点
- **WHEN** 地址栏收起或展开导致可视高度变化
- **THEN** Hero 高度跟随当前可视高度调整，内容不被浏览器工具栏遮挡或裁切

#### Scenario: 文案内容缺失

- **GIVEN** 内容配置中的职业或介绍为空字符串
- **WHEN** Hero 渲染
- **THEN** 页面不崩溃，空字段不产生占位符或 `undefined` 文本，其余字段正常展示

### Requirement: CTA 按钮跳转项目区块

系统 SHALL 在 Hero 中提供一个可通过键盘访问的 CTA 链接，其目标为页面内锚点 `#projects`。该链接 MUST 使用原生锚点语义，不得依赖 JavaScript 跳转。

#### Scenario: 点击 CTA 跳转

- **GIVEN** 页面中存在 `id="projects"` 的元素
- **WHEN** 访客点击 CTA 或聚焦后按 Enter
- **THEN** 页面滚动到 Projects 区块，该区块顶部不被未来固定导航遮挡

#### Scenario: 目标区块尚不存在

- **GIVEN** 页面中不存在 `id="projects"` 的元素（Projects 区块不在本次范围）
- **WHEN** 访客激活 CTA
- **THEN** 页面不发生 JavaScript 异常，URL 哈希更新为 `#projects`，Hero 内容保持可见

#### Scenario: 键盘焦点可见

- **GIVEN** 访客使用键盘 Tab 导航
- **WHEN** 焦点落在 CTA 上
- **THEN** CTA 显示清晰可见的焦点样式，且激活行为与鼠标点击一致

### Requirement: 装饰性渐变与粒子背景

系统 SHALL 在 Hero 内容层之下渲染背景：一层 CSS 渐变底色、一层 Canvas 粒子图案，以及一层用于保证文字对比度的半透明遮罩。背景层 MUST 位于内容之后、不得拦截指针事件、不得进入无障碍树。粒子 SHALL 仅做缓慢漂移，不得加入入场、视差或滚动动画。

#### Scenario: 背景不干扰内容交互

- **GIVEN** Hero 已渲染
- **WHEN** 访客选中文字、点击 CTA 或使用辅助技术读取页面
- **THEN** 背景层不响应指针事件，不被屏幕阅读器朗读，且不遮挡内容

#### Scenario: 粒子缓慢漂移

- **GIVEN** 页面可见且系统未启用 reduced motion
- **WHEN** 访客观察 Hero 背景
- **THEN** 粒子以缓慢速度连续漂移，连线随相对距离变化，且不遮挡或拖慢内容交互

#### Scenario: 页面不可见时暂停

- **GIVEN** 粒子正在漂移
- **WHEN** 标签页切到后台或 Hero 滚出视口
- **THEN** 粒子动画暂停；恢复可见后从暂停位置继续，不出现跳变

#### Scenario: Canvas 不可用时的降级

- **GIVEN** 浏览器不支持 Canvas 或绘制过程抛出异常
- **WHEN** Hero 渲染
- **THEN** 捕获异常，CSS 渐变背景与全部文案仍正常显示，页面不出现空白区域

#### Scenario: 视口尺寸变化

- **GIVEN** Hero 粒子已绘制
- **WHEN** 访客调整窗口大小或旋转设备
- **THEN** 粒子层重新适配新的 Hero 尺寸，不出现拉伸、错位或内容溢出

#### Scenario: 减少动态效果偏好

- **GIVEN** 操作系统启用了 reduced motion 偏好
- **WHEN** Hero 渲染
- **THEN** 背景保持完全静态，不启动任何动画循环

### Requirement: 主题适配

系统 SHALL 使 Hero 的渐变、粒子颜色、文字和 CTA 在明亮与暗黑主题下均保持可读，并在主题切换后即时更新。

#### Scenario: 亮暗主题下的可读性

- **GIVEN** 访客分别处于明亮和暗黑主题
- **WHEN** Hero 渲染完成
- **THEN** 姓名、职业、介绍与 CTA 文本相对背景满足 WCAG AA 对比度要求

#### Scenario: 切换主题后粒子跟随

- **GIVEN** Hero 已绘制粒子
- **WHEN** 访客切换主题
- **THEN** 粒子颜色更新为对应主题的配色，无需刷新页面
