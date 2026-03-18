// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 确保路径正确
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'prismjs/themes/prism-tomorrow.css'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'



const app = createApp(App)
app.config.globalProperties.$prism = Prism
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router) // <--- 关键：必须包含这一行！！
app.mount('#app')
