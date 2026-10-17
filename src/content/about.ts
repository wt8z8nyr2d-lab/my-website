import portrait from '../assets/about/portrait.svg'

export type About = {
  photo: string
  paragraphs: string[]
  brandTag: string
}

export const about: About = {
  photo: portrait,
  paragraphs: [
    '你好，我是 Young.Chou，一名前端工程师和独立开发者。',
    '我关注 Web 体验、可访问性与工程效率，喜欢用 React、TypeScript 与 Tailwind CSS 构建清晰、可靠的界面。',
    '工作之外，我持续记录技术实践与设计思考，也乐于把想法做成可以真实使用的产品。',
  ],
  brandTag: '快乐蜂',
}
