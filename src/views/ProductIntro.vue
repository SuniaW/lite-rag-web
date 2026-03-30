<template>
  <div class="home-container" ref="homeContainer" @scroll="handleScroll">
    <div class="main-content">
      <!-- 1. 头部标题区 (Hero Section) -->
      <HomeHero
        :badges="weatherBadges"
        :title="weatherTitle"
        :description="weatherDescription"
        :button-config="weatherButton"
        @go-chat="goToChat"
      />

      <!-- 2. 核心技术卖点 (Features) -->
      <el-row :gutter="24" class="feature-grid">
        <el-col :xs="24" :sm="8" v-for="(item, index) in features" :key="item.title">
          <div class="feature-card-wrapper" :style="{ '--delay': index * 0.2 + 's' }">
            <el-card shadow="never" class="glass-card">
              <div class="icon-glow" :style="{ backgroundColor: item.color }"></div>
              <div class="icon-wrapper" :style="{ color: item.color, backgroundColor: item.bgColor }">
                <el-icon :size="30">
                  <component :is="item.icon"/>
                </el-icon>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <div class="card-footer">
                <span class="tech-label">核心技术</span>
                <span class="tech-value" :style="{ color: item.color }">{{ item.tech }}</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>

      <!-- 3. 技术实现链路 (Workflow) -->
      <div class="workflow-container animate-fade-in-up">
        <div class="workflow-header">
          <div class="line"></div>
          <span class="section-label">智能决策链路 / WORKFLOW</span>
          <div class="line"></div>
        </div>

        <div class="steps-wrapper">
          <div class="step-card">
            <div class="step-num">01</div>
            <strong>意图提取</strong>
            <p>DeepSeek 语义解析用户查询</p>
          </div>

          <div class="connector">
            <el-icon class="arrow-icon"><DArrowRight /></el-icon>
          </div>

          <div class="step-card active">
            <div class="step-num">02</div>
            <strong>工具触发</strong>
            <p>Spring AI 自动执行 Function</p>
          </div>

          <div class="connector">
            <el-icon class="arrow-icon"><DArrowRight /></el-icon>
          </div>

          <div class="step-card">
            <div class="step-num">03</div>
            <strong>深度生成</strong>
            <p>实时数据输出 SSE 流式对话</p>
          </div>
        </div>
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
  </div>
</template>

<script setup lang="ts">
import {Sunny, Connection, Cpu, Right, DArrowRight, ArrowUp} from '@element-plus/icons-vue'
import HomeHero from "@/components/ragpro/HomeHero.vue";
import {onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
// 1. 顶部标签数据 (Badges)
const weatherBadges = [
  { text: 'DeepSeek-V3/R1 Inside', type: 'primary' }, // 对应蓝色标签
  { text: 'Spring AI 生态驱动', type: 'success' }     // 对应绿色标签
];

// 2. 标题数据 (Title)
const weatherTitle = {
  main: 'AI 天气',
  sub: '智能助手'
};

// 3. 描述文本数据 (Description)
// 这里的拆分完全对应模板中的 strong 标签位置
const weatherDescription = {
  prefix: '利用 ',
  hl1: 'Function Calling',              // 第一个高亮词
  middle: '技术直连实时气象数据 ',
  hl2: '',                 // 第二个高亮词
  suffix: ' ',
  line2Prefix: '结合',                     // 这张图只有一行长文本，此处留空
  hl3: 'DeepSeek-R1',
  line2Suffix: '推理能力为您定制专业级的穿衣与出行建议'
};

// 4. 按钮配置 (Button)
const weatherButton = {
  text: '立即开启智能气象对话',
  icon: 'Right' // 对应图片中的右箭头图标
};
const features = [
  {
    title: '实时气象同步',
    desc: '解决大模型信息滞后问题，通过 Function Calling 实时调取全球 200,000+ 城市的最新天气数据。',
    icon: Connection,
    color: '#3b82f6',
    bgColor: '#eff6ff',
    tech: 'Spring AI 工具调用'
  },
  {
    title: '极速流式响应',
    desc: '基于 SSE 协议，对话结果毫秒级逐字输出，为您提供丝滑的打字机交互体验与超低首字延迟。',
    icon: Cpu,
    color: '#10b981',
    bgColor: '#ecfdf5',
    tech: 'Flux 响应式流'
  },
  {
    title: '复杂场景建议',
    desc: '利用 DeepSeek-R1 深度推理能力，针对风力、湿度提供如"洗车指数"、"户外运动"等生活建议。',
    icon: Sunny,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    tech: 'DeepSeek 推理模型'
  }
]

const showBackToTop = ref(false)
const homeContainer = ref<HTMLElement | null>(null)
const goToChat = () => router.push('/chat/ragbox')


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
<style scoped>
/* Workflow Section */
.workflow-container {
  margin-top: 20px;
  background: #ffffff;
  border-radius: 32px;
  padding: 40px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.workflow-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}
.workflow-header .line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.section-label {
  font-size: 12px;
  color: #64748b;
  letter-spacing: 2px;
  font-weight: 600;
  text-transform: uppercase;
}

.steps-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-card {
  text-align: center;
  flex: 1;
  padding: 20px;
}
.step-num {
  font-size: 32px;
  font-weight: 900;
  color: #f1f5f9;
  margin-bottom: -20px;
}
.step-card strong {
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #1e293b;
  font-weight: 700;
}
.step-card p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.5;
}

.step-card.active strong {
  color: #3b82f6;
}

.connector {
  color: #cbd5e1;
  animation: pulse 2s infinite;
  font-size: 20px;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-title { animation: fadeInUp 0.8s ease-out; }
.animate-fade-in { animation: fadeIn 1s ease-out; }
.animate-fade-in-delay { animation: fadeIn 1s 0.3s both; }
.animate-fade-in-up { animation: fadeInUp 1s 0.6s both; }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: translateX(0); }
  50% { opacity: 1; transform: translateX(5px); }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main-title { font-size: 36px; }
  .hero-section { padding: 40px 20px; }
  .steps-wrapper { flex-direction: column; gap: 30px; }
  .connector { transform: rotate(90deg); }
  @keyframes pulse {
    0%, 100% { transform: rotate(90deg) translateX(0); }
    50% { transform: rotate(90deg) translateX(5px); }
  }
}
</style>

