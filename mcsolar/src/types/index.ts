/**
 * Types partagés pour l'application McSolar
 */

export interface Game {
  name: string;
  description: string;
  route: string;
  icon?: string;
  category?: string;
}

export interface Planet {
  id: number;
  name: string;
  x: number;
  y: number;
  size: number;
  color: string;
  levels?: PlanetLevel[];
}

export interface PlanetLevel {
  id: number;
  name: string;
  description: string;
  depth: number; // Profondeur du niveau (0 = surface, plus élevé = plus profond)
  color?: string;
  games?: Game[]; // Jeux disponibles dans ce territoire/niveau
  x?: number; // Position X du territoire sur la planète (0-100%)
  y?: number; // Position Y du territoire sur la planète (0-100%)
  width?: number; // Largeur du territoire (0-100%)
  height?: number; // Hauteur du territoire (0-100%)
}

export interface ClickPosition {
  x: number;
  y: number;
}

export interface CameraPosition {
  x: number;
  y: number;
}

export interface RouteMeta {
  title?: string;
  requiresAuth?: boolean;
  icon?: string;
}
