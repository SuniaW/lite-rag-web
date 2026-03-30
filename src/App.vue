<template>
  <el-container class="layout-container">
    <!-- 侧边栏容器 -->
    <div class="sidebar-container">
      <!-- Logo 区域 -->
      <div class="logo-vertical">
        <el-icon color="#409efc" :size="24"><Cpu /></el-icon>
        <span class="logo-title" v-if="!isCollapse">AI 平台系统</span>
      </div>

      <!-- 折叠按钮 -->
      <el-button
        type="primary"
        circle
        @click="isCollapse = !isCollapse"
        class="collapse-btn"
      >
        <el-icon v-if="isCollapse"><DArrowRight /></el-icon>
        <el-icon v-else><DArrowLeft /></el-icon>
      </el-button>

      <!-- 菜单：已抽取模型动态渲染 -->
      <el-menu
        :default-active="route.path"
        router
        class="optimized-menu"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#222C33"
        text-color="#B3C0D1"
        active-text-color="#409eff"
      >
        <el-menu-item v-for="item in menuModel" :key="item.index" :index="item.index">
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title v-if="!isCollapse">{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </div>

    <el-container class="main-container">
      <el-header height="60px" class="global-header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="route.path !== '/'">AI 问答</el-breadcrumb-item>
        </el-breadcrumb>
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </el-header>

      <el-main class="content-body">
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, markRaw } from "vue";
import {
  Cpu,
  ChatDotRound,
  DArrowLeft,
  DArrowRight,
  HomeFilled,
  MagicStick, User
} from "@element-plus/icons-vue";

const route = useRoute()
const isCollapse = ref(true)

/**
 * 菜单模型抽取
 * title: 菜单名称
 * index: 路由路径
 * icon: 图标组件 (使用 markRaw 避免响应式开销)
 */
const menuModel = [
  {
    title: '产品介绍',
    index: '/',
    icon: markRaw(HomeFilled)
  },
  {
    title: 'RAG 知识库问答',
    index: '/chat/rag',
    icon: markRaw(ChatDotRound)
  },
  {
    title: 'AI 天气智能助手',
    index: '/chat/weather',
    icon: markRaw(MagicStick)
  },
  {
    title: '关于作者',
    index: '/chat/about',
    icon: markRaw(User)
  }
]
</script>

<style>
/* 全局样式强制去除外层滚动 */
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

<style scoped>
/* 保持原有所有样式不变 */
.layout-container {
  height: 100vh;
  width: 100vw;
}

.logo-vertical {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid #f0f2f5;
}
.global-header {
  background: #fff;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}
.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content-body {
  padding: 0;
  background-color: #f5f7fa;
  flex: 1;
  position: relative;
  overflow: hidden;
}
.sidebar-container {
  height: 100vh;
  background-color: #f0f2f5;
  color: #303133;
  border-right: 1px solid #dcdfe6;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.logo-vertical {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
  font-weight: bold;
  font-size: 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #dcdfe6;
}

.logo-title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  letter-spacing: 1px;
}

.collapse-btn {
  margin: 10px auto;
  width: 36px;
  height: 36px;
  background-color: #ffffff;
  border-color: #dcdfe6;
  color: #606266;
  transition: all 0.3s;
}

.collapse-btn:hover {
  background-color: #e6e6e6 !important;
  color: #303133;
}

.optimized-menu {
  border-right: none;
  flex: 1;
  overflow-y: auto;
  background-color: #f0f2f5 !important;
}

.optimized-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #303133;
  transition: background-color 0.3s;
}

.optimized-menu .el-menu-item i {
  font-size: 18px;
  margin-right: 12px;
  color: #606266;
}

.optimized-menu .el-menu-item:hover {
  background-color: #e6e6e6 !important;
}

.optimized-menu .el-menu-item.is-active {
  background-color: #d9e4f1 !important;
  border-left: 4px solid #409eff;
  padding-left: 16px !important;
  color: #1989fa !important;
}

.optimized-menu .el-menu-item.is-active i {
  color: #1989fa !important;
}
</style>
