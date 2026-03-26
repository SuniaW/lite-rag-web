<template>
  <div>
    <section class="hero-section">
      <div class="hero-bg-decoration">
        <div class="hero-orb orb-1"></div>
        <div class="hero-orb orb-2"></div>
        <div class="hero-orb orb-3"></div>
      </div>
      <div class="hero-card glass-effect">
        <!-- 1. 顶部标签组模型化 -->
        <div class="hero-badge-group">
          <el-tag
            v-for="(badge, index) in badges"
            :key="badge.text"
            :type="badge.type"
            size="small"
            round
            class="hero-badge"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <span class="badge-dot"></span> {{ badge.text }}
          </el-tag>
        </div>

        <!-- 2. 标题模型化 -->
        <h1 class="hero-title">
          <span class="gradient-text">{{ title.main }}</span>
          <span class="title-subtitle">{{ title.sub }}</span>
        </h1>

        <!-- 3. 描述文本模型化 (保持 strong 结构) -->
        <p class="hero-subtitle">
          {{ description.prefix }}
          <strong class="highlight-primary">{{ description.hl1 }}</strong>
          {{ description.middle }}
          <strong class="highlight-secondary">{{ description.hl2 }}</strong>
          {{ description.suffix }}
          <br>
          {{ description.line2Prefix }}
          <strong class="highlight-accent">{{ description.hl3 }}</strong>
          {{ description.line2Suffix }}
        </p>

        <!-- 4. 动作按钮模型化 -->
        <div class="action-group">
          <el-button
            type="primary"
            size="large"
            @click="$emit('go-chat')"
            round
            class="btn-primary glow-btn"
          >
            <el-icon><component :is="buttonConfig.icon"/></el-icon>
            {{ buttonConfig.text }}
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ChatDotRound } from '@element-plus/icons-vue'

// 定义更完善的 Props 模型
interface DescriptionModel {
  prefix: string;
  hl1: string;
  middle: string;
  hl2: string;
  suffix: string;
  line2Prefix: string;
  hl3: string;
  line2Suffix: string;
}

interface TitleModel {
  main: string;
  sub: string;
}

interface ButtonModel {
  text: string;
  icon: any;
}

defineProps<{
  badges: any[],
  title: TitleModel,
  description: DescriptionModel,
  buttonConfig: ButtonModel
}>()

defineEmits(['go-chat', 'toggle-details', 'scroll-to'])
</script>

<style src="../../assets/styles/home.css" scoped></style>
