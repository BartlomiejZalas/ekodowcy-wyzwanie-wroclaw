import { API_URL } from './apiConfig';
import axios, { AxiosInstance } from 'axios';

export abstract class HttpClient {
  private static instance: AxiosInstance | null = null;

  static initialize(token: string) {
    this.instance = axios.create({ baseURL: API_URL });
    this.instance.interceptors.request.use(config => {
      config['headers']!['Authorization'] = `Bearer ${token}`;
      return config;
    });
  }

  static clear() {
    this.instance = null;
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    throw new Error('HTTP Client is not initialized');
  }
}
