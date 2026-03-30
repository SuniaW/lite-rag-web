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
            <el-icon size="18"><Cpu /></el-icon>
          </div>
          <div class="title-wrapper">
            <h2 class="title-text">
              <span class="gradient-title">技术站</span>
              <span class="title-separator">·</span>
              <span>智库问答</span>
            </h2>
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
              <el-button link class="file-count-trigger glass-btn" size="small">
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
                      size="small"
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
          <!-- ✨ 新增：内置集成式示例问题 (仅在无消息时显示) -->
          <transition name="fade-slide-up">
            <div v-if="messages.length === 0" class="mini-prompt-container">
              <div class="prompt-header">
                <el-icon class="sparkle-icon"><MagicStick/></el-icon>
                <span>你可以试着问我：</span>
              </div>
              <div class="prompt-scroller">
                <div
                  v-for="(item, index) in exampleQuestions"
                  :key="index"
                  class="prompt-chip"
                  @click="handleExampleClick(item.query)"
                >
                  <span class="chip-icon">{{ item.icon }}</span>
                  <span class="chip-text">{{ item.query }}</span>
                </div>
              </div>
            </div>
          </transition>

          <!-- 输入框主体 -->
          <el-input
            v-model="queryInput"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 6 }"
            placeholder="在此输入您的疑问..."
            @keydown.enter.prevent="sendQuery"
          />

          <!-- 底部状态条 -->
          <div class="input-bottom-bar">
            <div class="bar-left">
              <div class="mode-tag">
                <el-icon><Lightning /></el-icon>
                <span>RAG 增强模式</span>
              </div>
            </div>
            <div class="bar-right">
              <el-button v-if="isLoading" type="danger" circle size="small" :icon="CircleClose" @click="stopGeneration" />
              <el-button v-else type="primary" circle :disabled="!queryInput.trim()" @click="sendQuery">
                <el-icon><Promotion /></el-icon>
              </el-button>
            </div>
          </div>
        </div>

        <div class="input-footer-tip">
          <el-icon><Warning /></el-icon>
          <span>内容由 AI 生成 · 基于 2C4G 极限调优版</span>
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
  Lightning, CopyDocument, Star, CloseBold, Warning, ArrowUp, Cpu, Promotion, MagicStick
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

<style src="../assets/styles/ragChatBox.css" scoped></style>
