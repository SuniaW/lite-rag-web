import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => {
        return import('../components/HomeView.vue')
      },
    },
    {
      path: '/chat/code',
      component: () => {
        return import('../components/ChatBox.vue')
      },
    },
    {
      path: '/chat/rag',
      component: () => {
        return import('../components/RagChatBox.vue')
      },
      props: true,
    },
    {
      path: `/chat/topic/:id`,
      component: () => {
        return import('../components/ManualMd.vue')
      },
      props: true,
    },
  ],
})

export default router
