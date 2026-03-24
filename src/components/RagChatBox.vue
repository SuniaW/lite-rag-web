<template>
  <div class="page-container">
    <!-- 1. 顶部 Header - 精致玻璃态设计 -->
    <div class="chat-header glass-effect">
      <div class="header-bg-decoration">
        <div class="header-orb orb-1"></div>
        <div class="header-orb orb-2"></div>
      </div>

      <div class="header-left">
        <div class="logo-wrapper">
          <div class="logo-box glow-effect">
            <el-icon size="20"><Cpu /></el-icon>
          </div>
          <div class="title-wrapper">
            <h2 class="title-text">
              <span class="gradient-title">技术站</span>
              <span class="title-separator">·</span>
              <span>智库问答</span>
            </h2>
            <div class="status-badge">
              <span class="dot"></span>
              <span>RAG Engine V2.0</span>
              <el-tag size="small" type="success" effect="dark" class="version-tag">在线</el-tag>
            </div>
          </div>
        </div>
      </div>

      <div class="upload-actions">
        <div class="action-buttons">
          <el-popover
            v-if="uiFileList.length > 0"
            placement="bottom-end"
            :width="360"
            trigger="hover"
            popper-class="custom-file-popover"
            :show-arrow="false"
          >
            <template #reference>
              <el-button link class="file-count-trigger glass-btn">
                <div class="count-badge-wrapper">
                  <div class="icon-wrapper">
                    <el-icon><Files /></el-icon>
                  </div>
                  <span>待处理文档</span>
                  <span class="count-tag">{{ uiFileList.length }}</span>
                </div>
              </el-button>
            </template>

            <div class="popover-file-container">
              <div class="popover-header">
                <div class="header-info">
                  <el-icon class="header-icon"><FolderOpened /></el-icon>
                  <div>
                    <span class="title">已选文件清单</span>
                    <span class="sub-title">准备上传至知识库</span>
                  </div>
                </div>
                <el-tag size="small" :type="uiFileList.length > 0 ? 'primary' : 'info'">
                  {{ uiFileList.length }} 个文件
                </el-tag>
              </div>

              <div class="popover-list-wrapper">
                <div v-for="file in uiFileList" :key="file.uid" class="popover-item">
                  <div class="file-info">
                    <div class="file-icon-box" :style="{ background: getFileIconColor(file.name) }">
                      <el-icon><Document /></el-icon>
                    </div>
                    <div class="file-details">
                      <span class="file-name" :title="file.name">{{ file.name }}</span>
                      <span class="file-size">{{ formatFileSize(file.size ?? 0) }}</span>
                    </div>
                  </div>
                  <div class="item-actions">
                    <el-button
                      link
                      type="danger"
                      class="remove-btn"
                      @click="handleFileRemove(file as any)"
                    >
                      <el-icon><CircleClose /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>

              <div class="popover-footer" v-if="uiFileList.length > 0">
                <el-button type="primary" size="small" @click="uploadFiles" :loading="isUploading">
                  立即上传
                </el-button>
              </div>
            </div>
          </el-popover>

          <el-upload
            action="#"
            multiple
            :auto-upload="false"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
            :file-list="uiFileList"
            :show-file-list="false"
          >
            <template #trigger>
              <el-button class="secondary-btn glass-btn" round :icon="Link">选择文档</el-button>
            </template>
          </el-upload>

          <el-button
            type="primary"
            class="primary-btn glow-btn"
            round
            :disabled="selectedFiles.length === 0"
            :loading="isUploading"
            @click="uploadFiles"
          >
            <el-icon><UploadFilled /></el-icon>
            <span>上传入库</span>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 批量上传进度条 - 渐变细条设计 -->
    <transition name="slide-down">
      <div v-if="isUploading" class="global-progress">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: uploadPercent + '%' }">
            <span class="progress-text">{{ uploadPercent }}%</span>
          </div>
        </div>
      </div>
    </transition>

    <!-- 2. 中间：消息显示区 -->
    <div class="message-container" ref="chatContainer">
      <div class="message-list-inner">
        <!-- 欢迎页 - 深度美化 -->
        <div v-if="messages.length === 0 && !isLoading" class="welcome-section">
          <div class="welcome-hero">
            <div class="hero-icon-container">
              <div class="floating-icon-wrapper">
                <div class="floating-icon">👩‍💻</div>
                <div class="icon-ring"></div>
                <div class="icon-ring ring-2"></div>
              </div>
            </div>
            <h1 class="welcome-title">
              <span class="gradient-text">技术文档</span>
              <span>智能助手</span>
            </h1>
            <p class="welcome-desc">
              上传规格书或代码文档，基于 <strong>RAG 技术</strong> 为您提供精准的关联分析与智能问答。
            </p>

            <div class="welcome-features">
              <div class="feature-item" v-for="(feature, index) in welcomeFeatures" :key="index">
                <div class="feature-icon">{{ feature.icon }}</div>
                <span>{{ feature.text }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 消息列表 -->
        <div v-for="(msg, index) in messages" :key="index" :class="['msg-wrapper', msg.role]">
          <div class="avatar-container">
            <div class="avatar-wrapper" :class="msg.role">
              <el-avatar :size="40" :src="msg.role === 'assistant' ? botAvatar : userAvatar" />
              <div class="avatar-status" :class="msg.role"></div>
            </div>
          </div>
          <div class="msg-content-area">
            <div class="msg-meta" v-if="msg.role === 'assistant'">
              <span class="sender-name">
                <el-icon><Cpu /></el-icon>
                智库助手
              </span>
              <span v-if="msg.duration" class="stat-badge">
                <el-icon><Timer /></el-icon>
                {{ msg.duration.toFixed(1) }}s
              </span>
            </div>
            <div
              :class="[
                'msg-bubble',
                msg.role === 'assistant' ? 'assistant-bubble markdown-body' : 'user-bubble',
              ]"
            >
              <div v-if="msg.role === 'assistant'" v-html="renderMarkdown(msg.content)"></div>
              <div v-else class="user-text">{{ msg.content }}</div>
            </div>
            <div class="msg-actions" v-if="msg.role === 'assistant'">
              <el-button link size="small" @click="copyMessage(msg.content)">
                <el-icon><CopyDocument /></el-icon>
                复制
              </el-button>
              <el-button link size="small" @click="handleFeedback(msg.content, 'good')">
                <el-icon><Star /></el-icon>
              </el-button>
              <el-button link size="small" @click="handleFeedback(msg.content, 'bad')">
                <el-icon><CloseBold /></el-icon>
              </el-button>
            </div>
          </div>
        </div>

        <!-- 思考中状态 -->
        <transition name="fade">
          <div v-if="isLoading && isWaiting" class="msg-wrapper assistant">
            <div class="avatar-container">
              <div class="avatar-wrapper assistant">
                <el-avatar :size="40" :src="botAvatar" />
                <div class="avatar-status assistant thinking"></div>
              </div>
            </div>
            <div class="msg-content-area">
              <div class="thinking-card">
                <div class="thinking-loader">
                  <div class="loader-dot dot-1"></div>
                  <div class="loader-dot dot-2"></div>
                  <div class="loader-dot dot-3"></div>
                </div>
                <span class="thinking-text">
                  AI 正在思考
                  <span class="thinking-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                  <span class="thinking-time">({{ currentThinkingTime.toFixed(1) }}s)</span>
                </span>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 3. 底部：输入区 - 悬浮式设计 -->
    <div class="footer-area">
      <div class="input-container-wrapper">
        <div class="input-card-refined glass-effect">
            <el-tag
              v-for="(item, index) in exampleQuestions"
              :key="index"
              @click="handleExampleClick(item.query)"
              :style="{ animationDelay: `${index * 0.1}s` }"
              type="primary" style="float: left;margin-right: 10px">
              {{ item.query }}
            </el-tag>
          <el-input
            v-model="queryInput"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 6 }"
            placeholder="在此输入您的疑问，按 Enter 发送..."
            @keydown.enter.prevent="sendQuery"
          />
          <div class="input-bottom-bar">
            <div class="bar-left">
              <div class="mode-tag">
                <div class="mode-icon">
                  <el-icon><Files /></el-icon>
                </div>
                <span>多文档分析模式</span>
              </div>
              <div class="file-indicator" v-if="uiFileList.length > 0">
                <span class="indicator-dot"></span>
                {{ uiFileList.length }} 个文档已就绪
              </div>
            </div>
            <div class="bar-right">
              <el-button
                size="small"
                v-if="isLoading"
                type="danger"
                :icon="CircleClose"
                @click="stopGeneration"
              >
                停止
              </el-button>
              <el-button
                size="small"
                v-else
                type="primary"
                :disabled="!queryInput.trim()"
                @click="sendQuery"
              >
                发送
                <el-icon><Promotion /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
        <div class="input-footer-tip">
          <el-icon><Warning /></el-icon>
          <span>内容由 AI 生成，请核实重要信息</span>
        </div>
      </div>
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
import {
  Link, Timer, Files, CircleClose, Document, FolderOpened, UploadFilled,
  Lightning, ArrowRight, CopyDocument, Star, CloseBold, Warning, ArrowUp, Cpu, Promotion
} from '@element-plus/icons-vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'github-markdown-css/github-markdown-light.css'
import 'highlight.js/styles/github-dark.css'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadUserFile } from 'element-plus'

