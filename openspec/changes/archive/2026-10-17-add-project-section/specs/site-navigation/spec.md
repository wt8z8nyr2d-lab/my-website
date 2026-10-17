# Spec Delta

## MODIFIED Requirements

### Requirement: 导航链接跳转目标区块

系统 SHALL 使用原生锚点链接将「首页」「项目」「联系我」分别指向 `#home`、`#projects`、`#contact`。系统 MUST 在 `#projects` 位置渲染带标题的项目展示区，在 `#contact` 位置渲染带标题的最简占位区块，且每个目标区块顶部 MUST 预留固定导航栏高度，避免标题被遮挡。

#### Scenario: 点击导航链接

- **GIVEN** 三个目标区块均存在
- **WHEN** 访客点击「项目」链接
- **THEN** 页面滚动到项目展示区，其标题完整位于导航栏下方，URL 哈希更新为 `#projects`

#### Scenario: 直接访问带哈希的 URL

- **GIVEN** 访客直接打开带 `#contact` 的 URL
- **WHEN** 页面加载完成
- **THEN** 视口定位到 Contact 区块，标题不被固定导航栏遮挡

#### Scenario: 键盘激活链接

- **GIVEN** 访客使用键盘导航
- **WHEN** 焦点位于某个导航链接并按 Enter
- **THEN** 页面执行与该链接点击一致的跳转行为
