import { API_URL } from './apiConfig';
import { HttpClient } from './AuthenticatedHttpClient';

export interface WarningDto {
  id: number;
  description?: string | null;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export abstract class WarningsApi {
  static async addWarning(
    requestBody: Omit<WarningDto, 'id'>,
  ): Promise<WarningDto> {
    const { data } = await HttpClient.getInstance().post<WarningDto>(
      API_URL + 'alert/',
      requestBody,
    );
    return data;
  }

  static async getWarnings(): Promise<WarningDto[]> {
    const { data } = await HttpClient.getInstance().get<WarningDto[]>(
      API_URL + 'alerts/',
    );
    return data;
  }

  static async updateDescription(
    id: number,
    description: string,
  ): Promise<WarningDto> {
    const { data } = await HttpClient.getInstance().patch<WarningDto>(
      API_URL + 'alert/' + id,
      { description },
    );
    return data;
  }
}
