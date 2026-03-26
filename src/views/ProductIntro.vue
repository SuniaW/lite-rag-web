<template>
  <div class="home-container">
    <!-- 背景装饰：点阵与光晕 -->
    <div class="bg-dots"></div>
    <div class="glow-sphere sphere-1"></div>
    <div class="glow-sphere sphere-2"></div>

    <div class="scroll-content">
      <!-- 1. 头部标题区 (Hero Section) -->
      <section class="hero-section glass-effect">
        <div class="tech-badges animate-fade-in">
          <span class="badge-item primary">DeepSeek-V3/R1 Inside</span>
          <span class="badge-item success">Spring AI 生态驱动</span>
        </div>

        <h1 class="main-title animate-title">
          AI 天气<span class="gradient-text">智能助手</span>
        </h1>

        <p class="description animate-fade-in-delay">
          超越传统预报。利用 <span class="highlight">Function Calling</span> 技术直连实时气象数据，
          结合 <span class="highlight-alt">DeepSeek-R1</span> 推理能力，为您定制专业级的穿衣与出行建议。
        </p>

        <div class="cta-area animate-fade-in-delay">
          <el-button type="primary" size="large" round class="cta-button">
            立即开启智能气象对话
            <el-icon class="el-icon--right"><Right /></el-icon>
          </el-button>
        </div>
      </section>

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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sunny, Connection, Cpu, Right, DArrowRight } from '@element-plus/icons-vue'

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
</script>

<style scoped>
/* 容器与背景 */
.home-container {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%);
  scroll-behavior: smooth;
  position: relative;
}

.home-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(64, 158, 255, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(102, 126, 234, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}


/* ==================== 玻璃态效果 ==================== */
.glass-effect {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.bg-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 20px 20px;
  mask-image: radial-gradient(circle at center, black, transparent 70%);
  z-index: 0;
  opacity: 0.5;
}

.glow-sphere {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.08;
  z-index: 1;
}
.sphere-1 { top: -150px; left: -150px; background: #3b82f6; }
.sphere-2 { bottom: -150px; right: -150px; background: #8b5cf6; }

.scroll-content {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 24px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: 80px;
  background: #ffffff;
  padding: 60px 40px;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  border: 1px solid #ffffff;
}

.badge-item {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin: 0 6px;
  backdrop-filter: blur(10px);
}
.badge-item.primary {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
  border: 1px solid rgba(59, 130, 246, 0.2);
}
.badge-item.success {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.main-title {
  font-size: 56px;
  margin: 24px 0;
  font-weight: 800;
  letter-spacing: -1px;
  color: #1e293b;
}

.gradient-text {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 18px;
  color: #64748b;
  max-width: 800px;
  margin: 0 auto 40px;
  line-height: 1.8;
}

.highlight {
  color: #1e293b;
  font-weight: 600;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
}
.highlight-alt {
  color: #1e293b;
  font-weight: 600;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
}

.cta-button {
  height: 54px;
  padding: 0 32px;
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 27px;
  box-shadow: 0 10px 20px -10px rgba(37, 99, 235, 0.5);
  transition: all 0.3s;
}
.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -10px rgba(37, 99, 235, 0.6);
}

/* Feature Cards */
.feature-card-wrapper {
  opacity: 0;
  animation: fadeInUp 0.8s var(--delay) forwards;
}

.glass-card {
  background: #ffffff !important;
  backdrop-filter: blur(12px);
  border: 1px solid #f1f5f9 !important;
  border-radius: 24px !important;
  padding: 32px 24px;
  position: relative;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #e2e8f0 !important;
}

.icon-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100px;
  height: 100px;
  filter: blur(40px);
  opacity: 0.1;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
}

.glass-card h3 {
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 12px;
  font-weight: 700;
}

.glass-card p {
  font-size: 15px;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 24px;
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid #f1f5f9;
  padding-top: 16px;
}

.tech-label {
  font-size: 11px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.tech-value {
  font-size: 13px;
  font-weight: 600;
  font-family: monospace;
}

/* Workflow Section */
.workflow-container {
  margin-top: 100px;
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
