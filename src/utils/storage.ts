import type { AppState } from '../types';

const STORAGE_KEY = 'webcloud-funnel-state';

/**
 * Sauvegarde l'état de l'application dans le localStorage
 */
export function saveAppState(state: Partial<AppState>): void {
  try {
    const existingState = loadAppState();
    const mergedState = { ...existingState, ...state };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedState));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
}

/**
 * Charge l'état de l'application depuis le localStorage
 */
export function loadAppState(): Partial<AppState> | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return null;
  }
}

/**
 * Réinitialise l'état sauvegardé
 */
export function clearAppState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error);
  }
}
