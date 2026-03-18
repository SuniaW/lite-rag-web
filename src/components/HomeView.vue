<template>
  <div class="home-container">
    <div class="main-content">

      <!-- Hero 欢迎区 -->
      <section class="hero-section">
        <div class="hero-card">
          <h1 class="hero-title">Lite-RAG 智能助手</h1>
          <p class="hero-subtitle">
            基于 Spring AI 与 Milvus 2.6 构建的工业级私有化知识库。<br>
            经过深度性能调优，实现低功耗环境下的秒级生成。
          </p>
          <div class="action-group">
            <el-button type="primary" size="large" @click="goToChat" round class="btn-primary">
              进入知识库问答
            </el-button>
            <el-button size="large" round @click="handleToggleDetails" class="btn-secondary">
              {{ showDetails ? '隐藏技术规格' : '技术规格说明' }}
            </el-button>
          </div>
        </div>
      </section>

      <!-- 核心指标区 -->
      <div class="metrics-grid">
        <div class="metric-item" v-for="m in coreMetrics" :key="m.title">
          <div class="m-value">{{ m.value }}</div>
          <div class="m-title">{{ m.title }}</div>
          <div class="m-desc">{{ m.desc }}</div>
        </div>
      </div>

      <!-- 隐藏的技术细节区 -->
      <transition name="el-zoom-in-top">
        <div v-if="showDetails" id="tech-section" class="details-section">
          <el-row :gutter="20">
            <!-- 工业级调优对比 -->
            <el-col :xs="24" :md="14">
              <el-card header="📊 工业级调优对比" class="info-card">
                <div class="table-container">
                  <table class="stat-table">
                    <thead>
                    <tr>
                      <th>指标</th>
                      <th>默认</th>
                      <th>调优后</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>可用内存</td>
                      <td class="status-bad">100MB (OOM)</td>
                      <td class="status-good">1.8GB+</td>
                    </tr>
                    <tr>
                      <td>首字响应</td>
                      <td class="status-bad">60s+</td>
                      <td class="status-good">3-5s</td>
                    </tr>
                    <tr>
                      <td>分片质量</td>
                      <td class="status-bad">断章取义</td>
                      <td class="status-good">语义清洗</td>
                    </tr>
                    <tr>
                      <td>IO 等待</td>
                      <td class="status-bad">频繁卡死</td>
                      <td class="status-good">0.1% (丝滑)</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-card>
            </el-col>

            <!-- 核心技术栈 -->
            <el-col :xs="24" :md="10">
              <el-card header="🛠️ 核心技术栈" class="info-card">
                <div class="tag-cloud">
                  <el-tag v-for="t in techStack" :key="t" effect="dark" size="small">{{ t }}</el-tag>
                </div>
                <el-divider>调优要点</el-divider>
                <ul class="mini-tips">
                  <li>HNSW 向量索引算法优化</li>
                  <li>Ollama 线程配额精细化控制</li>
                  <li>SSE 字符断包流式拼接修复</li>
                  <li>Linux 内核 Swap 积极度调优</li>
                </ul>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </transition>

      <!-- 底部撑开空间 -->
      <div class="bottom-spacer"></div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showDetails = ref(false)

/**
 * 切换详情显示并平滑滚动
 */
const handleToggleDetails = () => {
  showDetails.value = !showDetails.value
  if (showDetails.value) {
    nextTick(() => {
      const el = document.getElementById('tech-section')
      if (el) {
        // 使用更精确的滚动计算
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }
}

const goToChat = () => {
  router.push('/chat/rag')
}

const coreMetrics = [
  { title: '推理模型', value: 'Qwen 1.5B', desc: '性能与智能的最佳平衡' },
  { title: '平均响应', value: '3.5s', desc: '首字生成平均耗时' },
  { title: '检索引擎', value: 'HNSW', desc: '毫秒级高精度语义召回' }
]

const techStack = ['Spring Boot 3.4', 'Spring AI M6', 'Milvus 2.6', 'Ollama', 'Tika', 'Docker']
</script>

<style scoped>
/* 容器与整体布局 */
.home-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #f8fafc;
  scroll-behavior: smooth;
}

.main-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Hero Section 视觉强化 */
.hero-section {
  margin-bottom: 40px;
}

.hero-card {
  background: #fff;
  border-radius: 20px;
  padding: 40px 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  border: 1px solid #f1f5f9;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #1e293b;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 32px;
}

.action-group {
  display: flex;
  gap: 16px;
  justify-content: center;
}

/* 指标栅格布局 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.metric-item {
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #f1f5f9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.metric-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}

.m-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: #3b82f6;
  line-height: 1.2;
}

.m-title {
  font-weight: 600;
  color: #1e293b;
  margin: 8px 0 4px 0;
}

.m-desc {
  font-size: 0.875rem;
  color: #94a3b8;
}

/* 详情区块样式 */
.details-section {
  margin-top: 24px;
  scroll-margin-top: 20px;
}

.info-card {
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  margin-bottom: 20px;
}

.table-container {
  overflow-x: auto;
}

.stat-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.stat-table th {
  background-color: #f8fafc;
  color: #64748b;
  font-weight: 600;
  text-align: left;
}

.stat-table th,
.stat-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #f1f5f9;
}

.status-bad { color: #ef4444; font-weight: 600; }
.status-good { color: #10b981; font-weight: 600; }

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mini-tips {
  margin: 12px 0 0 0;
  padding-left: 20px;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.8;
}

.bottom-spacer {
  height: 80px;
}

/* 移动端适配强化 */
@media (max-width: 768px) {
  .main-content {
    padding: 24px 16px;
  }
  .action-group {
    flex-direction: column;
  }
  .btn-primary, .btn-secondary {
    width: 100%;
    margin: 0 !important;
  }
  .m-value {
    font-size: 1.8rem;
  }
}
</style>
