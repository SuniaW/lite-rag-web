<template>
  <div class="home-container">
    <!-- 顶部导航提示 -->
    <div class="top-banner">
      <div class="banner-content">
        <span class="banner-icon">🚀</span>
        <span class="banner-text">专为 2 核 4G 环境深度优化的企业级 RAG 系统</span>
        <el-tag size="small" type="success" effect="dark" class="banner-tag">生产就绪</el-tag>
      </div>
      <div class="banner-glow"></div>
    </div>

    <div class="main-content">
      <!-- Hero 欢迎区 -->
      <section class="hero-section">
        <div class="hero-bg-decoration">
          <div class="hero-orb orb-1"></div>
          <div class="hero-orb orb-2"></div>
          <div class="hero-orb orb-3"></div>
        </div>

        <div class="hero-card glass-effect">
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
              <span class="badge-dot"></span>
              {{ badge.text }}
            </el-tag>
          </div>

          <h1 class="hero-title">
            <span class="gradient-text">Lite-RAG</span>
            <span class="title-subtitle">智能助手</span>
          </h1>

          <p class="hero-subtitle">
            基于 <strong class="highlight-primary">Spring AI</strong> 与 <strong class="highlight-secondary">Milvus 2.6</strong> 构建的工业级私有化知识库。<br>
            经过深度性能调优，实现 <strong class="highlight-accent">低功耗环境下的秒级生成</strong>。
          </p>

          <div class="action-group">
            <el-button type="primary" size="large" @click="goToChat" round class="btn-primary glow-btn">
              <el-icon><ChatDotRound /></el-icon>
              进入知识库问答
            </el-button>
            <el-button size="large" round @click="handleToggleDetails" class="btn-secondary">
              <el-icon>
                <component :is="showDetails ? 'Fold' : 'Expand'" />
              </el-icon>
              {{ showDetails ? '隐藏技术规格' : '技术规格说明' }}
            </el-button>
            <el-button size="large" round @click="scrollToSection('author-section')" class="btn-tertiary">
              <el-icon><User /></el-icon>
              关于作者
            </el-button>
          </div>
        </div>
      </section>

      <!-- 核心指标区 -->
      <div class="metrics-grid">
        <div
          class="metric-item glass-effect"
          v-for="(m, index) in coreMetrics"
          :key="m.title"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="metric-icon-wrapper">
            <div class="metric-icon">{{ m.icon }}</div>
            <div class="metric-ring"></div>
          </div>
          <div class="m-value">{{ m.value }}</div>
          <div class="m-title">{{ m.title }}</div>
          <div class="m-desc">{{ m.desc }}</div>
          <div class="metric-hover-glow"></div>
        </div>
      </div>

      <!-- 隐藏的技术细节区 -->
      <transition name="el-zoom-in-top">
        <div v-if="showDetails" id="tech-section" class="details-section">
          <!-- 软件规格 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="24">
              <el-card header="📋 软件规格清单" class="info-card glass-effect">
                <el-table
                  :data="softwareSpecs"
                  stripe
                  style="width: 100%"
                  :default-sort="{prop: 'category', order: 'ascending'}"
                  class="styled-table"
                >
                  <el-table-column prop="category" label="类别" width="120" sortable />
                  <el-table-column prop="name" label="名称" width="180" />
                  <el-table-column prop="version" label="版本" width="120" />
                  <el-table-column prop="purpose" label="用途" />
                  <el-table-column prop="status" label="状态" width="100">
                    <template #default="scope">
                      <el-tag
                        :type="scope.row.status === '生产级' ? 'success' : 'info'"
                        size="small"
                        effect="dark"
                      >
                        {{ scope.row.status }}
                      </el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>

          <!-- 核心技术详解 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="24">
              <el-card header="🔬 核心技术详解" class="info-card glass-effect">
                <div class="tech-details">
                  <div class="tech-detail-item" v-for="(tech, index) in coreTechnologies" :key="tech.name" :style="{ animationDelay: `${index * 0.1}s` }">
                    <div class="tech-detail-header">
                      <span class="tech-icon">{{ tech.icon }}</span>
                      <h4>{{ tech.name }}</h4>
                      <el-tag :type="tech.tagType" size="small" effect="dark">{{ tech.level }}</el-tag>
                    </div>
                    <p class="tech-detail-desc">{{ tech.description }}</p>
                    <div class="tech-detail-features">
                      <span v-for="feature in tech.features" :key="feature" class="feature-tag">
                        <el-icon><Check /></el-icon>
                        {{ feature }}
                      </span>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 20px;">
            <!-- 核心技术栈 -->
            <el-col :xs="24" :md="24">
            <el-card shadow="hover" class="techstack-card-v2">
              <template #header>
                <div class="card-header">
                  <div class="header-left">
                    <el-icon class="header-icon"><Tools /></el-icon>
                    <h3>核心技术栈</h3>
                  </div>
                  <el-tag type="warning" size="small" effect="dark" round>最新版本</el-tag>
                </div>
              </template>

              <!-- 技术栈标签流 -->
              <div class="tech-flow">
                <div class="tech-item" v-for="(tech, index) in allTechs" :key="index">
                  <el-tag :type="getTechType(tech)" round size="small">{{ tech }}</el-tag>
                </div>
              </div>

              <!-- 调优要点时间轴 -->
              <div class="timeline">
                <div
                  v-for="(tip, index) in optimizationTips"
                  :key="index"
                  class="timeline-item"
                >
                  <div class="timeline-dot">
                    <el-icon><CircleCheckFilled /></el-icon>
                  </div>
                  <div class="timeline-content">
                    <div class="timeline-number">{{ String(index + 1).padStart(2, '0') }}</div>
                    <div class="timeline-text">{{ tip }}</div>
                  </div>
                  <div class="timeline-bar" v-if="index < optimizationTips.length - 1"></div>
                </div>
              </div>
            </el-card>
            </el-col>
          </el-row>
          <!-- 服务器规格 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="12">
              <el-card header="🖥️ 服务器规格" class="info-card glass-effect">
                <div class="spec-grid">
                  <div class="spec-item" v-for="(spec, index) in serverSpecs" :key="spec.name" :style="{ animationDelay: `${index * 0.05}s` }">
                    <div class="spec-label">{{ spec.name }}</div>
                    <div class="spec-value">{{ spec.value }}</div>
                    <div class="spec-note">{{ spec.note }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>

            <!-- 服务规格 -->
            <el-col :xs="24" :md="12">
              <el-card header="⚙️ 服务规格" class="info-card glass-effect">
                <div class="spec-grid">
                  <div class="spec-item" v-for="(spec, index) in serviceSpecs" :key="spec.name" :style="{ animationDelay: `${index * 0.05}s` }">
                    <div class="spec-label">{{ spec.name }}</div>
                    <div class="spec-value gradient-value">{{ spec.value }}</div>
                    <div class="spec-note">{{ spec.note }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!-- 性能对比卡片 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="24">
              <el-card header="📊 工业级调优对比" class="info-card glass-effect performance-card">
                <template #header>
                  <div class="card-header">
                    <div class="header-left">
                      <span class="header-icon">📊</span>
                      <span>工业级调优对比</span>
                    </div>
                    <el-tag type="success" size="small" effect="dark">生产验证</el-tag>
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
                    <tr v-for="(item, index) in performanceData" :key="item.metric">
                      <td class="metric-name">
                        <span class="row-indicator" :style="{ animationDelay: `${index * 0.1}s` }"></span>
                        {{ item.metric }}
                      </td>
                      <td class="status-bad">
                        <span class="status-dot bad"></span>
                        {{ item.before }}
                      </td>
                      <td class="status-good">
                        <span class="status-dot good"></span>
                        {{ item.after }}
                      </td>
                      <td class="improvement">
                        <span class="improvement-badge">+{{ item.improvement }}</span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!-- 内存分配可视化 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="24">
              <el-card header="💾 4GB 内存分配方案" class="info-card glass-effect">
                <div class="memory-allocation">
                  <div
                    v-for="(item, index) in memoryAllocation"
                    :key="item.component"
                    class="memory-bar"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                  >
                    <div class="memory-label">
                      <span class="component-name">{{ item.component }}</span>
                      <span class="component-size" :style="{ color: item.color }">{{ item.memory }}</span>
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
                  <div class="memory-total">
                    <span>总内存：</span>
                    <span class="total-value">4.0 GB</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!-- 开源仓库 & 技术博客 -->
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :xs="24" :md="24">
              <el-card header="📦 开源代码仓库" class="info-card glass-effect repo-card">
                <div class="repo-list">
                  <div class="repo-item" v-for="(repo, index) in repositories" :key="repo.name" :style="{ animationDelay: `${index * 0.08}s` }">
                    <div class="repo-icon">
                      <el-icon><FolderOpened /></el-icon>
                    </div>
                    <div class="repo-info">
                      <h4>{{ repo.name }}</h4>
                      <p>{{ repo.description }}</p>
                      <div class="repo-meta">
                        <span class="repo-lang">{{ repo.language }}</span>
                      </div>
                    </div>
                    <el-button type="primary" text @click="openLink(repo.url)" class="repo-btn">
                      <el-icon><Link /></el-icon>
                      访问
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </transition>

      <!-- ==================== 新增：全栈学习手册专区 ==================== -->
      <section class="handbook-section" id="handbook-section">
        <el-card class="handbook-card glass-effect">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <span class="header-icon">📚</span>
                <span>Spring AI + 大模型全栈实战指南</span>
              </div>
              <el-tag type="danger" size="small" effect="dark">完整学习路径</el-tag>
            </div>
          </template>

          <div class="handbook-intro">
            <p class="intro-text">
              本系统是我在学习 <strong>Spring AI + 大模型</strong> 过程中的全栈实践成果。
              以下是完整的 9 大专题学习手册，涵盖从架构设计到生产部署的全部知识。
            </p>
            <div class="handbook-stats">
              <div class="handbook-stat-item">
                <div class="stat-num">9</div>
                <div class="stat-label">核心专题</div>
              </div>
              <div class="handbook-stat-item">
                <div class="stat-num">50+</div>
                <div class="stat-label">技术要点</div>
              </div>
              <div class="handbook-stat-item">
                <div class="stat-num">100%</div>
                <div class="stat-label">开源代码</div>
              </div>
              <div class="handbook-stat-item">
                <div class="stat-num">生产级</div>
                <div class="stat-label">部署方案</div>
              </div>
            </div>
          </div>

          <!-- 9 大专题网格 -->
          <el-row :gutter="20" class="topic-grid">
            <el-col
              v-for="(topic, index) in handbookTopics"
              :key="index"
              :xs="24"
              :sm="12"
              :md="8"
              class="topic-col"
            >
              <el-card
                shadow="hover"
                class="topic-card"
                @click="handleTopicClick(index)"
              >
                <div class="topic-card-header">
                  <span class="topic-num">{{ String(index + 1).padStart(2, '0') }}</span>
                  <el-tag :type="getTopicLevelType(topic.level)" size="small">{{ topic.level }}</el-tag>
                </div>
                <h3 class="topic-title">{{ topic.title }}</h3>
                <p class="topic-desc">{{ topic.desc }}</p>
                <div class="topic-tags">
            <span v-for="tag in topic.tags" :key="tag" class="mini-topic-tag">
              <el-icon><Ticket /></el-icon> {{ tag }}
            </span>
                </div>
                <div class="topic-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: topic.progress }"></div>
                  </div>
                  <span class="progress-text">{{ topic.progress }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <!-- 手册特色 -->
          <el-row :gutter="20" style="margin-top: 30px;">
            <el-col :xs="24" :md="8" v-for="(feature, index) in handbookFeatures" :key="index">
              <div class="handbook-feature-item">
                <div class="feature-icon-wrapper" :style="{ background: feature.color }">
                  <el-icon :size="28" color="#fff"><component :is="feature.icon" /></el-icon>
                </div>
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.desc }}</p>
              </div>
            </el-col>
          </el-row>

          <!-- 行动按钮 -->
          <div class="handbook-actions">
            <el-button type="primary" size="large" round @click="openGithubHandbook" class="glow-btn">
              <el-icon><FolderOpened /></el-icon> GitHub 查看全部文档
            </el-button>
            <el-button size="large" round plain @click="downloadPDF">
              <el-icon><Download /></el-icon> 下载 PDF 版本
            </el-button>
          </div>
        </el-card>
      </section>
      <!-- ==================== 学习手册专区结束 ==================== -->

      <!-- 作者推广区 -->
      <section id="author-section" class="author-section">
        <el-card class="author-card glass-effect">
          <div class="author-bg-decoration">
            <div class="author-orb"></div>
          </div>
          <div class="author-content">
            <div class="author-avatar">
              <div class="avatar-placeholder">
                <span class="avatar-text">汪</span>
                <div class="avatar-ring"></div>
              </div>
            </div>
            <div class="author-info">
              <h2>{{ author.name }}</h2>
              <p class="author-title">{{ author.title }}</p>
              <p class="author-desc">{{ author.description }}</p>
              <div class="author-tags">
                <el-tag v-for="tag in author.tags" :key="tag" size="small" effect="plain" class="author-tag">
                  {{ tag }}
                </el-tag>
              </div>
              <div class="author-stats">
                <div class="stat-item" v-for="stat in author.stats" :key="stat.label">
                  <div class="stat-value">{{ stat.value }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 个人优势 -->
        <el-card class="advantage-card glass-effect" style="margin-top: 30px;">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <span class="header-icon">💡</span>
                <span>个人优势</span>
              </div>
              <el-tag type="primary" size="small" effect="dark">12 年专业经验</el-tag>
            </div>
          </template>
          <div class="advantage-grid">
            <div class="advantage-item" v-for="(item, index) in advantages" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="advantage-number">{{ index + 1 }}</div>
              <div class="advantage-content">
                <p>{{ item }}</p>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 项目经历展示 -->
        <el-card class="project-card glass-effect" style="margin-top: 30px;">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <span class="header-icon">🎯</span>
                <span>代表项目经历</span>
              </div>
              <el-tag type="primary" size="small" effect="dark">12 年专业经验</el-tag>
            </div>
          </template>
          <div class="project-timeline">
            <div class="project-item" v-for="(project, index) in projects" :key="project.name" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="project-time">{{ project.time }}</div>
              <div class="project-dot"></div>
              <div class="project-content">
                <h4>{{ project.name }}</h4>
                <p class="project-company">{{ project.company }}</p>
                <div class="project-tags">
                  <el-tag v-for="tech in project.technologies" :key="tech" size="small" class="project-tech-tag">
                    {{ tech }}
                  </el-tag>
                </div>
                <ul class="project-achievements">
                  <li v-for="achievement in project.achievements" :key="achievement">
                    <el-icon class="achievement-icon"><Check /></el-icon>
                    <span>{{ achievement }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 专业技能展示 -->
        <el-card class="skills-card glass-effect" style="margin-top: 30px;">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <span class="header-icon">🛠️</span>
                <span>专业技能</span>
              </div>
              <el-tag type="success" size="small" effect="dark">全栈能力</el-tag>
            </div>
          </template>
          <div class="skills-grid">
            <div class="skill-category" v-for="(category, index) in skills" :key="category.name" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="skill-header">
                <span class="skill-icon">{{ category.icon }}</span>
                <h4>{{ category.name }}</h4>
                <el-tag :type="category.level === '精通' ? 'danger' : category.level === '熟练' ? 'warning' : 'info'" size="small">
                  {{ category.level }}
                </el-tag>
              </div>
              <div class="skill-items">
                <span class="skill-item" v-for="item in category.items" :key="item">{{ item }}</span>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 教育背景 -->
<!--        <el-card class="education-card glass-effect" style="margin-top: 30px;">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <span class="header-icon">🎓</span>
                <span>教育背景</span>
              </div>
            </div>
          </template>
          <div class="education-item">
            <div class="education-school">
              <span class="school-icon">🏫</span>
              <span class="school-name">哈尔滨师范大学</span>
            </div>
            <div class="education-info">
              <span class="education-major">数字媒体技术.游戏软件开发</span>
              <span class="education-degree">本科</span>
              <span class="education-time">2010.09 - 2014.07</span>
            </div>
          </div>
        </el-card>-->
      </section>

      <!-- 联系方式 -->
      <section class="contact-section">
        <el-card class="contact-card gradient-card">
          <div class="contact-bg-pattern"></div>
          <h3>📬 联系与合作</h3>
          <p>欢迎交流 RAG 技术、性能调优、企业私有化部署等话题</p>
          <div class="contact-methods">
            <div class="contact-item" v-for="contact in contacts" :key="contact.name">
              <div class="contact-icon-wrapper">
                <el-icon class="contact-icon"><component :is="contact.icon" /></el-icon>
              </div>
              <div class="contact-info">
                <span class="contact-label">{{ contact.name }}</span>
                <span class="contact-value">{{ contact.value }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </section>

      <!-- 底部撑开空间 -->
      <div class="bottom-spacer"></div>
    </div>

    <!-- 回到顶部按钮 -->
    <transition name="fade">
      <el-button
        v-show="showBackToTop"
        circle
        class="back-to-top glow-btn"
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
  ChatDotRound, Download, Check, CopyDocument, ArrowUp, ArrowDown,
  User, Monitor, FolderOpened, Star, Link, Document, Calendar,
  Printer, Ticket, ShoppingCart, Reading
} from '@element-plus/icons-vue'
import { Tools, CircleCheckFilled } from '@element-plus/icons-vue'


const router = useRouter()
const showDetails = ref(false)
const expandedFaq = ref<number | null>(null)
const showBackToTop = ref(false)


// ==================== 学习手册数据 ====================
const handbookTopics = [
  {
    title: 'RAG 技术全景解析',
    level: '架构',
    desc: '从原理出发，深度解析检索增强生成的离线/在线双环架构设计',
    tags: ['架构设计', '技术选型', '流程拆解'],
    progress: '100%'
  },
  {
    title: 'Milvus 向量数据库',
    level: '数据库',
    desc: '从零搭建 RAG 系统核心组件，掌握 Milvus 2.6 高性能配置',
    tags: ['向量检索', '环境搭建', 'HNSW 索引'],
    progress: '100%'
  },
  {
    title: 'Embedding 模型选型指南',
    level: '核心',
    desc: '深入对比 BGE、OpenAI 等主流模型，掌握 MTEB 评测与应用实战',
    tags: ['模型对比', 'MTEB 排名', '语义嵌入'],
    progress: '100%'
  },
  {
    title: 'Ollama 模型管理与调优',
    level: '进阶',
    desc: '让 AI 模型在低配服务器上流畅运行，针对 2核4G 的极致性能调优',
    tags: ['模型量化', '线程配额', '本地部署'],
    progress: '100%'
  },
  {
    title: 'Spring AI 后端开发实战',
    level: '后端',
    desc: '基于 Spring AI 封装 LLM 调用，仅需 30 行代码打通 RAG 核心逻辑',
    tags: ['Spring AI', '业务流转', '代码实战'],
    progress: '100%'
  },
  {
    title: 'Vue3 前端开发实战',
    level: '前端',
    desc: '构建企业级对话界面，实现 SSE 流式 Markdown 渲染与打字机效果',
    tags: ['Vue3', 'SSE 流', 'Markdown'],
    progress: '100%'
  },
  {
    title: 'RAG 系统性能调优实战',
    level: '高级',
    desc: '全链路性能瓶颈拆解，实现首字响应从 3 秒到 300ms 的飞跃',
    tags: ['性能瓶颈', '多级缓存', '并发控制'],
    progress: '100%'
  },
  {
    title: 'RAG 安全与权限管理',
    level: '生产',
    desc: '实现文档级权限控制与敏感数据脱敏，构建企业级安全堡垒',
    tags: ['数据保护', 'RBAC', '安全审计'],
    progress: '100%'
  },
  {
    title: 'RAG 系统运维与故障排查',
    level: '专家',
    desc: '从 Docker 部署到监控体系构建，实战 OOM 与网络抖动排查指南',
    tags: ['运维监控', '故障分析', '容器编排'],
    progress: '100%'
  }
]

const handbookFeatures = [
  {
    title: '完整源码',
    desc: '所有示例代码均可直接运行，包含详细注释',
    icon: Monitor,
    color: 'linear-gradient(135deg, #409EFF 0%, #337ecc 100%)'
  },
  {
    title: '生产部署',
    desc: 'Docker Compose 一键部署，包含完整运维脚本',
    icon: Monitor,
    color: 'linear-gradient(135deg, #67C23A 0%, #529b2e 100%)'
  },
  {
    title: '持续更新',
    desc: '跟随技术迭代持续更新，保持内容前沿性',
    icon: Reading,
    color: 'linear-gradient(135deg, #E6A23C 0%, #b88230 100%)'
  }
]

// ==================== 学习手册相关函数 ====================
const handleTopicClick = (topic: any) => {
  // 或者跳转到具体博文页面
  window.open(`/chat/topic/${topic+1}`, '_blank')
}

const openGithubHandbook = () => {
  window.open('https://github.com/SuniaW/study-notes', '_blank')
}

const downloadPDF = () => {
  ElMessage.success('PDF 版本下载功能开发中...')
  // 实际实现：window.open('/handbook.pdf', '_blank')
}

const getTopicLevelType = (level: string) => {
  const map: Record<string, any> = {
    '架构': 'danger',    // 红色（最重要）
    '数据库': 'warning',  // 橙色
    '核心': 'warning',   // 橙色
    '进阶': 'primary',   // 蓝色
    '后端': 'success',   // 绿色
    '前端': 'primary',   // 蓝色
    '高级': 'danger',    // 红色
    '生产': 'success',   // 绿色
    '专家': 'danger'     // 红色
  }
  return map[level] || 'info'
}

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
const allTechs = [
  'Spring Boot 3.4', 'Spring AI M6', 'Milvus 2.6', 'Ollama',
  'Qwen2.5-1.5B', 'BGE-M3', 'Apache Tika', 'Docker', 'NGINX'
]


const getTechType = (tech: string) => {
  if (tech.includes('Spring')) return ''
  if (tech.includes('Milvus') || tech.includes('Ollama') || tech.includes('Qwen') || tech.includes('BGE')) return 'warning'
  return 'success'
}


// 优化要点
const optimizationTips = [
  'HNSW 向量索引算法优化',
  'Ollama 线程配额精细化控制',
  'SSE 字符断包流式拼接修复',
  'Linux 内核 Swap 积极度调优',
  'JVM 内存红线严格限制',
  'Milvus 容器资源配额化',
  'NGINX Gzip 压缩与静态缓存优化',
  'NGINX 反向代理超时与连接池配置'
]

// 服务器规格
const serverSpecs = [
  { name: 'CPU', value: '2 核心', note: 'Intel/AMD 均可' },
  { name: '内存', value: '4GB', note: '最低配置' },
  { name: '存储', value: '50GB SSD', note: '推荐 NVMe' },
  { name: '网络', value: '100Mbps', note: '内网更佳' },
  { name: '系统', value: 'Ubuntu 22.04', note: '或 CentOS 7+' },
  { name: '云厂商', value: '阿里云/腾讯云', note: '已验证' }
]

// 服务规格
const serviceSpecs = [
  { name: '并发用户', value: '50+', note: '同时在线' },
  { name: 'QPS', value: '10-15', note: '查询/秒' },
  { name: '知识库容量', value: '10 万 + 文档', note: '支持 PDF/Word' },
  { name: '向量维度', value: '1024', note: 'BGE-M3' },
  { name: '响应时间', value: '3-5s', note: '首字生成' },
  { name: '可用性', value: '99.9%', note: '7×24 运行' }
]

// 软件规格
const softwareSpecs = [
  { category: '后端框架', name: 'Spring Boot', version: '3.4.3', purpose: '应用核心框架', status: '生产级' },
  { category: 'AI 框架', name: 'Spring AI', version: '1.0.0-M6', purpose: 'LLM 集成抽象层', status: '生产级' },
  { category: '向量数据库', name: 'Milvus', version: '2.6.0', purpose: '向量存储与检索', status: '生产级' },
  { category: 'LLM 服务', name: 'Ollama', version: 'Latest', purpose: '本地模型推理', status: '生产级' },
  { category: '推理模型', name: 'Qwen2.5', version: '1.5B', purpose: '文本生成', status: '生产级' },
  { category: 'Embedding', name: 'BGE-M3', version: '1024 维', purpose: '中文向量嵌入', status: '生产级' },
  { category: '文档解析', name: 'Apache Tika', version: 'Latest', purpose: '多格式文档解析', status: '生产级' },
  { category: '容器化', name: 'Docker', version: '24.0+', purpose: '服务隔离部署', status: '生产级' },
  { category: '编排工具', name: 'Docker Compose', version: '2.0+', purpose: '多容器管理', status: '生产级' },
  { category: 'Web 服务器', name: 'Nginx', version: '1.25+', purpose: '反向代理 / Gzip 压缩 / SSE 流式响应支持',  status: '生产级'  },
  { category: '前端框架', name: 'Vue 3', version: '3.4+', purpose: '用户界面', status: '生产级' },
]

// 内存分配
const memoryAllocation = [
  { component: 'Ollama (LLM 引擎)', memory: '2.2 GB', percentage: '55%', color: '#409EFF' },
  { component: 'Milvus (向量库)', memory: '1.0 GB', percentage: '25%', color: '#67C23A' },
  { component: 'Spring Boot (应用)', memory: '0.77 GB', percentage: '19%', color: '#E6A23C' },
  { component: 'OS 系统预留', memory: '0.2 GB', percentage: '5%', color: '#909399' }
]

// 核心技术
const coreTechnologies = [
  {
    name: 'RAG 检索增强生成',
    icon: '🔍',
    level: '核心',
    tagType: 'danger',
    description: '结合向量检索与大语言模型，实现知识库精准问答',
    features: ['语义检索', '上下文增强', '引用溯源', '防幻觉机制']
  },
  {
    name: 'HNSW 向量索引',
    icon: '📊',
    level: '优化',
    tagType: 'warning',
    description: '高效可导航小世界算法，实现毫秒级向量相似度搜索',
    features: ['O(log N) 复杂度', '高召回率', '内存友好', '增量更新']
  },
  {
    name: 'SSE 流式响应',
    icon: '⚡',
    level: '体验',
    tagType: 'primary',
    description: 'Server-Sent Events 实时推送，降低用户等待焦虑',
    features: ['首字即显', '断点续传', 'Buffer 拼接', '错误恢复']
  },
  {
    name: 'NGINX 反向代理',
    icon: '🌐',
    level: '生产',
    tagType: 'success', // 绿色代表稳定、通行
    description: '七层负载均衡与静态资源加速，保障高并发下的系统稳定性',
    features: ['Gzip 压缩', 'SSE 透传配置', 'Keepalive 长连接', '静态缓存策略']
  },
  {
    name: 'Docker Compose 编排',
    icon: '🐳',
    level: '部署',
    tagType: 'info', // 蓝色代表技术、基础设施
    description: '多容器一键编排与环境隔离，实现微服务架构的快速交付',
    features: ['一键启动', '网络隔离', '资源配额', '依赖管理']
  },
  {
    name: '内存分级管理',
    icon: '💾',
    level: '关键',
    tagType: 'success',
    description: 'JVM+Docker+Swap 三层内存管控，防止 OOM 崩溃',
    features: ['硬限制', '软限制', '溢出保护', '自动回收']
  }
]

// 开源仓库
const repositories = [
  {
    name: 'lite-rag',
    description: 'Lite-RAG 核心后端代码，Spring Boot + Spring AI 实现',
    stars: '1.2k',
    language: 'Java',
    url: 'https://github.com/SuniaW/lite-rag'
  },
  {
    name: 'lite-rag-web',
    description: 'Vue 3 前端界面，Element Plus 组件库',
    stars: '450',
    language: 'TypeScript',
    url: 'https://github.com/SuniaW/lite-rag-web'
  },
  {
    name: 'rag-deploy-scripts',
    description: '一键部署脚本与 Docker 配置',
    stars: '320',
    language: 'Shell',
    url: 'https://github.com/SuniaW/rag-deploy-scripts'
  }
]


// 作者信息
const author = {
  name: '汪旭',
  title: '资深全栈开发工程师 | AI 工程化专家 | 企业级系统架构师',
  description:'12年大型系统架构与全栈开发经验，精通 Java核心生态、Python与Vue3。' +
    '具备“一人成军”的端到端交付能力：从需求把控、架构设计到前后端开发与K8s自动化运维，支撑百万级日请求。' +
    '现深耕 AI 工程化（AI Engineering），擅长通过 Java/Python 结合 LLM，为企业构建高可用、低延迟的 RAG 智能问答与 Agent 业务系统。',

  tags: ['Spring 生态专家', 'AI 工程化', '性能调优', '全栈开发', '微服务架构', '金融风控'],
  stats: [
    { value: '12+', label: '年经验' },
    { value: '10+', label: '大型项目' },
    { value: '100 万+', label: '日均请求' },
    { value: '99.9%', label: '系统可用' }
  ],
  links: [
    { name: '邮箱', type: 'primary', icon: 'Message', url: 'mailto:m13186109757@163.com' },
    { name: '电话', type: 'success', icon: 'Phone', url: 'tel:13186109757' },
    { name: '所在地', type: 'info', icon: 'Location', url: '#' }
  ]
}

// 个人优势 - 根据简历更新
const advantages = [
  '12 年大型系统设计与开发经验，主导多个高并发、高可用微服务系统（日均百万级请求），覆盖金融风控、政务公开、无线运维等领域',
  '全栈技术能力突出：后端精通 Java（Spring Boot/Cloud）、Python；前端熟练 Vue3/Svelte；熟悉 Docker/K8s/Nginx 运维体系',
  '深度掌握数据架构：MySQL/PostgreSQL/Oracle + Redis/HBase + Neo4j，具备海量数据处理与性能调优实战经验',
  '积极探索 AI 工程落地：熟悉大模型（LLM）应用开发，掌握 RAG、Embedding、Function Calling 等技术，能基于 Spring AI 构建智能问答、工单分类、知识库等 AI 增强型系统',
  'AI 辅助开发提效： 深度掌握 AI 辅助开发工具（如 Copilot、Code Llama 等），通过 AI 工具链将代码生成效率提升 30%+，实现从需求分析、代码编写到单元测试的全流程智能化提效',
  '端到端全链路交付：具备从0到1独立交付完整产品的全生命周期能力。精通产品设计、架构分析、前端（Vue）与后端（Java）开发、数据库设计与优化、自动化部署及系统运维维护，真正实现一人覆盖从“想法”到“上线”的所有环节'
]

// 项目经历 - 根据简历更新
const projects = [
  {
    name: '智能政务知识助手（个人项目）',
    time: '2025.12 - 至今',
    company: '个人开源项目',
    technologies: ['Spring Boot', 'Spring AI', 'Milvus', 'Vue3', 'Ollama', 'RAG'],
    achievements: [
      '基于 Spring Boot + Spring AI + Milvus + Vue3 构建政务政策问答系统',
      '实现 PDF/Word 文档自动解析 → 向量化存储 → RAG 问答 → 流式响应',
      '使用 Qwen-7B 本地模型（Ollama）+ bge-small-zh Embedding',
      '支持多轮对话、引用溯源，响应延迟 2s',
      'GitHub 开源，提供 Docker 一键部署脚本'
    ]
  },
  {
    name: 'WMG 无线网络维护卫士平台',
    time: '2018.10 - 至今',
    company: '中软国际科技服务有限公司 · 研发经理',
    technologies: ['Spring Boot', 'Spring Cloud', 'Vue3', 'Docker', 'K8s', 'Nginx'],
    achievements: [
      '设计并实施统一故障树、事故树、变更评审与网络巡检四大模块',
      '推动前端框架由 JSP+iframe 向 Vue+ 乾坤微前端架构转型，页面加载速度提升 40%',
      '引入 Docker+Kubernetes 实现服务自动化部署，发布效率提升 60%',
      '重构反向频谱工具算法，频谱分析处理性能提升 50%',
      '支持并发用户量提升 50%，系统响应时间缩短 30%'
    ]
  },
  {
    name: '慧健风控系统',
    time: '2016.09 - 2018.03',
    company: '深圳前海联金所金融信息服务有限公司 · 全栈工程师',
    technologies: ['Spring', 'MyBatis', 'Redis', 'HBase', 'Drools'],
    achievements: [
      '构建自动化审批流程与多维度风险控制机制',
      '设计风控规则引擎与评分模型，自动审批通过率提升至 20%',
      '引入 HBase 实现海量历史数据高效存储，审批处理效率提升 50%',
      '系统支持每秒处理 10 万 + 次请求，坏账率下降 30%',
      '人工审核平均耗时由 3 天缩短至 1 小时'
    ]
  },
  {
    name: '渭南市华州区政务公开平台',
    time: '2018.03 - 2018.08',
    company: '西安鼎蓝通信科技有限公司 · 全栈工程师',
    technologies: ['Spring Boot', 'JPA', 'Shiro', 'Vue', 'Bootstrap'],
    achievements: [
      '设计并实施基于 SpringBoot、JPA 与 Shiro 的高可用系统架构',
      '支持日均访问量超过 10 万次，系统响应速度提升 30%',
      '独立开发文件上传、审批、发布及管理等核心功能模块',
      '统筹跨部门需求沟通与协作，确保系统按时交付上线'
    ]
  },
  {
    name: '赫美钱包消费信贷系统',
    time: '2017.04 - 2017.06',
    company: '深圳前海联金所金融信息服务有限公司 · 全栈工程师',
    technologies: ['Spring', 'SpringMVC', 'MyBatis', 'Dubbo', 'Redis'],
    achievements: [
      '主导系统架构设计与核心模块开发，实现用户提前消费与分期支付功能',
      '设计并实施基于 Dubbo 的微服务架构，接口平均响应时间降低 30%',
      '引入 Redis 作为分布式缓存，数据读取性能提升 50%',
      '搭建 Jenkins 持续集成与自动化部署流水线，发布频率从每周一次提升至每日多次'
    ]
  },
  {
    name: '固网解决方案系统',
    time: '2014.06 - 2016.03',
    company: '华为 · 全栈工程师',
    technologies: ['Spring', 'Hibernate', 'Extjs', 'Echart', 'MySQL'],
    achievements: [
      '主导系统整体架构设计，打造集资源共享、问题答疑与知识共享于一体的协同平台',
      '基于 Extjs 与 Echart 构建前端交互界面，实现数据可视化与高效资源检索',
      '通过索引优化与查询性能调优，将关键接口响应时间缩短 30%',
      '系统成功上线后稳定支持超过 500 名员工日常使用，资源分享量同比增长 50%'
    ]
  }
]

// 专业技能 - 根据简历更新
const skills = [
  {
    name: 'Java 生态',
    icon: '☕',
    level: '精通',
    items: ['Spring Boot', 'Spring Cloud', 'Spring AI', 'MyBatis', 'Dubbo', 'Maven']
  },
  {
    name: '前端技术',
    icon: '🎨',
    level: '精通',
    items: ['Vue3', 'Svelte', 'React', 'TypeScript', 'Element Plus', '微前端']
  },
  {
    name: '数据库/中间件',
    icon: '🗄️',
    level: '精通',
    items: ['MySQL', 'PostgreSQL', 'Oracle', 'Redis', 'HBase', 'Neo4j', 'Milvus']
  },
  {
    name: 'AI 智能系统',
    icon: '🤖',
    level: '熟练',
    items: ['RAG', 'Embedding', 'Function Calling', 'LangChain', 'Ollama', 'LLM 应用']
  },
  {
    name: '运维体系',
    icon: '⚙️',
    level: '熟练',
    items: ['Docker', 'Kubernetes', 'Nginx', 'Jenkins', 'Apollo', 'Linux']
  },
  {
    name: '其他语言',
    icon: '📝',
    level: '熟练',
    items: ['Python', 'JavaScript', 'Shell', 'SQL', 'HTML5', 'CSS3']
  }
]

// 联系方式 - 根据简历更新
const contacts = [
  { name: '邮箱', value: '644175013@qq.com', icon: 'Message' },
  { name: '所在地', value: '陕西 · 西安', icon: 'Location' },
  { name: '工作年限', value: '12 年', icon: 'Briefcase' }
]

// 方法
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

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
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

const openLink = (url: string) => {
  if (url === '#') return
  window.open(url, '_blank')
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
/* ==================== CSS 变量定义 ==================== */
.home-container {
  --primary-color: #409EFF;
  --primary-light: #66b1ff;
  --primary-dark: #337ecc;
  --success-color: #67C23A;
  --warning-color: #E6A23C;
  --danger-color: #F56C6C;
  --info-color: #909399;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 20px 50px rgba(0, 0, 0, 0.15);
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-accent: linear-gradient(135deg, #409EFF 0%, #06b6d4 100%);
  --gradient-success: linear-gradient(135deg, #67C23A 0%, #52c41a 100%);
}

/* ==================== 容器与整体布局 ==================== */
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

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 60px;
  position: relative;
  z-index: 1;
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

/* ==================== 顶部横幅 ==================== */
.top-banner {
  background: var(--gradient-primary);
  color: white;
  padding: 14px 24px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  overflow: hidden;
}

.top-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.banner-content {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
}

.banner-icon {
  font-size: 1.3rem;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.banner-text {
  font-weight: 500;
  letter-spacing: 0.3px;
}

.banner-tag {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.02); }
}

.banner-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
  transparent 0%,
  rgba(255, 255, 255, 0.5) 50%,
  transparent 100%
  );
}

/* ==================== Hero Section ==================== */
.hero-section {
  margin: 40px 0 50px;
  position: relative;
}

.hero-bg-decoration {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 800px;
  pointer-events: none;
  z-index: -1;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: orbFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: rgba(64, 158, 255, 0.3);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: rgba(102, 126, 234, 0.3);
  top: 50%;
  right: 10%;
  animation-delay: -2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: rgba(118, 75, 162, 0.3);
  bottom: 10%;
  left: 30%;
  animation-delay: -4s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -20px) scale(1.05); }
  50% { transform: translate(-10px, 20px) scale(0.95); }
  75% { transform: translate(-20px, -10px) scale(1.02); }
}

.hero-card {
  border-radius: 28px;
  padding: 56px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg,
  #409EFF 0%,
  #67C23A 25%,
  #E6A23C 50%,
  #F56C6C 75%,
  #409EFF 100%
  );
  background-size: 200% 100%;
  animation: gradientShift 4s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-badge-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.hero-badge {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  font-weight: 500;
  padding: 6px 14px;
}

.badge-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  margin-right: 6px;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-title {
  font-size: clamp(2.2rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  line-height: 1.1;
}

.gradient-text {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.title-subtitle {
  font-size: 0.6em;
  display: block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 8px;
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.15rem;
  line-height: 2;
  margin-bottom: 44px;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
}

.hero-subtitle strong {
  font-weight: 700;
}

.highlight-primary {
  color: var(--primary-color);
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.15) 0%, rgba(64, 158, 255, 0.05) 100%);
  padding: 2px 8px;
  border-radius: 4px;
}

.highlight-secondary {
  color: var(--success-color);
  background: linear-gradient(135deg, rgba(103, 194, 58, 0.15) 0%, rgba(103, 194, 58, 0.05) 100%);
  padding: 2px 8px;
  border-radius: 4px;
}

.highlight-accent {
  color: #06b6d4;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%);
  padding: 2px 8px;
  border-radius: 4px;
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
  font-size: 1rem;
  padding: 14px 28px;
  background: var(--gradient-accent);
  border: none;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.35);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.45);
}