// --- Markdown 配置 ---
const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return str
  },
})

const preprocessMarkdown = (text: string) => {
  if (!text) return ''
  return text.replace(/([^\n])(#+\s)/g, '$1\n\n$2').replace(/([^\n])(\d\.\s)/g, '$1\n$2')
}
const renderMarkdown = (content: string) => (content ? md.render(preprocessMarkdown(content)) : '')

// --- 状态管理 ---
const userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
const botAvatar = 'https://api.dicebear.com/7.x/bottts/svg?seed=Aneka'

interface Message {
  role: 'user' | 'assistant'
  content: string
  duration?: number
}
const messages = ref<Message[]>([])
const queryInput = ref('')
const selectedFiles = ref<File[]>([])
const uiFileList = ref<UploadUserFile[]>([])
const isUploading = ref(false)
const uploadPercent = ref(0)
const isLoading = ref(false)
const isWaiting = ref(false)
const currentThinkingTime = ref(0)
const chatContainer = ref<HTMLElement | null>(null)
const showBackToTop = ref(false)
let thinkingTimer: number | null = null
let abortController = new AbortController()

// 欢迎特性
const welcomeFeatures = [
  { icon: '📚', text: '知识库检索' },
  { icon: '⚡', text: '秒级响应' },
  { icon: '🔒', text: '私有部署' },
  { icon: '📊', text: '精准分析' }
]

// 示例问题
const exampleQuestions = [
  { icon: '📝', query: 'RAG 系统的四大核心组件及角色分别是什么', color: '#3b82f6' },
  { icon: '🛡️', query: '在 4GB 内存的低配环境下，各组件建议的内存分配红线是多少', color: '#10b981' },
  { icon: '🚀', query: '为什么 RAG 系统推荐使用 SSE 协议而不是 WebSocket', color: '#f59e0b' },
  { icon: '🔍', query: '文档切片（Chunking）平衡性能与精度的最佳实践配置是什么', color: '#8b5cf6' },
]

// 文件类型颜色映射
const getFileIconColor = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase()
  const colorMap: Record<string, string> = {
    pdf: '#ef4444',
    doc: '#3b82f6',
    docx: '#3b82f6',
    txt: '#6b7280',
    md: '#10b981',
    java: '#f59e0b',
    js: '#fbbf24',
    ts: '#3b82f6',
    py: '#10b981',
    json: '#8b5cf6',
    yaml: '#f59e0b',
    yml: '#f59e0b',
  }
  return colorMap[ext || ''] || '#6b7280'
}

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const handleFileChange = (file: UploadFile, fileList: UploadFile[]) => {
  selectedFiles.value = fileList.map((f) => f.raw as File)
  uiFileList.value = fileList as UploadUserFile[]
}

const handleFileRemove = (file: UploadFile, fileList?: UploadFile[]) => {
  if (fileList) {
    selectedFiles.value = fileList.map((f) => f.raw as File)
    uiFileList.value = fileList as UploadUserFile[]
  } else {
    const index = uiFileList.value.indexOf(file as UploadUserFile)
    if (index !== -1) {
      uiFileList.value.splice(index, 1)
      selectedFiles.value.splice(index, 1)
    }
  }
}

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) return
  isUploading.value = true
  uploadPercent.value = 0
  const formData = new FormData()
  selectedFiles.value.forEach((file) => {
    formData.append('files', file)
  })
  try {
    await axios.post('/api/upload', formData, {
      onUploadProgress: (p) => {
        uploadPercent.value = Math.round((p.loaded * 100) / (p.total || 100))
      },
    })
    ElMessage.success('上传成功')
    selectedFiles.value = []
    uiFileList.value = []
  } catch (e) {
    ElMessage.error(`上传失败:${e}`)
  } finally {
    setTimeout(() => {
      isUploading.value = false
    }, 800)
  }
}

