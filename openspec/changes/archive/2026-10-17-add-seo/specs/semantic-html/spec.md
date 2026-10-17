# Spec Delta

## Purpose

定义个人品牌站基础语义化 HTML 与可访问性要求：正确的地标结构、唯一的页面主标题与层级清晰的标题、有意义的图片替代文本，以及可被辅助技术理解的外链与控件。

## ADDED Requirements

### Requirement: 地标与标题层级

页面 SHALL 使用 `header`、`nav`、`main` 等地标组织内容，主导航 MUST 具有可访问名称。页面 MUST 只有一个 `h1`；各内容区块使用 `h2`，卡片标题使用 `h3`，不得跳级或重复主标题。

#### Scenario: 地标结构完整

- **GIVEN** 页面渲染完成
- **WHEN** 辅助技术读取页面地标
- **THEN** 可识别到 `header`、带名称的 `nav` 与 `main`，且主要内容位于 `main` 内

#### Scenario: 标题层级正确

- **GIVEN** 页面完整渲染
- **WHEN** 提取标题大纲
- **THEN** 存在且仅存在一个 `h1`，其余区块标题为 `h2`，卡片标题为 `h3`，层级从 `h1` 到 `h3` 连续

### Requirement: 图片与链接语义

所有内容图片 MUST 提供有意义的 `alt` 文本；装饰性元素 MUST 从无障碍树中隐藏。指向外部网站的链接 MUST 在新标签页打开并使用 `rel="noopener noreferrer"`。所有交互控件 MUST 具有可访问名称。

#### Scenario: 图片替代文本

- **GIVEN** 页面包含项目截图等内容图片
- **WHEN** 屏幕阅读器读取图片
- **THEN** 每张内容图片都有描述性 `alt`，装饰性背景不被朗读

#### Scenario: 外链安全与语义

- **GIVEN** 页面包含 GitHub 外链
- **WHEN** 检查链接属性
- **THEN** 链接使用 `target="_blank"` 与 `rel="noopener noreferrer"`

#### Scenario: 交互控件命名

- **GIVEN** 访客使用屏幕阅读器或键盘
- **WHEN** 聚焦导航链接与主题切换按钮
- **THEN** 每个控件都有可读名称与可见焦点样式