.glow-btn {
  position: relative;
  overflow: hidden;
}

.glow-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: all 0.5s ease;
  opacity: 0;
}

.glow-btn:hover::after {
  opacity: 1;
  left: 100%;
}

.btn-secondary, .btn-tertiary {
  min-width: 200px;
  font-weight: 600;
  font-size: 1rem;
  padding: 14px 28px;
  transition: all 0.3s ease;
}

.btn-secondary:hover, .btn-tertiary:hover {
  transform: translateY(-2px);
}

/* ==================== 指标卡片 ==================== */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-bottom: 50px;
}

.metric-item {
  padding: 32px 28px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  position: relative;
  overflow: hidden;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.metric-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-color);
}

.metric-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
  rgba(64, 158, 255, 0.05) 0%,
  transparent 50%,
  rgba(102, 126, 234, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.metric-item:hover::before {
  opacity: 1;
}

.metric-hover-glow {
  position: absolute;
  bottom: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(64, 158, 255, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.metric-item:hover .metric-hover-glow {
  opacity: 1;
}

.metric-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.metric-icon {
  font-size: 3rem;
  position: relative;
  z-index: 1;
}

.metric-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border: 2px solid rgba(64, 158, 255, 0.2);
  border-radius: 50%;
  animation: ringPulse 2s ease-in-out infinite;
}

@keyframes ringPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
}

.m-value {
  font-size: 2.4rem;
  font-weight: 800;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin-bottom: 10px;
}

.m-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.m-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ==================== 详情区块 ==================== */
.details-section {
  margin-top: 40px;
  scroll-margin-top: 100px;
}

.info-card {
  border-radius: 20px;
  transition: all 0.3s ease;
}

.info-card:hover {
  box-shadow: var(--shadow-lg);
}

.info-card :deep(.el-card__header) {
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%);
  border-bottom: 1px solid var(--border-color);
  padding: 18px 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 1.3rem;
}

