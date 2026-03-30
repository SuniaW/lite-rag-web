<template>
  <div class="home-container" ref="aboutContainer" @scroll="handleScroll">
    <div class="main-content">


      <!-- 5. 作者区 -->
      <HomeAuthor
        :author="author"
        :projects="projects"
      />

      <!-- 6. 联系方式与页脚 -->
      <section class="contact-section">
        <el-card class="contact-card gradient-card">
          <h3>📬 联系与合作</h3>
          <div class="contact-methods">
            <div class="contact-item" v-for="c in contacts" :key="c.name">
              <el-icon>
                <component :is="c.icon"/>
              </el-icon>
              <span>{{ c.value }}</span>
            </div>
          </div>
        </el-card>
      </section>

      <div class="bottom-spacer" style="height: 100px;"></div>
    </div>

    <!-- 7. 回到顶部 -->
    <transition name="fade">
      <el-button v-if="showBackToTop" circle class="back-to-top glow-btn" @click="scrollToTop">
        <el-icon>
          <ArrowUp/>
        </el-icon>
      </el-button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ArrowUp} from '@element-plus/icons-vue'

// 💡 导入所有常量逻辑
import {author, contacts, projects} from "@/assets/ts/constants.ts"
import HomeAuthor from "@/components/ragpro/HomeAuthor.vue";
import {onUnmounted, ref} from "vue";
const aboutContainer = ref<HTMLElement | null>(null)

const scrollToTop = () => {
  if (aboutContainer.value) aboutContainer.value.scrollTo({top: 0, behavior: 'smooth'})
}
const showBackToTop = ref(false)

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  showBackToTop.value = target.scrollTop > 300
}

onUnmounted(() => {
  // 离开页面时重置全局滚动状态，防止影响下一个页面
  showBackToTop.value = false
})
</script>

<style src="../assets/styles/home.css" scoped></style>
<style src="../assets/styles/common.css" scoped></style>
