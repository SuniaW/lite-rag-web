<template>
  <div class="home-container" ref="homeContainer" @scroll="handleScroll">
    <div class="main-content">

      <!-- 1. 欢迎区 -->
      <HomeHero
        :badges="badges"
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
  badges,
  coreMetrics,
  performanceData,
  softwareSpecs
} from "@/assets/ts/constants.ts"
import HomeTechDetails from "@/components/ragpro/HomeTechDetails.vue";
import HomeMetrics from "@/components/ragpro/HomeMetrics.vue";
import HomeHero from "@/components/ragpro/HomeHero.vue";
import {useRouter} from "vue-router";

const router = useRouter()
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


