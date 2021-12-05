import download from 'downloadjs';

export interface Warning {
  id: number;
  description?: string | null;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export abstract class WarningsApi {
  static async getWarnings(): Promise<Warning[]> {
    const response = await fetch('http://localhost:8080/public/alerts');
    return response.json();
  }

  static async downloadWarnings(): Promise<void> {
    const response = await fetch('http://localhost:8080/public/alerts');
    const blob = await response.blob();
    download(blob);
  }
}
