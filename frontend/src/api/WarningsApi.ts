import download from 'downloadjs';

export interface Warning {
  id: number;
  description?: string | null;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export abstract class WarningsApi {
  private static API_URL = import.meta.env.VITE_API_URL;

  static async getWarnings(): Promise<Warning[]> {
    const response = await fetch(WarningsApi.API_URL + '/public/alerts');
    return response.json();
  }

  static async downloadWarnings(): Promise<void> {
    const response = await fetch(WarningsApi.API_URL + '/public/alerts');
    const blob = await response.blob();
    download(blob);
  }
}
