<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- 1. IMPORT DE L'IMAGE ---
import spaceBgImage from '@/assets/fond.png';

// --- 2. CONFIGURATION ---
const mapWidth = ref(0);
const mapHeight = ref(0);
const currentScale = ref(1); 
const cameraPos = ref({ x: 0, y: 0 });

// AJOUT : Variable pour stocker le dernier clic
const lastClick = ref({ x: 0, y: 0 });

// --- 3. LISTE DES PLANÈTES ---
const planets = ref([
  { id: 0, name: 'Soleil', x: 610, y: 300, size: 300, color: 'rgba(255, 100, 0, 0.1)' },
  { id: 1, name: 'Mercure', x: 220, y: 265, size: 155, color: 'rgba(180, 180, 180, 0.3)' },
  { id: 2, name: 'Vénus', x: 650, y: 700, size: 150, color: 'rgba(220, 180, 50, 0.3)' },
  { id: 3, name: 'Terre', x: 345, y: 405, size: 190, color: 'rgba(0, 100, 255, 0.3)' },
  { id: 4, name: 'Mars', x: 1200, y: 850, size: 65, color: 'rgba(255, 50, 0, 0.3)' },
  { id: 5, name: 'Jupiter', x: 435, y: 620, size: 250, color: 'rgba(200, 150, 100, 0.3)' },
  { id: 6, name: 'Saturne', x: 2050, y: 550, size: 200, color: 'rgba(240, 220, 150, 0.3)' },
  { id: 7, name: 'Uranus', x: 2450, y: 350, size: 100, color: 'rgba(100, 200, 255, 0.3)' },
  { id: 8, name: 'Neptune', x: 2700, y: 200, size: 90, color: 'rgba(0, 0, 150, 0.3)' },
  { id: 9, name: 'Pluton', x: 2900, y: 100, size: 40, color: 'rgba(200, 200, 200, 0.3)' }
]);

// --- FONCTIONS ---

const initMapDimensions = () => {
  const img = new Image();
  img.src = spaceBgImage;
  img.onload = () => {
    mapWidth.value = img.naturalWidth;
    mapHeight.value = img.naturalHeight;
    fitToScreen();
  };
};

const fitToScreen = () => {
  if (mapWidth.value === 0) return;

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const scaleX = screenW / mapWidth.value;
  const scaleY = screenH / mapHeight.value;
  
  // Math.max = Mode Cover (Pas de bandes noires)
  const newScale = Math.max(scaleX, scaleY); 

  currentScale.value = newScale;

  cameraPos.value.x = (screenW - (mapWidth.value * newScale)) / 2;
  cameraPos.value.y = (screenH - (mapHeight.value * newScale)) / 2;
};

const focusPlanet = (planet) => {
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  
  currentScale.value = 1;

  const planetCenterX = planet.x + (planet.size / 2);
  const planetCenterY = planet.y + (planet.size / 2);
  
  cameraPos.value.x = (screenW / 2) - planetCenterX;
  cameraPos.value.y = (screenH / 2) - planetCenterY;
};

// --- NOUVELLE FONCTION LOG ---
const logClickPosition = (event) => {
  // On récupère la position du clic sur l'écran
  const screenX = event.clientX;
  const screenY = event.clientY;

  // On récupère les valeurs actuelles de la caméra
  const camX = cameraPos.value.x;
  const camY = cameraPos.value.y;
  const scale = currentScale.value;

  // Calcul mathématique pour annuler le zoom et le déplacement
  // Formule : (PositionSouris - DécalageCamera) / Zoom
  const realX = (screenX - camX) / scale;
  const realY = (screenY - camY) / scale;

  // Mise à jour de l'affichage
  lastClick.value = { x: Math.round(realX), y: Math.round(realY) };
};

onMounted(() => {
  initMapDimensions();
  window.addEventListener('resize', fitToScreen);
});

onUnmounted(() => {
  window.removeEventListener('resize', fitToScreen);
});
</script>

<template>
  <div class="viewport">
    
    <div 
      v-if="mapWidth > 0"
      class="universe" 
      @click="logClickPosition"
      :style="{ 
        '--x': `${cameraPos.x}px`, 
        '--y': `${cameraPos.y}px`,
        '--s': currentScale,
        '--w': `${mapWidth}px`,
        '--h': `${mapHeight}px`,
        backgroundImage: `url(${spaceBgImage})`
      }"
    >
      <div 
        v-for="planet in planets" 
        :key="planet.id"
        class="planet-hotspot"
        :style="{
          left: `${planet.x}px`,
          top: `${planet.y}px`,
          width: `${planet.size}px`,
          height: `${planet.size}px`,
          backgroundColor: planet.color
        }"
        @click.stop="focusPlanet(planet)"
      >
        <span class="planet-name" :style="{ transform: `scale(${1/currentScale})` }">
          {{ planet.name }}
        </span>
      </div>
    </div>

    <div v-else class="loading-screen">
      Chargement du système...
    </div>

    <div class="ui-layer">
      <button @click="fitToScreen">Vue Globale</button>
      
      <div class="coord-box">
        CLIC: X: {{ lastClick.x }} / Y: {{ lastClick.y }}
      </div>
      
      <div class="debug-info">
        Zoom: {{ Math.round(currentScale * 100) }}%
      </div>
    </div>

  </div>
</template>

<style>
body { margin: 0; padding: 0; overflow: hidden; background-color: #000; }
</style>

<style scoped>
.viewport {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #06060c; 
}

.universe {
  width: var(--w); 
  height: var(--h);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0; left: 0;
  transform-origin: 0 0;
  transform: translate(var(--x), var(--y)) scale(var(--s));
  transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
  cursor: crosshair;
}

.planet-hotspot {
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.planet-hotspot:hover {
  background-color: rgba(255, 255, 255, 0.15) !important;
  border-color: #fff;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  z-index: 10;
}

.planet-name {
  color: white;
  font-family: 'Segoe UI', sans-serif;
  font-weight: 600;
  text-shadow: 0 0 4px #000, 0 0 8px #000;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.ui-layer {
  position: fixed;
  bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  pointer-events: none;
  z-index: 100;
}

/* AJOUT : STYLE DE LA BOÎTE ROUGE */
.coord-box {
  background: rgba(255, 0, 0, 0.8);
  color: white;
  font-weight: bold;
  padding: 8px 15px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid white;
  text-shadow: 0 1px 2px black;
}

.debug-info {
  font-family: monospace;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

button {
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
}

button:hover {
  background: white;
  color: black;
  transform: scale(1.05);
}

.loading-screen {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: monospace;
}
</style>