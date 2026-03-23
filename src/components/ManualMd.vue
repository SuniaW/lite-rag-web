<template>
  <!-- 必须加上 markdown-body 类名，样式才会生效 -->
  <div>
    <!-- 动态渲染组件 -->
    <component :is="currentTopic" v-if="currentTopic" />
    <div v-else>文件未找到</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 1. 批量导入所有 MD 组件
import Topic0 from '../assets/md/0.md'
import Topic1 from '../assets/md/1.md'
import Topic2 from '../assets/md/2.md'
import Topic3 from '../assets/md/3.md'
import Topic4 from '../assets/md/4.md'
import Topic5 from '../assets/md/5.md'
import Topic6 from '../assets/md/6.md'
import Topic7 from '../assets/md/7.md'
import Topic8 from '../assets/md/8.md'
import Topic9 from '../assets/md/9.md'

// 2. 建立映射表
const topicMap: Record<string, any> = {
  '0': Topic0,
  '1': Topic1,
  '2': Topic2,
  '3': Topic3,
  '4': Topic4,
  '5': Topic5,
  '6': Topic6,
  '7': Topic7,
  '8': Topic8,
  '9': Topic9,
}

const route = useRoute()
// 3. 根据 URL 里的 id 获取对应的组件
// 例如访问 /detail/1，route.params.id 就是 "1"
const currentTopic = computed(() => {
  const id = route.params.id as string
  return topicMap[id]
})
</script>

<style scoped>
/* 确保你在 main.ts 里引入了 github-markdown-css */
.markdown-body {
  box-sizing: border-box;
  height: calc(100vh - 40px);
  overflow: auto;
  padding: 40px;
  background-color: white; /* 或者是你需要的背景色 */
}
</style>
