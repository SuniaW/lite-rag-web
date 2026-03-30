<template>
  <div class="home-container" ref="homeContainer" @scroll="handleScroll">
    <div class="main-content">

      <!-- 1. 欢迎区 -->
      <HomeHero
        :badges="heroBadges"
        :title="heroTitle"
        :description="heroDescription"
        :button-config="heroButton"
        @go-chat="goToChat"
        @scroll-to="scrollToSection"
      />

      <!-- 2. 指标区 -->
      <HomeMetrics :core-metrics="coreMetrics"/>

      <!-- 3. 技术细节 (受 showDetails 控制) -->
      <transition name="el-zoom-in-top">
        <HomeTechDetails
          :software-specs="softwareSpecs"
          :performance-data="performanceData"
        />
      </transition>

      <!-- 4. 学习手册 -->
      <HomeHandbook
        :handbook-topics="handbookTopics"
        @topic-click="handleTopicClick"
        @open-github="openGithubHandbook"
      />

      <!-- 7. 回到顶部 -->
      <transition name="fade">
        <el-button v-if="showBackToTop" circle class="back-to-top glow-btn" @click="scrollToTop">
          <el-icon>
            <ArrowUp/>
          </el-icon>
        </el-button>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onUnmounted, ref} from 'vue'
import {ArrowUp} from '@element-plus/icons-vue'

const homeContainer = ref<HTMLElement | null>(null)

// 💡 导入所有常量逻辑
import {
  coreMetrics, handbookTopics, handleTopicClick, openGithubHandbook,
  performanceData,
  softwareSpecs
} from "@/assets/ts/constants.ts"
import HomeTechDetails from "@/components/ragpro/HomeTechDetails.vue";
import HomeMetrics from "@/components/ragpro/HomeMetrics.vue";
import HomeHero from "@/components/ragpro/HomeHero.vue";
import {useRouter} from "vue-router";
import HomeHandbook from "@/components/ragpro/HomeHandbook.vue";

const router = useRouter()
// 基于图片 2 (Lite-RAG) 提取的数据模型
const heroBadges = [
  { text: 'Spring Boot 3.4.3', type: 'info' },   // 对应蓝色圆点
  { text: 'Spring AI M6', type: 'warning' },     // 对应橙色圆点
  { text: 'Milvus 2.6.0', type: 'success' },     // 对应绿色圆点
  { text: '2C4G 优化', type: 'info' }            // 对应灰色圆点
];

const heroTitle = {
  main: 'Lite-RAG',
  sub: '智能助手'
};

const heroDescription = {
  prefix: '基于 ',
  hl1: 'Spring AI',
  middle: ' 与 ',
  hl2: 'Milvus 2.6',
  suffix: ' 构建的工业级私有化知识库。',
  line2Prefix: '经过深度性能调优，实现 ',
  hl3: '低功耗环境下的秒级生成',
  line2Suffix: '。'
};

const heroButton = {
  text: '进入知识库问答',
  icon: 'ChatDotRound' // 需确保已注册或直接传递组件对象
};

const showBackToTop = ref(false)

const goToChat = () => router.push('/chat/ragbox')

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'})
}

const scrollToTop = () => {
  if (homeContainer.value) homeContainer.value.scrollTo({top: 0, behavior: 'smooth'})
}

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  showBackToTop.value = target.scrollTop > 300
}

onUnmounted(() => {
  // 离开页面时重置全局滚动状态，防止影响下一个页面
  showBackToTop.value = false
})
</script>
<style src="../assets/styles/common.css" scoped/>

