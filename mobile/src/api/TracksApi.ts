import { API_URL } from './apiConfig';
import { Tracking, TrackType } from '../domain/tracking/Tracking.types';
import { HttpClient } from './AuthenticatedHttpClient';

export interface TrackDto {
  id: number;
  distance: number;
  path: Array<Tracking.Location>;
  startTimestamp: number;
  stopTimestamp: number;
  type: TrackType;
  score: number;
}

export abstract class TracksApi {
  static async addTrack(requestBody: Omit<TrackDto, 'id'>): Promise<TrackDto> {
    const { data } = await HttpClient.getInstance().post<TrackDto>(
      API_URL + 'tracks/',
      requestBody,
    );
    return data;
  }

  static async getTracks(): Promise<TrackDto[]> {
    const { data } = await HttpClient.getInstance().get<TrackDto[]>(
      API_URL + 'tracks/',
    );
    return data;
  }
}