.card-header span {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
}

/* ==================== 性能对比表 ==================== */
.table-container {
  overflow-x: auto;
  padding: 8px 0;
}

.stat-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.stat-table th {
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.08) 0%, rgba(64, 158, 255, 0.02) 100%);
  padding: 14px 16px;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
  text-align: left;
}

.stat-table th:first-child {
  border-radius: 12px 0 0 0;
}

.stat-table th:last-child {
  border-radius: 0 12px 0 0;
}

.stat-table td {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.9rem;
}

.stat-table tbody tr:last-child td {
  border-bottom: none;
}

.stat-table tbody tr {
  transition: background 0.2s ease;
}

.stat-table tbody tr:hover {
  background: rgba(64, 158, 255, 0.04);
}

.metric-name {
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.row-indicator {
  width: 3px;
  height: 16px;
  background: var(--gradient-accent);
  border-radius: 2px;
  animation: indicatorGrow 0.5s ease forwards;
  transform-origin: bottom;
  transform: scaleY(0);
}

@keyframes indicatorGrow {
  to { transform: scaleY(1); }
}

.status-bad, .status-good {
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.bad {
  background: var(--danger-color);
  box-shadow: 0 0 10px rgba(245, 108, 108, 0.5);
}

.status-dot.good {
  background: var(--success-color);
  box-shadow: 0 0 10px rgba(103, 194, 58, 0.5);
}

.improvement-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, rgba(103, 194, 58, 0.15) 0%, rgba(103, 194, 58, 0.05) 100%);
  color: var(--success-color);
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.85rem;
}

