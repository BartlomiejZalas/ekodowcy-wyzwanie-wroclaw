import { API_URL } from './apiConfig';

export interface SchoolsDto {
  id: number;
  name: string;
}

export interface RankingDto {
  schoolId: number;
  schoolName: string;
  score: number;
}

export abstract class SchoolsApi {
  static async getSchools(): Promise<SchoolsDto[]> {
    const response = await fetch(API_URL + 'public/schools');
    return response.json();
  }

  static async getRanking(): Promise<RankingDto[]> {
    const response = await fetch(API_URL + 'public/schools/ranking');
    return response.json();
  }
}
