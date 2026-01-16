<script setup lang="ts">
import { ref, computed } from 'vue';
import Spacecraft from './Spacecraft.vue';
import type { Planet, PlanetLevel, Game } from '@/types';

interface Props {
  planet: Planet;
  spacecraftPosition: { x: number; y: number };
}

const props = defineProps<Props>();

const emit = defineEmits<{
  returnToSpace: [];
  selectGame: [game: Game];
}>();

const selectedTerritory = ref<PlanetLevel | null>(null);

// Niveaux par défaut si la planète n'en a pas (limité à 4)
const defaultLevels: PlanetLevel[] = [
  { 
    id: 1, 
    name: 'Surface', 
    description: 'Niveau de surface de la planète', 
    depth: 0, 
    color: props.planet.color,
    x: 20,
    y: 20,
    width: 25,
    height: 25
  },
  { 
    id: 2, 
    name: 'Crust', 
    description: 'Couche crustale', 
    depth: 1, 
    color: props.planet.color,
    x: 55,
    y: 20,
    width: 25,
    height: 25
  },
  { 
    id: 3, 
    name: 'Mantle', 
    description: 'Manteau planétaire', 
    depth: 2, 
    color: props.planet.color,
    x: 20,
    y: 55,
    width: 25,
    height: 25
  },
  { 
    id: 4, 
    name: 'Core', 
    description: 'Noyau planétaire', 
    depth: 3, 
    color: props.planet.color,
    x: 55,
    y: 55,
    width: 25,
    height: 25
  }
];

const planetLevels = computed(() => {
  return props.planet.levels || defaultLevels;
});

const handleSpacecraftClick = () => {
  emit('returnToSpace');
};

const selectTerritory = (territory: PlanetLevel) => {
  selectedTerritory.value = territory;
};

const selectGame = (game: Game) => {
  emit('selectGame', game);
};

const backToTerritories = () => {
  selectedTerritory.value = null;
};
</script>

<template>
  <div class="planet-territories">
    <!-- Vue des territoires -->
    <div v-if="!selectedTerritory" class="territories-view">
      <div class="planet-header">
        <h1 class="planet-title">{{ planet.name }}</h1>
        <p class="planet-subtitle">Sélectionnez un territoire à explorer</p>
      </div>

      <div class="territories-container">
        <div 
          v-for="territory in planetLevels" 
          :key="territory.id"
          class="territory-card"
          :style="{ 
            backgroundColor: territory.color || planet.color,
            left: `${territory.x || 0}%`,
            top: `${territory.y || 0}%`,
            width: `${territory.width || 40}%`,
            height: `${territory.height || 40}%`
          }"
          @click="selectTerritory(territory)"
        >
          <div class="territory-content">
            <h2 class="territory-name">{{ territory.name }}</h2>
            <p class="territory-description">{{ territory.description }}</p>
            <div v-if="territory.games && territory.games.length > 0" class="games-count">
              {{ territory.games.length }} jeu{{ territory.games.length > 1 ? 'x' : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vue des jeux du territoire sélectionné -->
    <div v-else class="games-view">
      <div class="games-header">
        <button @click="backToTerritories" class="back-button">← Retour aux territoires</button>
        <h2 class="territory-title">{{ selectedTerritory.name }}</h2>
        <p class="territory-description">{{ selectedTerritory.description }}</p>
      </div>

      <div v-if="selectedTerritory.games && selectedTerritory.games.length > 0" class="games-grid">
        <div 
          v-for="game in selectedTerritory.games" 
          :key="game.route"
          class="game-card"
          @click="selectGame(game)"
        >
          <div class="game-icon">{{ game.icon || '🎮' }}</div>
          <h3 class="game-name">{{ game.name }}</h3>
          <p class="game-description">{{ game.description }}</p>
        </div>
      </div>

      <div v-else class="no-games">
        <p>Aucun jeu disponible dans ce territoire pour le moment.</p>
      </div>
    </div>
    
    <!-- Vaisseau pour retourner -->
    <div class="spacecraft-container" @click="handleSpacecraftClick">
      <Spacecraft 
        :x="spacecraftPosition.x" 
        :y="spacecraftPosition.y"
        :angle="180"
        :scale="1.5"
      />
      <div class="click-hint">Cliquez pour retourner dans l'espace</div>
    </div>
  </div>
</template>

<style scoped>
.planet-territories {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 200;
  overflow-y: auto;
}

.territories-view,
.games-view {
  width: 100%;
  min-height: 100vh;
  padding: 40px;
}

.planet-header {
  text-align: center;
  margin-bottom: 50px;
}

.planet-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.planet-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
}

.territories-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 600px;
  margin: 0 auto;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.5) 100%);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.territory-card {
  position: absolute;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.territory-card:hover {
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  z-index: 10;
}

.territory-content {
  text-align: center;
  padding: 20px;
  color: white;
}

.territory-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.territory-description {
  font-size: 0.9rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.games-count {
  margin-top: 10px;
  padding: 5px 15px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
}

.games-header {
  text-align: center;
  margin-bottom: 40px;
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

.territory-title {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 10px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.game-card {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  backdrop-filter: blur(10px);
}

.game-card:hover {
  transform: translateY(-10px);
  border-color: rgba(74, 158, 255, 0.8);
  box-shadow: 0 20px 40px rgba(74, 158, 255, 0.3);
}

.game-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.game-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
}

.game-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.no-games {
  text-align: center;
  padding: 60px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
}

.spacecraft-container {
  position: fixed;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
  z-index: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  transition: transform 0.3s ease;
}

.spacecraft-container:hover {
  transform: scale(1.1);
}

.click-hint {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.spacecraft-container:hover .click-hint {
  opacity: 1;
}
</style>
