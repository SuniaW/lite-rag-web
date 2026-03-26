<template>
  <el-container class="layout-container">
    <!-- 侧边栏容器 -->
    <!-- 侧边栏容器：深色背景 + 卡片阴影 -->
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
        <!-- 使用 el-icon 标签包裹箭头组件 -->
        <el-icon v-if="isCollapse"><DArrowRight /></el-icon>
        <el-icon v-else><DArrowLeft /></el-icon>
      </el-button>

      <!-- 菜单 -->
      <el-menu
        :default-active="$route.path"
        router
        class="optimized-menu"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#222C33"
        text-color="#B3C0D1"
        active-text-color="#409eff"
      >
        <!-- 首页 -->
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <template #title v-if="!isCollapse">产品介绍</template>
        </el-menu-item>

        <!-- RAG 知识库 -->
        <el-menu-item index="/chat/rag">
          <el-icon><ChatDotRound /></el-icon>
          <template #title v-if="!isCollapse">RAG 知识库问答</template>
        </el-menu-item>

        <!-- 天气助手 -->
        <el-menu-item index="/chat/weather">
          <el-icon><MagicStick /></el-icon>
          <template #title v-if="!isCollapse">AI 天气智能助手</template>
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
import {ref} from "vue";
import {
  ChatDotRound,
  DArrowLeft,
  DArrowRight,
  HomeFilled,
  MagicStick
} from "@element-plus/icons-vue";
const route = useRoute()
const isCollapse = ref(true)
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
  overflow: hidden; /* 核心：彻底切断外层滚动条 */
}
</style>

<style scoped>
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
  padding: 0; /* 关键：移除默认 padding 让子页面自适应 */
  background-color: #f5f7fa;
  flex: 1;
  position: relative;
  overflow: hidden; /* 防止内部溢出影响外层 */
}
/* --- 侧边栏整体样式 --- */
.sidebar-container {
  height: 100vh;
  background-color: #f0f2f5; /* 极浅蓝灰背景 */
  color: #303133;
  border-right: 1px solid #dcdfe6;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* --- Logo 区域 --- */
.logo-vertical {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
  font-weight: bold;
  font-size: 16px;
  background-color: #ffffff; /* Logo区域纯白，形成对比 */
  border-bottom: 1px solid #dcdfe6;
}

.logo-title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  letter-spacing: 1px;
}

/* --- 折叠按钮 --- */
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

/* --- 优化后的菜单 --- */
.optimized-menu {
  border-right: none;
  flex: 1;
  overflow-y: auto;
  background-color: #f0f2f5 !important; /* 菜单背景与侧边栏一致 */
}

/* 菜单项样式 */
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

/* 悬停样式 */
.optimized-menu .el-menu-item:hover {
  background-color: #e6e6e6 !important;
}

/* 选中样式：使用深蓝色高亮 */
.optimized-menu .el-menu-item.is-active {
  background-color: #d9e4f1 !important; /* 浅蓝背景 */
  border-left: 4px solid #409eff; /* 蓝色竖条 */
  padding-left: 16px !important;
  color: #1989fa !important;
}

.optimized-menu .el-menu-item.is-active i {
  color: #1989fa !important;
}
</style>
