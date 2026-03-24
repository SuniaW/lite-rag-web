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
            基于 <strong class="highlight-primary">Spring AI</strong> 与 <strong
            class="highlight-secondary">Milvus 2.6</strong> 构建的工业级私有化知识库。<br>
            经过深度性能调优，实现 <strong class="highlight-accent">低功耗环境下的秒级生成</strong>。
          </p>

          <div class="action-group">
            <el-button type="primary" size="large" @click="goToChat" round
                       class="btn-primary glow-btn">
              <el-icon>
                <ChatDotRound/>
              </el-icon>
              进入知识库问答
            </el-button>
            <el-button size="large" round @click="handleToggleDetails" class="btn-secondary">
              <el-icon>
                <component :is="showDetails ? 'Fold' : 'Expand'"/>
              </el-icon>
              {{ showDetails ? '隐藏技术规格' : '技术规格说明' }}
            </el-button>
            <el-button size="large" round @click="scrollToSection('author-section')"
                       class="btn-tertiary">
              <el-icon>
                <User/>
              </el-icon>
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
                  <el-table-column prop="category" label="类别" width="120" sortable/>
                  <el-table-column prop="name" label="名称" width="180"/>
                  <el-table-column prop="version" label="版本" width="120"/>
                  <el-table-column prop="purpose" label="用途"/>
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
                  <div class="tech-detail-item" v-for="(tech, index) in coreTechnologies"
                       :key="tech.name" :style="{ animationDelay: `${index * 0.1}s` }">
                    <div class="tech-detail-header">
                      <span class="tech-icon">{{ tech.icon }}</span>
                      <h4>{{ tech.name }}</h4>
                      <el-tag :type="tech.tagType" size="small" effect="dark">{{
                          tech.level
                        }}
                      </el-tag>
                    </div>
                    <p class="tech-detail-desc">{{ tech.description }}</p>
                    <div class="tech-detail-features">
                      <span v-for="feature in tech.features" :key="feature" class="feature-tag">
                        <el-icon><Check/></el-icon>
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
                      <el-icon class="header-icon">
                        <Tools/>
                      </el-icon>
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
                      <el-icon>
                        <CircleCheckFilled/>
                      </el-icon>
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
                  <div class="spec-item" v-for="(spec, index) in serverSpecs" :key="spec.name"
                       :style="{ animationDelay: `${index * 0.05}s` }">
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
                  <div class="spec-item" v-for="(spec, index) in serviceSpecs" :key="spec.name"
                       :style="{ animationDelay: `${index * 0.05}s` }">
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
                        <span class="row-indicator"
                              :style="{ animationDelay: `${index * 0.1}s` }"></span>
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
                      <span class="component-size" :style="{ color: item.color }">{{
                          item.memory
                        }}</span>
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
                  <div class="repo-item" v-for="(repo, index) in repositories" :key="repo.name"
                       :style="{ animationDelay: `${index * 0.08}s` }">
                    <div class="repo-icon">
                      <el-icon>
                        <FolderOpened/>
                      </el-icon>
                    </div>
                    <div class="repo-info">
                      <h4>{{ repo.name }}</h4>
                      <p>{{ repo.description }}</p>
                      <div class="repo-meta">
                        <span class="repo-lang">{{ repo.language }}</span>
                      </div>
                    </div>
                    <el-button type="primary" text @click="openLink(repo.url)" class="repo-btn">
                      <el-icon>
                        <Link/>
                      </el-icon>
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
                  <el-tag :type="getTopicLevelType(topic.level)" size="small">{{
                      topic.level
                    }}
                  </el-tag>
                </div>
                <h3 class="topic-title">{{ topic.title }}</h3>
                <p class="topic-desc">{{ topic.desc }}</p>
                <div class="topic-tags">
            <span v-for="tag in topic.tags" :key="tag" class="mini-topic-tag">
              <el-icon><Ticket/></el-icon> {{ tag }}
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
                  <el-icon :size="28" color="#fff">
                    <component :is="feature.icon"/>
                  </el-icon>
                </div>
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.desc }}</p>
              </div>
            </el-col>
          </el-row>

          <!-- 行动按钮 -->
          <div class="handbook-actions">
            <el-button type="primary" size="large" round @click="openGithubHandbook"
                       class="glow-btn">
              <el-icon>
                <FolderOpened/>
              </el-icon>
              GitHub 查看全部文档
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
                <el-tag v-for="tag in author.tags" :key="tag" size="small" effect="plain"
                        class="author-tag">
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
            <div class="advantage-item" v-for="(item, index) in advantages" :key="index"
                 :style="{ animationDelay: `${index * 0.1}s` }">
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
            <div class="project-item" v-for="(project, index) in projects" :key="project.name"
                 :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="project-time">{{ project.time }}</div>
              <div class="project-dot"></div>
              <div class="project-content">
                <h4>{{ project.name }}</h4>
                <p class="project-company">{{ project.company }}</p>
                <div class="project-tags">
                  <el-tag v-for="tech in project.technologies" :key="tech" size="small"
                          class="project-tech-tag">
                    {{ tech }}
                  </el-tag>
                </div>
                <ul class="project-achievements">
                  <li v-for="achievement in project.achievements" :key="achievement">
                    <el-icon class="achievement-icon">
                      <Check/>
                    </el-icon>
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
            <div class="skill-category" v-for="(category, index) in skills" :key="category.name"
                 :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="skill-header">
                <span class="skill-icon">{{ category.icon }}</span>
                <h4>{{ category.name }}</h4>
                <el-tag
                  :type="category.level === '精通' ? 'danger' : category.level === '熟练' ? 'warning' : 'info'"
                  size="small">
                  {{ category.level }}
                </el-tag>
              </div>
              <div class="skill-items">
                <span class="skill-item" v-for="item in category.items" :key="item">{{
                    item
                  }}</span>
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
                <el-icon class="contact-icon">
                  <component :is="contact.icon"/>
                </el-icon>
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
        <el-icon>
          <ArrowUp/>
        </el-icon>
      </el-button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, onUnmounted} from 'vue'
import {
  ChatDotRound, Check, ArrowUp, User, Monitor, FolderOpened, Link, Ticket, Reading
} from '@element-plus/icons-vue'
import {Tools, CircleCheckFilled} from '@element-plus/icons-vue'
import {
  advantages,
  allTechs, author, badges, contacts, coreMetrics, coreTechnologies,
  getTechType, getTopicLevelType, handbookFeatures,
  handbookTopics, handleTopicClick, memoryAllocation,
  openGithubHandbook, optimizationTips, performanceData, projects,
  repositories,
  router, serverSpecs, serviceSpecs,
  showBackToTop,
  showDetails, skills, softwareSpecs
} from "@/assets/ts/constants.ts";



// 方法
const handleToggleDetails = () => {
  showDetails.value = !showDetails.value
  if (showDetails.value) {
    nextTick(() => {
      const el = document.getElementById('tech-section')
      if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'start'})
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
    el.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
}


const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'})
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

<style src="../assets/styles/home.css" scoped></style>
