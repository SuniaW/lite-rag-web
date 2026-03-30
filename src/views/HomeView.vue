<template>
  <div>
    <el-row :gutter="24" class="nav-grid-container">
      <!-- 使用 v-for 循环渲染卡片 -->
      <el-col
        v-for="item in navCards"
        :key="item.title"
        :xs="24" :sm="12" :md="8"
      >
        <div class="card-wrapper" @click="handleGoto(item.path)">
          <el-card :class="['custom-card', item.typeClass]" shadow="hover">
            <div class="card-icon">
              <!-- 动态渲染组件图标 -->
              <el-icon :size="36">
                <component :is="item.icon"/>
              </el-icon>
            </div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
            <div class="card-arrow">
              <span>{{ item.actionText }}</span>
              <el-icon>
                <ArrowRight/>
              </el-icon>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {markRaw} from 'vue';
import {ChatDotRound, Sunny, UserFilled, ArrowRight} from '@element-plus/icons-vue';
import {useRouter} from "vue-router";

const router = useRouter();

// 1. 定义数据模型
const navCards = [
  {
    title: 'RAG 智能问答',
    desc: '企业级私有知识库',
    actionText: '立即体验',
    path: '/chat/rag',
    icon: markRaw(ChatDotRound),
    typeClass: 'card-rag'
  },
  {
    title: 'AI 天气助手',
    desc: '实时气象与出行建议',
    actionText: '查看详情',
    path: '/chat/weather', // 如果有不同路径可在此修改
    icon: markRaw(Sunny),
    typeClass: 'card-weather'
  },
  {
    title: '关于作者',
    desc: '12 年经验全栈开发者',
    actionText: '了解更多',
    path: '/chat/about',
    icon: markRaw(UserFilled),
    typeClass: 'card-author'
  }
];

// 2. 统一跳转方法
const handleGoto = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
/* 容器 */
.nav-grid-container {
  margin-bottom: 20px;
  padding: 10px 0;
}

.card-wrapper {
  cursor: pointer;
  height: 100%;
  margin-bottom: 24px; /* 适配移动端堆叠间距 */
}

/* 卡片基础样式 */
.custom-card {
  height: 100%;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.card-wrapper:hover .custom-card {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

/* 图标区域 */
.card-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.card-wrapper:hover .card-icon {
  transform: scale(1.1);
}

.card-title {
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #303133;
}

.card-desc {
  font-size: 13px;
  color: #909399;
  margin: 0 0 16px 0;
}

.card-arrow {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.card-wrapper:hover .card-arrow {
  opacity: 1;
}

.card-wrapper:hover .card-arrow .el-icon {
  transform: translateX(4px);
}

/* --- 主题色逻辑保持不变 --- */
.card-rag .card-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.card-rag:hover {
  border-color: #764ba2;
}

.card-rag:hover .card-arrow {
  color: #764ba2;
}

.card-weather .card-icon {
  background: linear-gradient(135deg, #29b6f6 0%, #0288d1 100%);
  color: #fff;
}

.card-weather:hover {
  border-color: #0288d1;
}

.card-weather:hover .card-arrow {
  color: #0288d1;
}

.card-author .card-icon {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  color: #fff;
}

.card-author:hover {
  border-color: #fda085;
}

.card-author:hover .card-arrow {
  color: #fda085;
}

/* 响应式 */
@media (max-width: 768px) {
  .custom-card {
    padding: 20px 15px;
    flex-direction: row;
    text-align: left;
    gap: 15px;
  }

  .card-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .card-arrow {
    display: none;
  }

  .card-title {
    font-size: 15px;
    margin-bottom: 4px;
  }

  .card-desc {
    font-size: 12px;
    margin-bottom: 0;
  }
}
</style>
