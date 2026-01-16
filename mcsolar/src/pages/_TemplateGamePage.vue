<!-- 
  TEMPLATE POUR CRÉER UN NOUVEAU JEU
  
  Instructions :
  1. Copiez ce fichier dans un nouveau fichier (ex: MonJeuPage.vue)
  2. Remplacez "TemplateGame" par le nom de votre jeu
  3. Ajoutez votre logique de jeu dans la section <script>
  4. Créez votre interface dans la section <template>
  5. Personnalisez les styles dans la section <style>
  6. N'oubliez pas d'ajouter la route dans router/index.ts
  7. Enregistrez le jeu dans config/games.ts
-->

<script setup lang="ts">
import { ref } from 'vue';
import BackButton from '@/components/BackButton.vue';

// Exemple de données réactives
const score = ref(0);
const isPlaying = ref(false);

// Exemple de fonction
const startGame = () => {
  isPlaying.value = true;
  score.value = 0;
};

const incrementScore = () => {
  if (isPlaying.value) {
    score.value++;
  }
};
</script>

<template>
  <div class="template-game-page">
    <!-- Bouton de retour -->
    <BackButton />

    <!-- Contenu principal du jeu -->
    <div class="game-container">
      <h1 class="game-title">Template Game</h1>
      
      <div class="game-content">
        <div v-if="!isPlaying" class="start-screen">
          <p class="game-description">
            Bienvenue dans ce jeu ! Cliquez sur le bouton pour commencer.
          </p>
          <button @click="startGame" class="start-button">
            Commencer
          </button>
        </div>

        <div v-else class="game-screen">
          <div class="score-display">
            Score: {{ score }}
          </div>
          
          <button @click="incrementScore" class="action-button">
            Cliquez ici !
          </button>

          <button @click="isPlaying = false" class="stop-button">
            Arrêter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.template-game-page {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  position: relative;
}

.game-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
  text-align: center;
}

.game-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.game-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 60px 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.game-description {
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
}

.start-button,
.action-button,
.stop-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.start-button:hover,
.action-button:hover {
  background: white;
  color: #667eea;
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
}

.stop-button {
  background: rgba(255, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.stop-button:hover {
  background: rgba(255, 0, 0, 0.6);
  transform: scale(1.05);
}

.score-display {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.game-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