function generateUUID() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const sendQuery = async () => {
  if (!queryInput.value.trim() || isLoading.value) return
  const userText = queryInput.value
  messages.value.push({ role: 'user', content: userText })
  queryInput.value = ''
  isLoading.value = true
  isWaiting.value = true
  startThinkingTimer()

  const lastIdx = messages.value.push({ role: 'assistant', content: '' }) - 1
  let buffer = ""

  try {
    const chatId = window.localStorage.getItem('rag_chat_id') || generateUUID()
    window.localStorage.setItem('rag_chat_id', chatId)

    const response = await fetch(
      `/api/chat?query=${encodeURIComponent(userText)}&chatId=${chatId}`,
      { signal: abortController.signal },
    )

    if (!response.body) return
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      if (isWaiting.value) {
        stopThinkingTimer()
        messages.value[lastIdx]!.duration = currentThinkingTime.value
        isWaiting.value = false
      }

      buffer += decoder.decode(value, { stream: true })
      let lines = buffer.split('\n')
      buffer = lines.pop() || ""

      for (const line of lines) {
        const trimmedLine = line.trim()
        if (trimmedLine.startsWith('data:')) {
          const content = trimmedLine.substring(5)
          messages.value[lastIdx]!.content += content
          scrollToBottom()
        }
      }
    }

    if (buffer.trim().startsWith('data:')) {
      messages.value[lastIdx]!.content += buffer.trim().substring(5)
    }

  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
    isWaiting.value = false
    stopThinkingTimer()
  }
}

