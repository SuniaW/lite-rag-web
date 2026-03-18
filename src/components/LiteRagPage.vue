<template>
  <div class="home-container">
    <!-- 顶部导航提示 -->
    <div class="top-banner">
      <div class="banner-content">
        <span class="banner-icon">🚀</span>
        <span>专为 2 核 4G 环境深度优化的企业级 RAG 系统</span>
        <el-tag size="small" type="success" effect="dark">生产就绪</el-tag>
      </div>
    </div>

    <div class="main-content">
      <!-- Hero 欢迎区 -->
      <section class="hero-section">
        <div class="hero-card">
          <div class="hero-badge-group">
            <el-tag v-for="badge in badges" :key="badge.text" :type="badge.type" size="small" round>
              {{ badge.text }}
            </el-tag>
          </div>

          <h1 class="hero-title">
            <span class="gradient-text">Lite-RAG 智能助手</span>
          </h1>

          <p class="hero-subtitle">
            基于 <strong>Spring AI</strong> 与 <strong>Milvus 2.6</strong> 构建的工业级私有化知识库。<br>
            经过深度性能调优，实现 <strong>低功耗环境下的秒级生成</strong>。
          </p>

          <div class="action-group">
            <el-button type="primary" size="large" @click="goToChat" round class="btn-primary">
              <el-icon><ChatDotRound /></el-icon>
              进入知识库问答
            </el-button>
            <el-button size="large" round @click="handleToggleDetails" class="btn-secondary">
              <el-icon>
                <component :is="showDetails ? 'Fold' : 'Expand'" />
              </el-icon>
              {{ showDetails ? '隐藏技术规格' : '技术规格说明' }}
            </el-button>
          </div>
        </div>
      </section>

      <!-- 核心指标区 -->
      <div class="metrics-grid">
        <div
          class="metric-item"
          v-for="(m, index) in coreMetrics"
          :key="m.title"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="metric-icon">{{ m.icon }}</div>
          <div class="m-value">{{ m.value }}</div>
          <div class="m-title">{{ m.title }}</div>
          <div class="m-desc">{{ m.desc }}</div>
        </div>
      </div>

      <!-- 隐藏的技术细节区 -->
      <transition name="el-zoom-in-top">
        <div v-if="showDetails" id="tech-section" class="details-section">
          <!-- 性能对比卡片 -->
          <el-row :gutter="20">
            <el-col :xs="24" :md="14">
              <el-card header="📊 工业级调优对比" class="info-card performance-card">
                <template #header>
                  <div class="card-header">
                    <span>📊 工业级调优对比</span>
                    <el-tag type="success" size="small">生产验证</el-tag>
                  </div>
                </template>
                <div class="table-container">
                  <table class="stat-table">
                    <thead>
                    <tr>
                      <th>指标</th>
                      <th>默认配置</th>
                      <th>极致调优</th>
                      <th>提升</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in performanceData" :key="item.metric">
                      <td class="metric-name">{{ item.metric }}</td>
                      <td class="status-bad">{{ item.before }}</td>
                      <td class="status-good">{{ item.after }}</td>
                      <td class="improvement">+{{ item.improvement }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-card>
            </el-col>

            <!-- 核心技术栈 -->
            <el-col :xs="24" :md="10">
              <el-card header="🛠️ 核心技术栈" class="info-card">
                <template #header>
                  <div class="card-header">
                    <span>🛠️ 核心技术栈</span>
                    <el-tag type="warning" size="small">最新版本</el-tag>
                  </div>
                </template>
                <div class="tag-cloud">
                  <el-tag
                    v-for="(t, index) in techStack"
                    :key="t"
                    effect="dark"
                    size="small"
                    :style="{ animationDelay: `${index * 0.05}s` }"
                  >
                    {{ t }}
                  </el-tag>
                </div>
                <el-divider>调优要点</el-divider>
                <ul class="mini-tips">
                  <li v-for="tip in optimizationTips" :key="tip">
                    <el-icon class="tip-icon"><Check /></el-icon>
                    {{ tip }}
                  </li>
                </ul>
              </el-card>
            </el-col>
          </el-row>

          <!-- 内存分配可视化 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="24">
              <el-card header="💾 4GB 内存分配方案" class="info-card">
                <div class="memory-allocation">
                  <div
                    v-for="item in memoryAllocation"
                    :key="item.component"
                    class="memory-bar"
                  >
                    <div class="memory-label">
                      <span class="component-name">{{ item.component }}</span>
                      <span class="component-size">{{ item.memory }}</span>
                    </div>
                    <div class="memory-track">
                      <div
                        class="memory-fill"
                        :style="{
                          width: item.percentage,
                          backgroundColor: item.color
                        }"
                      >
                        <span class="memory-percent">{{ item.percentage }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <!-- 快速部署指南 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="24">
              <el-card header="📦 快速部署（4 步启动）" class="info-card">
                <div class="deploy-steps">
                  <div
                    v-for="(step, index) in deploySteps"
                    :key="index"
                    class="step-item"
                  >
                    <div class="step-number">{{ index + 1 }}</div>
                    <div class="step-content">
                      <h4>{{ step.title }}</h4>
                      <p>{{ step.desc }}</p>
                      <div class="step-code">
                        <code>{{ step.code }}</code>
                        <el-button
                          size="small"
                          text
                          @click="copyCode(step.code)"
                          class="copy-btn"
                        >
                          <el-icon><CopyDocument /></el-icon>
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <!-- 常见问题 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="24">
              <el-card header="🐛 常见问题排查" class="info-card">
                <div class="faq-grid">
                  <div
                    v-for="(faq, index) in faqs"
                    :key="index"
                    class="faq-item"
                    @click="toggleFaq(index)"
                  >
                    <div class="faq-question">
                      <span>{{ faq.question }}</span>
                      <el-icon class="faq-icon">
                        <component :is="expandedFaq === index ? 'ArrowUp' : 'ArrowDown'" />
                      </el-icon>
                    </div>
                    <transition name="expand">
                      <div v-show="expandedFaq === index" class="faq-answer">
                        <p><strong>原因：</strong>{{ faq.cause }}</p>
                        <p><strong>解决方案：</strong>{{ faq.solution }}</p>
                      </div>
                    </transition>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </transition>

      <!-- 底部撑开空间 -->
      <div class="bottom-spacer"></div>
    </div>

    <!-- 回到顶部按钮 -->
    <transition name="fade">
      <el-button
        v-show="showBackToTop"
        circle
        class="back-to-top"
        @click="scrollToTop"
      >
        <el-icon><ArrowUp /></el-icon>
      </el-button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  ChatDotRound,
  Fold,
  Expand,
  Check,
  CopyDocument,
  ArrowUp,
  ArrowDown
} from '@element-plus/icons-vue'

