<script setup lang="ts">
interface Props {
  onClick: () => void;
}

defineProps<Props>();
</script>

<template>
  <button class="back-arrow" @click="onClick">
    ←
  </button>
</template>

<style scoped>
.back-arrow {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-arrow:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}
</style>
