export declare namespace Warnings {
  interface Warning {
    id: number;
    timestamp: number;
    description?: string | null;
    category?: string | null;
    latitude: number;
    longitude: number;
  }
}

export const warningCategories = [
  'Niedziałające światła',
  'Brak ścieżki rowerowej',
  'Duży ruch uliczny',
  'Niejasne oznakowanie',
];