/* ==================== 技术栈标签 ==================== */
.techstack-card-v2 {
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.tech-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f1f5f9;
  border-radius: 12px;
}

.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline-item {
  position: relative;
  padding-bottom: 20px;
}

.timeline-dot {
  position: absolute;
  left: -28px;
  top: 0;
  width: 24px;
  height: 24px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.timeline-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.timeline-content:hover {
  border-color: #409EFF;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
  transform: translateX(4px);
}

.timeline-number {
  font-size: 0.85rem;
  font-weight: 700;
  color: #409EFF;
  background: #eff6ff;
  padding: 4px 8px;
  border-radius: 4px;
  min-width: 36px;
  text-align: center;
}

.timeline-text {
  color: #475569;
  font-size: 0.9rem;
  flex: 1;
}

.timeline-bar {
  position: absolute;
  left: -20px;
  top: 24px;
  width: 2px;
  height: calc(100% - 4px);
  background: linear-gradient(180deg, #e2e8f0 0%, #f1f5f9 100%);
}
/* ==================== 规格网格 ==================== */
.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  padding: 8px 0;
}

.spec-item {
  padding: 18px 14px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%);
  border-radius: 14px;
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
  border: 1px solid transparent;
}

.spec-item:hover {
  transform: translateY(-3px);
  border-color: rgba(64, 158, 255, 0.3);
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.1);
}

