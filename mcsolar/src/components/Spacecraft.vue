<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  x: number;
  y: number;
  angle?: number;
  isTraveling?: boolean;
  scale?: number;
}

const props = withDefaults(defineProps<Props>(), {
  angle: 0,
  isTraveling: false,
  scale: 1
});

const transformStyle = computed(() => {
  return {
    left: `${props.x}px`,
    top: `${props.y}px`,
    transform: `rotate(${props.angle}deg) scale(${props.scale})`,
    transition: props.isTraveling 
      ? 'left 3s ease-in-out, top 3s ease-in-out, transform 0.3s ease' 
      : 'left 0.3s ease, top 0.3s ease, transform 0.3s ease'
  };
});
</script>

<template>
  <div 
    class="spacecraft" 
    :class="{ 'traveling': isTraveling }"
    :style="transformStyle"
  >
    <!-- Simple carré pour les tests - sera remplacé par une image plus tard -->
    <div class="spacecraft-square"></div>
  </div>
</template>

<style scoped>
.spacecraft {
  position: absolute;
  width: 28px;
  height: 30px;
  transform-origin: center center;
  z-index: 50;
  pointer-events: all;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.spacecraft:hover {
  transform: scale(1.2);
}

.spacecraft-square {
  width: 28px;
  height: 100%;
  background: linear-gradient(135deg, #4a9eff 0%, #0066ff 100%);
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(74, 158, 255, 0.6);
  transition: all 0.3s ease;
}

.spacecraft.traveling .spacecraft-square {
  box-shadow: 0 0 20px rgba(74, 158, 255, 1);
  animation: pulse 0.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
</style>
