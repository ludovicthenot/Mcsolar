# Guide d'ajout de nouveaux jeux

Ce guide vous explique comment ajouter facilement de nouveaux jeux à votre application McSolar.

## Structure du projet

```
src/
├── pages/          # Pages/jeux de l'application
├── components/     # Composants réutilisables
├── router/         # Configuration du routing
├── config/         # Fichiers de configuration
├── types/          # Types TypeScript partagés
└── assets/         # Ressources statiques
```

## Ajouter un nouveau jeu en 3 étapes

### Étape 1 : Créer la page du jeu

Créez un nouveau fichier dans `src/pages/` :

```vue
<script setup lang="ts">
// Votre logique de jeu ici
</script>

<template>
  <div class="game-page">
    <!-- Votre interface de jeu -->
  </div>
</template>

<style scoped>
/* Vos styles */
</style>
```

### Étape 2 : Ajouter la route

Dans `src/router/index.ts`, ajoutez votre route :

```typescript
import MonNouveauJeuPage from '@/pages/MonNouveauJeuPage.vue';

const routes: RouteRecordRaw[] = [
  // ... routes existantes
  {
    path: '/mon-nouveau-jeu',
    name: 'mon-nouveau-jeu',
    component: MonNouveauJeuPage,
    meta: { title: 'Mon Nouveau Jeu' }
  }
];
```

### Étape 3 : Enregistrer le jeu dans la configuration

Dans `src/config/games.ts`, ajoutez votre jeu :

```typescript
export const games: Game[] = [
  // ... jeux existants
  {
    name: 'Mon Nouveau Jeu',
    description: 'Description de mon jeu',
    route: '/mon-nouveau-jeu',
    icon: '🎮',
    category: 'Action'
  }
];
```

## Exemple complet

### 1. Créer `src/pages/ExempleJeuPage.vue`

```vue
<script setup lang="ts">
import { RouterLink } from 'vue-router';

const score = ref(0);

const incrementScore = () => {
  score.value++;
};
</script>

<template>
  <div class="exemple-game-page">
    <RouterLink to="/" class="back-button">← Retour</RouterLink>
    <h1>Mon Jeu Exemple</h1>
    <button @click="incrementScore">Score: {{ score }}</button>
  </div>
</template>

<style scoped>
.exemple-game-page {
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
```

### 2. Ajouter la route dans `src/router/index.ts`

```typescript
import ExempleJeuPage from '@/pages/ExempleJeuPage.vue';

const routes: RouteRecordRaw[] = [
  // ...
  {
    path: '/exemple-jeu',
    name: 'exemple-jeu',
    component: ExempleJeuPage,
    meta: { title: 'Jeu Exemple' }
  }
];
```

### 3. Enregistrer dans `src/config/games.ts`

```typescript
export const games: Game[] = [
  // ...
  {
    name: 'Jeu Exemple',
    description: 'Un exemple de jeu simple',
    route: '/exemple-jeu',
    icon: '🎯',
    category: 'Exemple'
  }
];
```

C'est tout ! Votre jeu apparaîtra automatiquement sur la page d'accueil.

## Bonnes pratiques

1. **TypeScript** : Utilisez des types pour vos données (voir `src/types/index.ts`)
2. **Composants réutilisables** : Créez des composants dans `src/components/` si vous avez besoin de les réutiliser
3. **Styles** : Utilisez `scoped` pour éviter les conflits de styles
4. **Responsive** : Pensez à la compatibilité mobile
5. **Performance** : Utilisez `lazy loading` pour les gros jeux si nécessaire

## Composants utiles

- `RouterLink` : Pour la navigation entre pages
- `RouterView` : Pour afficher les pages (déjà dans App.vue)

## Support

Pour toute question, consultez la documentation de [Vue 3](https://vuejs.org/) et [Vue Router](https://router.vuejs.org/).