const handleExampleClick = (query: string) => {
  queryInput.value = query
  sendQuery()
}

const startThinkingTimer = () => {
  currentThinkingTime.value = 0
  thinkingTimer = window.setInterval(() => {
    currentThinkingTime.value += 0.1
  }, 100)
}

const stopThinkingTimer = () => {
  if (thinkingTimer) clearInterval(thinkingTimer)
}

const stopGeneration = () => {
  abortController.abort()
  abortController = new AbortController()
  isLoading.value = false
  isWaiting.value = false
  stopThinkingTimer()
  ElMessage.info('生成已停止')
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  })
}

const scrollToTop = () => {
  chatContainer.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

const copyMessage = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    ElMessage.success('已复制到剪贴板')
  } catch (err) {
    ElMessage.error('复制失败')
  }
}

const handleFeedback = (content: string, type: 'good' | 'bad') => {
  ElMessage.success(type === 'good' ? '感谢您的好评！' : '已记录反馈，我们会改进')
}

const handleScroll = () => {
  if (chatContainer.value) {
    showBackToTop.value = chatContainer.value.scrollTop > 300
  }
}

onMounted(() => {
  chatContainer.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  stopThinkingTimer()
  chatContainer.value?.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ==================== CSS 变量定义 ==================== */
.page-container{
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
.page-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  background: linear-gradient(180deg, #f8fafc 0%, #eef2f6 50%, #f1f5f9 100%);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow: auto;
}

.page-container::before {
  content: '';
  position: absolute;
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

/* ==================== 顶部 Header ==================== */
.chat-header {
  flex-shrink: 0;
  height: 72px;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  z-index: 10;
  position: relative;
  overflow: hidden;
}

.header-bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.header-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.4;
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: rgba(64, 158, 255, 0.2);
  top: -50%;
  left: 10%;
}

.orb-2 {
  width: 150px;
  height: 150px;
  background: rgba(102, 126, 234, 0.2);
  bottom: -30%;
  right: 15%;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-box {
  width: 40px;
  height: 40px;
  background: var(--gradient-accent);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
}

.glow-effect {
  position: relative;
}

.glow-effect::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-accent);
  border-radius: 14px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glow-effect:hover::after {
  opacity: 0.5;
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-text {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.gradient-title {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-separator {
  color: var(--text-muted);
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--success-color);
  background: rgba(103, 194, 58, 0.1);
  padding: 3px 10px;
  border-radius: 20px;
  width: fit-content;
}

.status-badge .dot {
  width: 7px;
  height: 7px;
  background: var(--success-color);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.version-tag {
  margin-left: 4px;
}

@keyframes pulse {
  0%, 100% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}

/* ==================== 上传动作区 ==================== */
.upload-actions {
  display: flex;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.glass-btn {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  transition: all 0.3s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 1) !important;
  border-color: var(--primary-color) !important;
  transform: translateY(-1px);
}

.file-count-trigger {
  color: var(--text-secondary) !important;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 12px !important;
}

.count-badge-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-wrapper {
  width: 28px;
  height: 28px;
  background: rgba(64, 158, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
}

.count-tag {
  background: var(--gradient-accent);
  color: white;
  font-size: 11px;
  padding: 0 7px;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.secondary-btn {
  color: var(--text-secondary) !important;
  font-weight: 500;
}

.primary-btn {
  background: var(--gradient-accent) !important;
  border: none !important;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 6px;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

/* ==================== 进度条 ==================== */
.global-progress {
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 32px;
}

.progress-track {
  height: 4px;
  background: rgba(226, 232, 240, 0.8);
  border-radius: 2px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.progress-fill {
  height: 100%;
  background: var(--gradient-accent);
  border-radius: 2px;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  position: relative;
}

.progress-text {
  font-size: 10px;
  color: white;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.progress-fill:hover .progress-text {
  opacity: 1;
}

/* ==================== 消息容器 ==================== */
.message-container {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.message-container::-webkit-scrollbar {
  width: 6px;
}

.message-container::-webkit-scrollbar-thumb {
  background: rgba(203, 213, 225, 0.8);
  border-radius: 3px;
}

.message-list-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ==================== 欢迎界面 ==================== */
.welcome-section {
  padding: 40px 20px;
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.welcome-hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero-icon-container {
  margin-bottom: 24px;
}

.floating-icon-wrapper {
  position: relative;
  display: inline-block;
}

.floating-icon {
  font-size: 56px;
  animation: float 3s ease-in-out infinite;
  position: relative;
  z-index: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.icon-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid rgba(64, 158, 255, 0.2);
  border-radius: 50%;
  animation: ringPulse 2s ease-in-out infinite;
}

.ring-2 {
  width: 120px;
  height: 120px;
  animation-delay: -1s;
}

@keyframes ringPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
}

.welcome-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.welcome-title .gradient-text {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-desc {
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 24px;
}

.welcome-desc strong {
  color: var(--primary-color);
  font-weight: 600;
}

.welcome-features {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  font-size: 13px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.feature-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}

.feature-icon {
  font-size: 18px;
}

/* ==================== 消息气泡 ==================== */
.msg-wrapper {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.msg-wrapper.user {
  flex-direction: row-reverse;
}

.avatar-container {
  flex-shrink: 0;
}

.avatar-wrapper {
  position: relative;
}

.avatar-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.avatar-status.user {
  background: var(--success-color);
}

.avatar-status.assistant {
  background: var(--primary-color);
}

.avatar-status.assistant.thinking {
  background: var(--warning-color);
  animation: pulse 1s infinite;
}

.msg-content-area {
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.msg-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sender-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-badge {
  font-size: 11px;
  color: var(--primary-color);
  background: rgba(64, 158, 255, 0.1);
  padding: 2px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.msg-bubble {
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.7;
  border-radius: 20px;
  position: relative;
}

.msg-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.msg-wrapper:hover .msg-actions {
  opacity: 1;
}

.msg-actions .el-button {
  color: var(--text-muted);
  font-size: 12px;
}

.msg-actions .el-button:hover {
  color: var(--primary-color);
}

/* ==================== 思考中状态 ==================== */
.thinking-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--border-color);
  padding: 14px 22px;
  border-radius: 20px;
  border-top-left-radius: 6px;
  display: flex;
  align-items: center;
  gap: 14px;
  width: fit-content;
  box-shadow: var(--shadow-sm);
}

.thinking-loader {
  display: flex;
  gap: 5px;
}

.loader-dot {
  width: 8px;
  height: 8px;
  background: var(--gradient-accent);
  border-radius: 50%;
  animation: dotBounce 1.4s infinite ease-in-out both;
}

.dot-1 { animation-delay: -0.32s; }
.dot-2 { animation-delay: -0.16s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

.thinking-text {
  font-size: 13px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.thinking-dots span {
  animation: blink 1.4s infinite;
  opacity: 0;
}

.thinking-dots span:nth-child(1) { animation-delay: 0s; }
.thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
.thinking-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.thinking-time {
  color: var(--text-muted);
  font-size: 12px;
}

/* ==================== 底部输入区 ==================== */
.footer-area {
  flex-shrink: 0;
  padding: 16px 0 24px;
  background: linear-gradient(transparent, rgba(249, 250, 251, 0.9) 40%);
  position: relative;
  z-index: 10;
}

.input-container-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.input-card-refined {
  border-radius: 24px;
  padding: 14px 18px;
  transition: all 0.3s;
  box-shadow: var(--shadow-lg);
}

.input-card-refined:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 8px 30px rgba(64, 158, 255, 0.15);
  transform: translateY(-2px);
}

:deep(.el-textarea__inner) {
  border: none !important;
  box-shadow: none !important;
  font-size: 15px;
  padding: 4px 0 !important;
  color: var(--text-primary);
  resize: none !important;
  background: transparent !important;
}

:deep(.el-textarea__inner)::placeholder {
  color: var(--text-muted);
}

.input-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  padding-top: 5px;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
}

.bar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mode-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.mode-icon {
  width: 24px;
  height: 24px;
  background: rgba(64, 158, 255, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
}

.file-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--success-color);
  font-weight: 500;
}

.indicator-dot {
  width: 6px;
  height: 6px;
  background: var(--success-color);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.bar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-footer-tip {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* ==================== Popover 美化 ==================== */
.popover-file-container {
  padding: 8px;
}

.popover-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  margin-bottom: 8px;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  width: 32px;
  height: 32px;
  background: var(--gradient-accent);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.popover-header .title {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.popover-header .sub-title {
  font-size: 11px;
  color: var(--text-muted);
}

.popover-list-wrapper {
  max-height: 280px;
  overflow-y: auto;
  padding: 4px;
}

.popover-list-wrapper::-webkit-scrollbar {
  width: 4px;
}

.popover-list-wrapper::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 2px;
}

.popover-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.popover-item:hover {
  background-color: rgba(248, 250, 252, 0.8);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.file-icon-box {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
  color: white;
}

.file-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.file-name {
  font-size: 13px;
  color: var(--text-primary);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 11px;
  color: var(--text-muted);
}

.remove-btn {
  opacity: 0;
  padding: 6px !important;
  transition: all 0.2s !important;
}

.popover-item:hover .remove-btn {
  opacity: 1;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.1) !important;
  color: var(--danger-color) !important;
  border-radius: 50%;
}

.popover-footer {
  padding: 12px;
  border-top: 1px solid var(--border-color);
  margin-top: 8px;
  text-align: right;
}

/* ==================== 回到顶部按钮 ==================== */
.back-to-top {
  position: fixed;
  bottom: 100px;
  right: 35px;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
  width: 46px;
  height: 46px;
  border: none;
  background: var(--gradient-accent);
  color: white;
  transition: all 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(64, 158, 255, 0.4);
}

/* ==================== Markdown 样式 ==================== */
:deep(.markdown-body) {
  font-size: 15px;
  color: var(--text-primary);
  line-height: 1.7;
}

:deep(.markdown-body pre) {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 12px;
  margin: 12px 0;
  overflow: hidden;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

:deep(.markdown-body code) {
  font-family: 'JetBrains Mono', 'Consolas', monospace;
}

:deep(.markdown-body p) {
  margin: 8px 0;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 24px;
  margin: 8px 0;
}

:deep(.markdown-body blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 16px;
  color: var(--text-secondary);
  background: rgba(64, 158, 255, 0.05);
  border-radius: 0 8px 8px 0;
  padding: 12px 16px;
  margin: 12px 0;
}

/* ==================== 移动端适配 ==================== */
@media (max-width: 768px) {
  .chat-header {
    padding: 0 16px;
    height: 64px;
  }

  .title-text {
    font-size: 15px;
  }

  .status-badge {
    display: none;
  }

  .action-buttons {
    gap: 6px;
  }

  .secondary-btn span,
  .primary-btn span {
    display: none;
  }

  .message-container {
    padding: 16px 0;
  }

  .message-list-inner {
    padding: 0 16px;
  }

  .welcome-title {
    font-size: 24px;
  }

  .welcome-desc {
    font-size: 14px;
  }

  .example-grid {
    grid-template-columns: 1fr;
  }

  .msg-content-area {
    max-width: 85%;
  }

  .msg-actions {
    opacity: 1;
  }

  .input-container-wrapper {
    padding: 0 16px;
  }

  .mode-tag span {
    display: none;
  }

  .file-indicator {
    display: none;
  }

  .send-btn span {
    display: none;
  }

  .back-to-top {
    bottom: 80px;
    right: 20px;
  }
}

/* ==================== 全局 Popover 覆盖 ==================== */
:global(.el-popover.custom-file-popover) {
  padding: 0 !important;
  border-radius: 16px !important;
  box-shadow: var(--shadow-xl) !important;
  border: 1px solid var(--border-color) !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) !important;
}
</style>
