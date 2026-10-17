import projectOne from '../assets/projects/project-1.svg'
import projectTwo from '../assets/projects/project-2.svg'
import projectThree from '../assets/projects/project-3.svg'
import projectFour from '../assets/projects/project-4.svg'

export type Project = {
  id: string
  name: string
  description: string
  githubUrl: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'project-1',
    name: '个人品牌站',
    description:
      '使用 React、Vite 与 Tailwind CSS 构建的响应式个人站点，包含主题切换与动态粒子背景。',
    githubUrl: 'https://github.com/',
    image: projectOne,
  },
  {
    id: 'project-2',
    name: '数据看板',
    description:
      '面向团队的轻量数据可视化面板，支持多维度指标与响应式布局。',
    githubUrl: 'https://github.com/',
    image: projectTwo,
  },
  {
    id: 'project-3',
    name: '组件库',
    description:
      '一套可复用的前端组件与设计令牌，强调可访问性与暗色模式支持。',
    githubUrl: 'https://github.com/',
    image: projectThree,
  },
  {
    id: 'project-4',
    name: '待办应用',
    description:
      '支持本地持久化的任务管理应用，用于练习状态管理与交互细节。',
    githubUrl: 'https://github.com/',
    image: projectFour,
  },
]
