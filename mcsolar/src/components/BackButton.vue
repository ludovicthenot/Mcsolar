<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface Props {
  to?: string;
  text?: string;
}

withDefaults(defineProps<Props>(), {
  to: '/',
  text: '← Retour'
});
</script>

<template>
  <RouterLink :to="to" class="back-button">
    {{ text }}
  </RouterLink>
</template>

<style scoped>
.back-button {
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px 30px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 30px;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.back-button:hover {
  background: white;
  color: black;
  transform: scale(1.05);
}
</style>
