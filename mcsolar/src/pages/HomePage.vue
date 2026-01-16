<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { games } from '@/config/games';
import type { Game } from '@/types';
</script>

<template>
  <div class="home-page">
    <div class="hero-section">
      <h1 class="title">McSolar</h1>
      <p class="subtitle">Collection de jeux interactifs</p>
    </div>

    <div class="games-grid">
      <RouterLink
        v-for="game in games"
        :key="game.route"
        :to="game.route"
        class="game-card"
      >
        <div class="game-icon">{{ game.icon || '🎮' }}</div>
        <h2 class="game-name">{{ game.name }}</h2>
        <p class="game-description">{{ game.description }}</p>
        <div class="game-arrow">→</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
  color: white;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.game-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.game-card:hover::before {
  left: 100%;
}

.game-card:hover {
  transform: translateY(-10px);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}

.game-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.game-name {
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.game-description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
  line-height: 1.6;
}

.game-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover .game-arrow {
  opacity: 1;
}
</style>