.spec-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.spec-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.gradient-value {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.spec-note {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* ==================== 样式化表格 ==================== */
.styled-table :deep(.el-table) {
  background: transparent;
}

.styled-table :deep(.el-table__header th) {
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.08) 0%, rgba(64, 158, 255, 0.02) 100%);
  font-weight: 600;
}

.styled-table :deep(.el-table__row:hover) {
  background: rgba(64, 158, 255, 0.04);
}

/* ==================== 内存分配 ==================== */
.memory-allocation {
  padding: 16px 0;
}

.memory-bar {
  margin-bottom: 20px;
  animation: fadeInRight 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.memory-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.component-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.component-size {
  font-weight: 700;
  font-size: 0.9rem;
}

.memory-track {
  height: 28px;
  background: var(--bg-tertiary);
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.memory-fill {
  height: 100%;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  transition: width 1s ease-out;
  position: relative;
  overflow: hidden;
}

.memory-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
}

.memory-percent {
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  position: relative;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.memory-total {
  text-align: center;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px dashed var(--border-color);
  font-size: 1rem;
  color: var(--text-secondary);
}

.total-value {
  font-weight: 800;
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-left: 8px;
}

/* ==================== 技术详情 ==================== */
.tech-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 8px 0;
}

.tech-detail-item {
  padding: 24px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.6) 100%);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

