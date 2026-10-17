# Spec Delta

## Purpose

定义个人品牌站的全局顶部导航：固定定位的品牌入口与三组锚点链接、平滑滚动与固定栏偏移、半透明模糊背景、移动端紧凑布局，以及目标区块的可达性与键盘无障碍。

## ADDED Requirements

### Requirement: 固定顶部导航栏

系统 SHALL 在页面顶部渲染一个固定定位的导航栏，横跨视口宽度并始终位于内容之上。左侧 SHALL 显示来自 `profile.name` 的品牌名称，右侧 SHALL 包含「首页」「项目」「联系我」三个链接与主题切换控件。

#### Scenario: 桌面端布局

- **GIVEN** 访客在桌面浏览器打开站点
- **WHEN** 导航栏渲染完成
- **THEN** 导航栏固定在视口顶部，品牌在左、三个链接与主题切换在右，页面滚动时导航栏保持可见

#### Scenario: 窄屏紧凑布局

- **GIVEN** 视口宽度为 375px
- **WHEN** 导航栏渲染完成
- **THEN** 品牌、三个链接与主题切换均可见，不出现水平滚动条或相互遮挡

#### Scenario: 品牌名称过长

- **GIVEN** `profile.name` 的长度显著超过常规姓名
- **WHEN** 窄屏下渲染导航栏
- **THEN** 品牌文本被截断或压缩显示，三个导航链接与主题切换仍完整可见

### Requirement: 导航链接跳转目标区块

系统 SHALL 使用原生锚点链接将「首页」「项目」「联系我」分别指向 `#home`、`#projects`、`#contact`。系统 MUST 在 `#projects` 与 `#contact` 位置渲染带标题的最简占位区块，且每个目标区块顶部 MUST 预留固定导航栏高度，避免标题被遮挡。

#### Scenario: 点击导航链接

- **GIVEN** 三个目标区块均存在
- **WHEN** 访客点击「项目」链接
- **THEN** 页面滚动到 Projects 区块，其标题完整位于导航栏下方，URL 哈希更新为 `#projects`

#### Scenario: 直接访问带哈希的 URL

- **GIVEN** 访客直接打开带 `#contact` 的 URL
- **WHEN** 页面加载完成
- **THEN** 视口定位到 Contact 区块，标题不被固定导航栏遮挡

#### Scenario: 键盘激活链接

- **GIVEN** 访客使用键盘导航
- **WHEN** 焦点位于某个导航链接并按 Enter
- **THEN** 页面执行与该链接点击一致的跳转行为

### Requirement: 平滑滚动与动效偏好

在未启用 reduced motion 时，系统 SHALL 以平滑滚动方式切换区块；当系统启用 `prefers-reduced-motion: reduce` 时，系统 MUST 立即跳转，不执行平滑滚动动画。

#### Scenario: 默认平滑滚动

- **GIVEN** 系统未启用 reduced motion
- **WHEN** 访客点击导航链接
- **THEN** 页面平滑滚动到目标区块

#### Scenario: 减少动态效果

- **GIVEN** 系统启用了 reduced motion
- **WHEN** 访客点击导航链接
- **THEN** 页面立即跳转到目标区块，不播放平滑滚动动画

### Requirement: 半透明模糊背景

系统 SHALL 为固定导航栏提供半透明背景与背景模糊（backdrop blur），使滚动内容经过其下方时呈现模糊效果。两种主题下导航文字 MUST 保持可读；当浏览器不支持背景模糊时，MUST 使用足够不透明的背景作为降级。

#### Scenario: 内容从导航栏下方滚过

- **GIVEN** 页面内容高度超过一屏
- **WHEN** 访客向下滚动
- **THEN** 内容在导航栏下方经过时呈现模糊，导航文字保持清晰可读

#### Scenario: 背景模糊不受支持

- **GIVEN** 浏览器不支持 `backdrop-filter`
- **WHEN** 导航栏渲染
- **THEN** 使用半透明纯色背景，链接与品牌仍清晰可读，不出现透明穿透导致的文字重叠

### Requirement: 导航栏主题适配

系统 SHALL 使导航栏背景、品牌、链接和主题切换控件在明亮与暗黑主题下均保持可读，并在主题切换后即时更新。

#### Scenario: 切换主题

- **GIVEN** 导航栏已渲染
- **WHEN** 访客切换亮/暗主题
- **THEN** 导航栏背景与文字颜色同步更新，链接和品牌文字对比度满足 WCAG AA

### Requirement: 导航语义与键盘焦点

系统 SHALL 使用 `nav` 地标与列表结构呈现主导航。品牌链接 MUST 指向 `#home`；所有交互元素 MUST 可通过 Tab 到达，并显示可见的焦点样式。

#### Scenario: 屏幕阅读器识别主导航

- **GIVEN** 访客使用屏幕阅读器
- **WHEN** 浏览页面地标
- **THEN** 可以识别到一个名为「主导航」的导航地标，其中包含品牌链接、三个区块链接与主题切换按钮

#### Scenario: 焦点顺序与可见性

- **GIVEN** 访客使用 Tab 键
- **WHEN** 焦点进入导航栏
- **THEN** 焦点按品牌、链接、主题切换的顺序移动，每个元素均有清晰可见的焦点样式
