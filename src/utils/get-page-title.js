import defaultSettings from '@/settings'
// 如果没有的话就Vue Admin Template
const title = defaultSettings.title || 'Vue Admin Template'
// 设置页面标题
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
