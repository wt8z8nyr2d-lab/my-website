# seo-metadata Specification

## Purpose
定义个人品牌站的基础 SEO 与社交身份元数据：可被搜索引擎与社交平台读取的标题、描述、canonical、索引指令、Open Graph/Twitter Card、社交分享图，以及允许 Google 索引的 robots.txt。

## Requirements

### Requirement: 基础文档元数据

页面 SHALL 在静态 HTML 中包含唯一且非空的 `<title>`、描述性 `meta description`、`lang="zh-CN"`、字符集与视口声明，以及显式的 `meta robots` 索引指令。标题与描述 MUST 表达站点身份，且不得使用脚手架占位文案。

#### Scenario: 搜索引擎读取标题与描述

- **GIVEN** 访客或爬虫请求页面 HTML
- **WHEN** 解析 `<head>`
- **THEN** 存在唯一 `<title>` 与一条非空 `meta name="description"`，内容包含站点品牌或职业信息

#### Scenario: 索引指令

- **GIVEN** 页面加载
- **WHEN** 爬虫读取 `meta robots`
- **THEN** 指令为 `index, follow`，不存在 `noindex` 或 `nofollow`

#### Scenario: 占位标题残留

- **GIVEN** 构建产物已生成
- **WHEN** 检查 HTML 标题
- **THEN** 标题不等于 `my-website` 等脚手架默认值

### Requirement: Canonical 站点地址

页面 SHALL 包含且仅包含一条绝对 URL 的 `<link rel="canonical">`，与站点部署地址一致。当前允许使用占位域名，但 URL 结构 MUST 包含 `/my-website/` base path。

#### Scenario: Canonical 格式

- **GIVEN** 页面 HTML
- **WHEN** 读取 canonical
- **THEN** 仅存在一条 canonical，且为 `http(s)://` 开头的绝对地址并以 `/my-website/` 结尾

### Requirement: Open Graph 与 Twitter Card

页面 SHALL 提供 Open Graph 与 Twitter Card 元数据，至少包含标题、描述、类型、URL 与图片。`og:image` 与 `twitter:image` MUST 指向本地分享图，并使用绝对 URL；分享图 MUST 为 1200×630 的 PNG。

#### Scenario: 社交平台解析元数据

- **GIVEN** 社交平台抓取页面 HTML
- **WHEN** 读取 Open Graph 与 Twitter 标签
- **THEN** 标题、描述、类型、URL、图片均存在，`twitter:card` 为 `summary_large_image`

#### Scenario: 分享图存在

- **GIVEN** 构建产物
- **WHEN** 请求 `og:image` 指向的文件
- **THEN** 返回 200，文件为 PNG 且尺寸为 1200×630

### Requirement: robots.txt 与索引许可

项目 SHALL 在 `public/robots.txt` 提供爬虫规则，显式允许 `Googlebot` 与所有用户代理索引站点，不得包含阻断性的 `Disallow` 规则。页面 MUST 通过 `meta robots` 提供与 robots.txt 一致的索引许可。

#### Scenario: 爬虫读取 robots.txt

- **GIVEN** 站点已构建并部署
- **WHEN** 请求 base path 下的 `robots.txt`
- **THEN** 返回 200，包含 `User-agent: Googlebot` 与 `Allow: /`，且没有阻止索引的 `Disallow`

#### Scenario: 子路径部署下的索引许可

- **GIVEN** 站点部署在 `/my-website/` 子路径
- **WHEN** 爬虫无法读取域名根目录的 robots.txt
- **THEN** 页面仍通过 `meta robots` 声明 `index, follow`，站点可被索引
