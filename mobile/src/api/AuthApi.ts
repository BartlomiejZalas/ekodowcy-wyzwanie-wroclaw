import { API_URL } from './apiConfig';

export interface AuthResponse {
  id: number;
  login: string;
  token: string;
}

export interface AuthRegisterRequestDto {
  login: string;
  email: string;
  password: string;
  rePassword: string;
  type: string;
  schoolId: number;
}

export abstract class AuthApi {
  static async login(login: string, password: string): Promise<AuthResponse> {
    const response = await fetch(API_URL + 'public/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });
    return response.json();
  }

  static async register(data: AuthRegisterRequestDto): Promise<AuthResponse> {
    const response = await fetch(API_URL + 'public/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
