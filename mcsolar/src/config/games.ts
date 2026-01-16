/**
 * Configuration centralisée des jeux
 * Ajoutez ici tous les nouveaux jeux de votre application
 */

import type { Game } from '@/types';

export const games: Game[] = [
  {
    name: 'Système Solaire',
    description: 'Explorez les planètes de notre système solaire',
    route: '/solar-system',
    icon: '🌍',
    category: 'Exploration'
  }
  // Ajoutez vos nouveaux jeux ici :
  // {
  //   name: 'Mon Nouveau Jeu',
  //   description: 'Description du jeu',
  //   route: '/mon-nouveau-jeu',
  //   icon: '🎮',
  //   category: 'Action'
  // }
];

/**
 * Fonction utilitaire pour ajouter un jeu dynamiquement
 */
export const registerGame = (game: Game): void => {
  games.push(game);
};

/**
 * Récupérer un jeu par sa route
 */
export const getGameByRoute = (route: string): Game | undefined => {
  return games.find(game => game.route === route);
};