.tech-detail-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(64, 158, 255, 0.3);
}

.tech-detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.tech-icon {
  font-size: 1.8rem;
}

.tech-detail-header h4 {
  flex: 1;
  margin: 0;
  color: var(--text-primary);
  font-size: 1.05rem;
  font-weight: 600;
}

.tech-detail-desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 16px;
}

.tech-detail-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  background: var(--bg-primary);
  border-radius: 16px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.feature-tag:hover {
  background: rgba(64, 158, 255, 0.1);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.feature-tag .el-icon {
  font-size: 0.75rem;
  color: var(--success-color);
}

/* ==================== 仓库 & 博客列表 ==================== */
.repo-list, .blog-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 8px 0;
}

.repo-item, .blog-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.6) 100%);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  animation: fadeInRight 0.5s ease forwards;
  opacity: 0;
}

.repo-item:hover, .blog-item:hover {
  border-color: var(--primary-color);
  background: var(--bg-primary);
  transform: translateX(4px);
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.1);
}

.repo-icon, .blog-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.2rem;
}

.repo-icon {
  background: var(--gradient-accent);
  color: white;
}

.blog-icon {
  background: linear-gradient(135deg, #E6A23C 0%, #f59e0b 100%);
  color: white;
}

.repo-info h4, .blog-info h4 {
  margin: 0 0 6px 0;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
}

.repo-info p, .blog-info p {
  margin: 0 0 10px 0;
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.6;
}

.repo-meta, .blog-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.repo-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #f59e0b;
  font-weight: 600;
}