const router = useRouter()
const showDetails = ref(false)
const expandedFaq = ref<number | null>(null)
const showBackToTop = ref(false)

// 徽章数据
const badges = [
  { text: 'Spring Boot 3.4.3', type: 'primary' },
  { text: 'Spring AI M6', type: 'warning' },
  { text: 'Milvus 2.6.0', type: 'success' },
  { text: '2C4G 优化', type: 'info' }
]

// 核心指标
const coreMetrics = [
  { icon: '🤖', title: '推理模型', value: 'Qwen 1.5B', desc: '性能与智能的最佳平衡' },
  { icon: '⚡', title: '平均响应', value: '3.5s', desc: '首字生成平均耗时' },
  { icon: '🎯', title: '检索引擎', value: 'HNSW', desc: '毫秒级高精度语义召回' },
  { icon: '💾', title: '可用内存', value: '2.2GB+', desc: '系统级优化提升 5.5 倍' }
]

// 性能对比数据
const performanceData = [
  { metric: '可用内存', before: '100MB (OOM)', after: '1.8GB+', improvement: '18 倍' },
  { metric: '首字响应', before: '60s+', after: '3-5s', improvement: '12 倍' },
  { metric: '完整响应', before: '120s+', after: '15-25s', improvement: '5 倍' },
  { metric: '系统稳定', before: '日均崩溃 3-5 次', after: '7×24 小时', improvement: '生产级' }
]

