<template>
  <div class="nav-page-wrapper">
    <!-- 背景装饰气泡 -->
    <div class="bg-decorations">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>

    <div class="content-container">
      <div class="page-header">
        <h1 class="main-title">欢迎使用 <span class="gradient-text">AI 智能矩阵</span></h1>
        <p class="sub-title">基于大模型与 RAG 技术的高效协同工作站</p>
      </div>

      <el-row :gutter="30" class="nav-grid-container">
        <el-col
          v-for="item in navCards"
          :key="item.title"
          :xs="24" :sm="12" :md="8"
        >
          <div class="card-wrapper" @click="handleGoto(item.path)">
            <div :class="['custom-glass-card', item.typeClass]">
              <!-- 装饰性标签 -->
              <div class="card-tag" v-if="item.tag">{{ item.tag }}</div>

              <div class="card-main-content">
                <div class="icon-section">
                  <div class="icon-glow"></div>
                  <div class="icon-box">
                    <el-icon :size="38">
                      <component :is="item.icon"/>
                    </el-icon>
                  </div>
                </div>

                <div class="text-section">
                  <h3 class="card-title">{{ item.title }}</h3>
                  <p class="card-desc">{{ item.desc }}</p>
                </div>
              </div>

              <div class="card-footer">
                <div class="action-btn">
                  <span>{{ item.actionText }}</span>
                  <el-icon class="arrow-icon"><Right /></el-icon>
                </div>
              </div>

              <!-- 特殊图片处理 (针对作者卡片) -->
              <div v-if="item.image" class="floating-img-wrapper">
                <img :src="item.image" alt="decoration" class="floating-img" />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue';
import { ChatDotRound, Sunny, UserFilled, Right } from '@element-plus/icons-vue';
import { useRouter } from "vue-router";

const router = useRouter();

const navCards = [
  {
    title: 'RAG 智能问答',
    desc: '集成多维向量数据库，实现企业级精准知识检索与深度问答。',
    actionText: '立即开启对话',
    tag: '核心功能',
    path: '/chat/rag',
    icon: markRaw(ChatDotRound),
    typeClass: 'card-rag'
  },
  {
    title: 'AI 天气助手',
    desc: '不仅仅是天气，更是你的智能出行管家，提供衣食住行全方位建议。',
    actionText: '查看气象分析',
    tag: '工具助手',
    path: '/chat/weather',
    icon: markRaw(Sunny),
    typeClass: 'card-weather'
  },
  {
    title: '关于作者',
    desc: '12 年全栈开发沉淀，专注于大模型应用探索与高并发架构设计。',
    actionText: '了解更多细节',
    tag: 'Developer',
    path: '/chat/about',
    icon: markRaw(UserFilled),
    typeClass: 'card-author',
    image: 'https://img.icons8.com/bubbles/200/cat.png' // 示例猫咪图片
  }
];

const handleGoto = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
/* ==================== 基础容器 ==================== */
.nav-page-wrapper {
  position: relative;
  min-height: calc(100vh - 120px);
  padding: 25px 20px;
  background: #f8fafc;
  overflow: hidden;
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* ==================== 背景装饰 ==================== */
.bg-decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: floatOrb 10s infinite alternate;
}

.orb-1 { width: 400px; height: 400px; background: rgba(102, 126, 234, 0.15); top: -100px; left: -100px; }
.orb-2 { width: 300px; height: 300px; background: rgba(253, 160, 133, 0.15); bottom: 10%; right: -50px; animation-delay: -2s; }
.orb-3 { width: 250px; height: 250px; background: rgba(41, 182, 246, 0.15); top: 40%; left: 50%; animation-delay: -5s; }

@keyframes floatOrb {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(30px, 50px) scale(1.1); }
}

/* ==================== 头部排版 ==================== */
.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.main-title {
  font-size: 36px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 12px;
}

.gradient-text {
  background: linear-gradient(135deg, #409EFF 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sub-title {
  font-size: 16px;
  color: #64748b;
  letter-spacing: 1px;
}

/* ==================== 玻璃卡片 ==================== */
.card-wrapper {
  margin-bottom: 30px;
  cursor: pointer;
  perspective: 1000px;
}

.custom-glass-card {
  position: relative;
  height: 320px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-wrapper:hover .custom-glass-card {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

/* 图标区域 */
.icon-section {
  position: relative;
  width: 70px;
  height: 70px;
  margin-bottom: 24px;
}

.icon-box {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.icon-glow {
  position: absolute;
  top: 10%; left: 10%; width: 80%; height: 80%;
  border-radius: 20px;
  filter: blur(15px);
  opacity: 0.6;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.card-wrapper:hover .icon-box { transform: scale(1.1) rotate(-5deg); }

/* 文字区域 */
.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
}

.card-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 标签 */
.card-tag {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 底部操作 */
.card-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.card-wrapper:hover .arrow-icon {
  transform: translateX(5px);
}

/* ==================== 各主题色配置 ==================== */
/* RAG 主题 */
.card-rag .icon-box { background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); }
.card-rag .icon-glow { background: #6366f1; }
.card-rag:hover .action-btn { color: #6366f1; }

/* Weather 主题 */
.card-weather .icon-box { background: linear-gradient(135deg, #0ea5e9 0%, #22d3ee 100%); }
.card-weather .icon-glow { background: #0ea5e9; }
.card-weather:hover .action-btn { color: #0ea5e9; }

/* Author 主题 */
.card-author .icon-box { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); }
.card-author .icon-glow { background: #f59e0b; }
.card-author:hover .action-btn { color: #f59e0b; }

/* 特殊猫咪图片动效 */
.floating-img-wrapper {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 120px;
  opacity: 0.8;
  pointer-events: none;
  transition: all 0.5s ease;
}

.floating-img {
  width: 100%;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));
  animation: bounceImg 4s infinite ease-in-out;
}

.card-wrapper:hover .floating-img-wrapper {
  transform: scale(1.1) translate(-5px, -5px);
  opacity: 1;
}

@keyframes bounceImg {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

/* ==================== 响应式适配 ==================== */
@media (max-width: 768px) {
  .page-header { margin-bottom: 30px; }
  .main-title { font-size: 26px; }
  .custom-glass-card { height: auto; padding: 24px; }
  .floating-img-wrapper { width: 80px; }
  .card-tag { display: none; }
}
</style>
