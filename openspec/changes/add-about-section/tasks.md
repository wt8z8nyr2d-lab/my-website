# Tasks

## 1. Phase 1：照片素材与内容数据

- [x] 1.1 创建 `src/assets/about/portrait.svg`：4:5 抽象人像占位图，带姓名标识，验证：文件存在且可被 `<img>` 正常显示
- [x] 1.2 创建 `src/content/about.ts`：定义 `About` 类型，包含照片 import、3 段占位简介与品牌标签「快乐蜂」，验证：`npm run build` 通过且数据可被导入
- [x] Phase 1 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 2

## 2. Phase 2：关于我组件与布局

- [x] 2.1 创建 `src/components/AboutSection.tsx`：`id="about"`、`scroll-mt-20`、`h2`「关于我」、左侧照片（`loading="lazy"`、`alt`、4:5、`onError` 占位降级）+ 右侧 3 段简介，验证：桌面左图右文、375px 上下堆叠
- [x] 2.2 在两栏下方添加品牌标签「快乐蜂」胶囊样式，验证：亮/暗主题下可读且居中展示
- [x] 2.3 为照片容器与文本容器添加 `min-w-0` 与换行处理，验证：长简介在 375px 与桌面宽度下不溢出
- [x] Phase 2 完成，暂停并总结变更，等待用户 review 确认后再进入 Phase 3

## 3. Phase 3：集成与验收

- [x] 3.1 更新 `src/App.tsx` 组合顺序为 Hero → About → Projects → Contact，验证：构建通过且区块顺序正确
- [x] 3.2 验证响应式与边界：375/768/1440px 无水平溢出；照片加载失败显示占位且布局稳定；简介数量异常不崩溃
- [x] 3.3 检查无障碍与性能：`h2` 层级正确、照片 `alt` 有意义、`loading="lazy"` 与宽高比正确、屏幕阅读器顺序为标题→照片→简介→品牌标签
- [x] 3.4 回归验证 Hero CTA 与导航「项目」「联系我」锚点、主题切换及控制台无错误
- [x] Phase 3 完成，暂停并总结变更，等待用户 review 确认

## Workflow follow-up

- 用户确认全部 Phase 后，归档该变更并同步主 specs。
