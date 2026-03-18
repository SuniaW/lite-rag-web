<template>
  <div class="code-block">
    <div class="code-header" v-if="title">
      <span class="code-title">{{ title }}</span>
      <button class="copy-btn" @click="copyCode" :title="copied ? '已复制' : '复制代码'">
        {{ copied ? '✓' : '📋' }}
      </button>
    </div>
    <pre><code :class="`language-${language}`">{{ code }}</code></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, default: 'bash' },
  title: { type: String, default: '' }
})

const copied = ref(false)

const copyCode = async () => {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<style lang="scss" scoped>
.code-block {
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
  background: #1e1e1e;

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: #2d2d2d;
    border-bottom: 1px solid #404040;

    .code-title {
      color: #9cdcfe;
      font-size: 0.85rem;
    }

    .copy-btn {
      background: transparent;
      border: none;
      color: #9cdcfe;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.3s ease;

      &:hover {
        background: #404040;
      }
    }
  }

  pre {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      color: #d4d4d4;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}
</style>