.repo-btn, .blog-btn {
  margin-left: auto;
  flex-shrink: 0;
}

/* ==================== 作者区域 ==================== */
.author-section {
  margin-top: 60px;
}

.author-card {
  border-radius: 24px;
  overflow: hidden;
  position: relative;
}

.author-bg-decoration {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 400px;
  height: 400px;
  pointer-events: none;
}

.author-orb {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
  filter: blur(40px);
}

.author-card::before {
  content: '';
  display: block;
  height: 5px;
  background: var(--gradient-primary);
}

.author-content {
  display: flex;
  gap: 50px;
  padding: 50px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.author-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 4.5rem;
  font-weight: 700;
  box-shadow:
    0 10px 40px rgba(102, 126, 234, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  position: relative;
}

.avatar-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  animation: ringRotate 10s linear infinite;
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.author-info {
  flex: 1;
}

.author-info h2 {
  margin: 0 0 10px 0;
  font-size: 2.2rem;
  color: var(--text-primary);
  font-weight: 800;
}

.author-title {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 18px;
  font-size: 1rem;
}

.author-desc {
  color: var(--text-secondary);
  line-height: 1.9;
  margin-bottom: 22px;
  font-size: 0.95rem;
}

.author-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 26px;
}

.author-tag {
  font-weight: 500;
}

.author-stats {
  display: flex;
  gap: 35px;
  margin-bottom: 26px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%);
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 6px;
}
/* ==================== 个人优势 ==================== */
.advantage-card {
  border-radius: 20px;
  overflow: hidden;
}

.advantage-card::before {
  content: '';
  display: block;
  height: 4px;
  background: var(--gradient-success);
}

.advantage-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}

.advantage-item {
  display: flex;
  gap: 16px;
  padding: 18px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.6) 100%);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  animation: fadeInRight 0.5s ease forwards;
  opacity: 0;
}

.advantage-item:hover {
  border-color: rgba(103, 194, 58, 0.3);
  box-shadow: 0 4px 15px rgba(103, 194, 58, 0.1);
  transform: translateX(4px);
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.advantage-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gradient-success);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.advantage-content p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.95rem;
}

/* ==================== 项目经历 ==================== */
.project-card {
  border-radius: 20px;
  overflow: hidden;
}

.project-card::before {
  content: '';
  display: block;
  height: 4px;
  background: var(--gradient-primary);
}

.project-timeline {
  position: relative;
  padding: 20px 0;
}

.project-timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary-color) 0%, transparent 100%);
}

.project-item {
  position: relative;
  padding-left: 80px;
  margin-bottom: 30px;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.project-item:last-child {
  margin-bottom: 0;
}

.project-time {
  position: absolute;
  left: 35px;
  top: -20px;
  text-align: right;
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.project-dot {
  position: absolute;
  left: 24px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--gradient-accent);
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.2);
}

.project-content {
  padding: 20px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.6) 100%);
  border-radius: 14px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.project-content:hover {
  border-color: rgba(64, 158, 255, 0.3);
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.1);
  transform: translateY(-2px);
}

.project-content h4 {
  margin: 0 0 8px 0;
  color: var(--text-primary);
  font-size: 1.15rem;
  font-weight: 700;
}

.project-company {
  margin: 0 0 12px 0;
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
}

.project-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.project-tech-tag {
  font-weight: 500;
}

.project-achievements {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-achievements li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 6px 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.7;
}

.achievement-icon {
  color: var(--success-color);
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ==================== 专业技能 ==================== */
.skills-card {
  border-radius: 20px;
  overflow: hidden;
}

.skills-card::before {
  content: '';
  display: block;
  height: 4px;
  background: var(--gradient-accent);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 8px 0;
}

.skill-category {
  padding: 22px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.6) 100%);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