// 技术栈
const techStack = [
  'Spring Boot 3.4',
  'Spring AI M6',
  'Milvus 2.6',
  'Ollama',
  'Qwen2.5-1.5B',
  'BGE-M3',
  'Apache Tika',
  'Docker'
]

// 优化要点
const optimizationTips = [
  'HNSW 向量索引算法优化',
  'Ollama 线程配额精细化控制',
  'SSE 字符断包流式拼接修复',
  'Linux 内核 Swap 积极度调优',
  'JVM 内存红线严格限制',
  'Milvus 容器资源配额化'
]

// 内存分配
const memoryAllocation = [
  { component: 'Ollama (LLM 引擎)', memory: '2.2 GB', percentage: '55%', color: '#409EFF' },
  { component: 'Milvus (向量库)', memory: '1.0 GB', percentage: '25%', color: '#67C23A' },
  { component: 'Spring Boot (应用)', memory: '0.77 GB', percentage: '19%', color: '#E6A23C' },
  { component: 'OS 系统预留', memory: '0.2 GB', percentage: '5%', color: '#909399' }
]

// 部署步骤
const deploySteps = [
  {
    title: '系统优化',
    desc: '卸载冗余监控，配置 Swap 和内核参数',
    code: 'wget http://update.aegis.aliyun.com/download/uninstall.sh && ./uninstall.sh'
  },
  {
    title: '部署 Milvus',
    desc: '使用优化的 docker-compose 启动向量库',
    code: 'cd /usr/milvus && docker compose up -d'
  },
  {
    title: '配置模型',
    desc: '拉取 Qwen 和 BGE 模型，限制线程数',
    code: 'ollama pull qwen2.5:1.5b && ollama pull bge-m3'
  },
  {
    title: '启动应用',
    desc: '限制 JVM 内存，上传 JAR 运行',
    code: 'java -Xms512m -Xmx768m -jar rag-system.jar'
  }
]

// 常见问题
const faqs = [
  {
    question: 'Connection Refused 19530',
    cause: 'Milvus 未启动或端口被拦截',
    solution: '检查 docker compose ps，确认安全组开放 19530 端口'
  },
  {
    question: 'collection not found',
    cause: 'Spring AI M6 版本自动配置失效',
    solution: '使用 Java 配置类强制注入，手动在 Attu 中建表'
  },
  {
    question: 'OOM 内存溢出',
    cause: '组件内存无限制导致资源争抢',
    solution: '设置 Docker 内存限制 + JVM -Xmx 参数'
  },
  {
    question: 'SSE 断包乱码',
    cause: '前端未处理不完整的数据包',
    solution: '引入 Buffer 机制，保留不完整行到下一包处理'
  }
]

/**
 * 切换详情显示并平滑滚动
 */
const handleToggleDetails = () => {
  showDetails.value = !showDetails.value
  if (showDetails.value) {
    nextTick(() => {
      const el = document.getElementById('tech-section')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }
}

const goToChat = () => {
  router.push('/chat/rag')
}

const copyCode = async (code: string) => {
  try {
    await navigator.clipboard.writeText(code)
    ElMessage.success('代码已复制到剪贴板')
  } catch (err) {
    ElMessage.error('复制失败')
  }
}

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 监听滚动
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* CSS 变量定义 */
:root {
  --primary-color: #409EFF;
  --success-color: #67C23A;
  --warning-color: #E6A23C;
  --danger-color: #F56C6C;
  --info-color: #909399;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --border-color: #f1f5f9;
}

/* 容器与整体布局 */
.home-container {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background-color: var(--bg-secondary);
  scroll-behavior: smooth;
  position: relative;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px 40px;
}

/* 顶部横幅 */
.top-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.95rem;
}

.banner-icon {
  font-size: 1.2rem;
}

/* Hero Section */
.hero-section {
  margin: 30px 0 40px;
}

.hero-card {
  background: var(--bg-primary);
  border-radius: 24px;
  padding: 48px 32px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #409EFF, #67C23A, #E6A23C);
}

.hero-badge-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--text-primary);
  margin: 0 0 20px 0;
}

