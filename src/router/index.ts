import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => {
        return import('../views/HomeView1.vue')
      },
    },
    {
      path: '/chat/weather',
      component: () => {
        return import('../views/ProductIntro.vue')
      },
    },
    {
      path: '/chat/ragbox',
      component: () => {
        return import('../views/RagChatBox.vue')
      },
      props: true,
    },
    {
      path: `/chat/topic/:id`,
      component: () => {
        return import('../views/ManualMd.vue')
      },
      props: true,
    },
    {
      path: `/chat/rag`,
      component: () => {
        return import('../views/RagProView.vue')
      },
      props: true,
    },
    {
      path: `/chat/about`,
      component: () => {
        return import('../views/AboutAuthor.vue')
      },
      props: true,
    },
  ],
})

export default router