.skill-category:hover {
  border-color: rgba(64, 158, 255, 0.3);
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.1);
  transform: translateY(-3px);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.skill-icon {
  font-size: 1.8rem;
}

.skill-header h4 {
  flex: 1;
  margin: 0;
  color: var(--text-primary);
  font-size: 1.05rem;
  font-weight: 600;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-item {
  padding: 6px 14px;
  background: var(--bg-primary);
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.skill-item:hover {
  background: rgba(64, 158, 255, 0.1);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* ==================== 教育背景 ==================== */
.education-card {
  border-radius: 20px;
  overflow: hidden;
}

.education-card::before {
  content: '';
  display: block;
  height: 4px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.education-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.6) 100%);
  border-radius: 14px;
  border: 1px solid var(--border-color);
}

.education-school {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.school-icon {
  font-size: 2rem;
}

.school-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
}

.education-info {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.education-info span {
  padding: 6px 14px;
  background: var(--bg-primary);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.education-major {
  font-weight: 500;
}

.education-degree {
  background: rgba(64, 158, 255, 0.1) !important;
  color: var(--primary-color) !important;
  border-color: rgba(64, 158, 255, 0.3) !important;
}

.education-time {
  color: var(--text-muted);
}

/* ==================== 联系区域 ==================== */
.contact-section {
  margin-top: 40px;
}

.contact-card {
  border-radius: 20px;
  text-align: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
  border: none;
}

.gradient-card {
  background: var(--gradient-primary);
  color: white;
}

.contact-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.contact-card h3 {
  margin: 0 0 14px 0;
  font-size: 1.7rem;
  position: relative;
  z-index: 1;
}

.contact-card > p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 28px;
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.contact-methods {
  display: flex;
  justify-content: center;
  gap: 35px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.contact-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-icon {
  font-size: 1.2rem;
  color: white;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.contact-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2px;
}

.contact-value {
  font-weight: 600;
  color: white;
}

/* ==================== 底部 spacer ==================== */
.bottom-spacer {
  height: 120px;
}

/* ==================== 回到顶部按钮 ==================== */
.back-to-top {
  position: fixed;
  bottom: 35px;
  right: 35px;
  z-index: 1000;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  width: 50px;
  height: 50px;
  border: none;
  background: var(--gradient-accent);
  color: white;
  transition: all 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(64, 158, 255, 0.4);
}

/* ==================== 动画 ==================== */
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
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* ==================== 移动端适配 ==================== */
@media (max-width: 768px) {
  .main-content {
    padding: 16px 16px 40px;
  }

  .top-banner {
    padding: 12px 16px;
  }

  .banner-content {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .hero-card {
    padding: 40px 24px;
    border-radius: 20px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .title-subtitle {
    font-size: 0.5em;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .action-group {
    flex-direction: column;
  }

  .btn-primary, .btn-secondary, .btn-tertiary {
    width: 100%;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .metric-item {
    padding: 24px 16px;
  }

  .m-value {
    font-size: 1.8rem;
  }

  .faq-grid {
    grid-template-columns: 1fr;
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

  .step-connector {
    display: none;
  }

  .spec-grid {
    grid-template-columns: 1fr;
  }

  .author-content {
    flex-direction: column;
    text-align: center;
    padding: 35px 24px;
    gap: 30px;
  }

  .author-stats {
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;
  }

  .author-links {
    justify-content: center;
  }

  .book-cover {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .book-placeholder {
    width: 130px;
    height: 180px;
  }

  .book-meta {
    justify-content: center;
  }

  .book-actions {
    justify-content: center;
  }

  .contact-methods {
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }

  .contact-item {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .project-item {
    padding-left: 70px;
  }

  .project-time {
    width: 50px;
    font-size: 0.8rem;
  }

  .project-dot {
    left: 18px;
    width: 12px;
    height: 12px;
  }

  .project-timeline::before {
    left: 24px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .education-item {
    flex-direction: column;
    text-align: center;
  }

  .education-info {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .hero-badge-group {
    gap: 6px;
  }

  .hero-badge {
    font-size: 0.8rem;
    padding: 4px 10px;
  }

  .author-stats {
    gap: 15px;
    padding: 16px;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}

/* ==================== 打印样式 ==================== */
@media print {
  .top-banner,
  .back-to-top,
  .action-group,
  .hero-bg-decoration,
  .author-bg-decoration {
    display: none !important;
  }

  .home-container {
    background: white;
  }

  .glass-effect {
    background: white;
    box-shadow: none;
    border: 1px solid #ddd;
  }
}

/* ==================== 学习手册专区 ==================== */
.handbook-section {
  margin-top: 60px;
}

.handbook-card {
  border-radius: 24px;
  overflow: hidden;
  position: relative;
}

.handbook-card::before {
  content: '';
  display: block;
  height: 5px;
  background: linear-gradient(90deg, #409EFF 0%, #67C23A 50%, #E6A23C 100%);
}

.handbook-intro {
  text-align: center;
  padding: 20px 0 30px;
}

.intro-text {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto 25px;
}

.handbook-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  padding: 20px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  max-width: 600px;
  margin: 0 auto;
}

.handbook-stat-item {
  text-align: center;
}

.handbook-stat-item .stat-num {
  font-size: 2.2rem;
  font-weight: 800;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.handbook-stat-item .stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 6px;
}

.topic-grid {
  margin-top: 20px;
}

.topic-col {
  margin-bottom: 20px;
}

.topic-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.topic-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 25px rgba(64, 158, 255, 0.15);
}

.topic-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-accent);
  opacity: 0;
  transition: opacity 0.3s;
}

.topic-card:hover::before {
  opacity: 1;
}

.topic-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.topic-num {
  font-size: 20px;
  font-weight: 900;
  color: #f3f4f6;
  line-height: 1;
}

.topic-title {
  font-size: 17px;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.topic-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 15px;
  min-height: 36px;
  line-height: 1.6;
}

.topic-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.mini-topic-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  color: var(--primary-color);
  background: rgba(64, 158, 255, 0.1);
  padding: 3px 8px;
  border-radius: 6px;
}

.mini-topic-tag .el-icon {
  font-size: 10px;
}

.topic-progress {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-success);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--success-color);
  min-width: 35px;
}

.handbook-feature-item {
  text-align: center;
  padding: 25px 20px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.6) 0%, rgba(241, 245, 249, 0.6) 100%);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

.handbook-feature-item:hover {
  transform: translateY(-5px);
  border-color: rgba(64, 158, 255, 0.3);
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.1);
}

.feature-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.handbook-feature-item h4 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
  font-size: 1.05rem;
  font-weight: 600;
}

.handbook-feature-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.handbook-actions {
  text-align: center;
  padding: 30px 20px 10px;
  border-top: 1px dashed var(--border-color);
  margin-top: 20px;
}

.handbook-actions .el-button {
  margin: 0 10px;
  min-width: 200px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .handbook-stats {
    gap: 20px;
    padding: 15px;
  }

  .handbook-stat-item .stat-num {
    font-size: 1.8rem;
  }

  .topic-grid {
    margin-top: 15px;
  }

  .topic-col {
    margin-bottom: 15px;
  }

  .handbook-actions .el-button {
    width: 100%;
    margin: 10px 0;
  }

  .handbook-feature-item {
    margin-bottom: 15px;
  }
}
</style>