.gradient-text {
  background: linear-gradient(135deg, #409EFF 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-subtitle strong {
  color: var(--primary-color);
  font-weight: 600;
}

.action-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  min-width: 200px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(64, 158, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.btn-secondary {
  min-width: 200px;
  font-weight: 600;
}

/* 指标卡片 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.metric-item {
  background: var(--bg-primary);
  padding: 28px 24px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--primary-color);
}

.metric-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.m-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--primary-color);
  line-height: 1.2;
  margin-bottom: 8px;
}

.m-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.m-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* 详情区块 */
.details-section {
  margin-top: 30px;
  scroll-margin-top: 80px;
}

.info-card {
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.info-card :deep(.el-card__header) {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  padding: 16px 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header span {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
}

/* 性能对比表 */
.table-container {
  overflow-x: auto;
}

.stat-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.stat-table th {
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  font-weight: 600;
  text-align: left;
  padding: 14px 12px;
}

.stat-table td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--border-color);
}

.stat-table tbody tr:hover {
  background-color: var(--bg-secondary);
}

.metric-name {
  font-weight: 500;
  color: var(--text-primary);
}

.status-bad {
  color: var(--danger-color);
  font-weight: 600;
}

.status-good {
  color: var(--success-color);
  font-weight: 600;
}

.improvement {
  color: var(--primary-color);
  font-weight: 700;
}

/* 标签云 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag-cloud .el-tag {
  animation: fadeIn 0.3s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.mini-tips {
  margin: 0;
  padding-left: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 2;
  list-style: none;
}

.mini-tips li {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tip-icon {
  color: var(--success-color);
  font-size: 1rem;
}

/* 内存分配 */
.memory-allocation {
  padding: 8px 0;
}

.memory-bar {
  margin-bottom: 20px;
}

.memory-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.component-name {
  color: var(--text-primary);
  font-weight: 500;
}

.component-size {
  color: var(--text-secondary);
  font-weight: 600;
}

.memory-track {
  height: 28px;
  background: var(--bg-secondary);
  border-radius: 14px;
  overflow: hidden;
  position: relative;
}

.memory-fill {
  height: 100%;
  border-radius: 14px;
  transition: width 0.8s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
}

.memory-percent {
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 部署步骤 */
.deploy-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), #06b6d4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  margin: 0 0 6px 0;
  color: var(--text-primary);
  font-size: 1rem;
}

.step-content p {
  margin: 0 0 10px 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.step-code {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1e1e1e;
  padding: 10px 14px;
  border-radius: 8px;
  overflow-x: auto;
}

.step-code code {
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.85rem;
  flex: 1;
  white-space: nowrap;
}

.copy-btn {
  color: #9cdcfe;
  flex-shrink: 0;
}

.copy-btn:hover {
  color: white;
}

/* FAQ */
.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 12px;
}

.faq-item {
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: var(--primary-color);
  background: white;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: var(--text-primary);
}

.faq-icon {
  color: var(--primary-color);
  font-size: 1.2rem;
}

.faq-answer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.faq-answer p {
  margin: 6px 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.faq-answer strong {
  color: var(--text-primary);
}

/* 底部 spacer */
.bottom-spacer {
  height: 100px;
}

/* 回到顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.back-to-top:hover {
  transform: translateY(-2px);
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-content {
    padding: 16px 16px 30px;
  }

  .hero-card {
    padding: 32px 20px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .action-group {
    flex-direction: column;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .metric-item {
    padding: 20px 16px;
  }

  .m-value {
    font-size: 1.6rem;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }

  .banner-content {
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }

  .step-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .step-code {
    flex-direction: column;
    align-items: stretch;
  }

  .step-code code {
    white-space: pre-wrap;
    word-break: break-all;
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
