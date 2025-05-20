import axios, { type AxiosInstance } from "axios";
import type { LoginCredentials, SignupFields } from "../typings/Form";
import { cache } from "react";
import type { User } from "../typings/app";

export type Session = {
  token: string;
};

export class Client {
  api: AxiosInstance;
  session: Session | undefined;
  _lastInterceptor = 0;

  constructor(baseURL: string) {
    if (!baseURL) {
      throw new TypeError("baseURL must be defined");
    }

    this.api = axios.create({
      baseURL,
    });
  }

  async createAccount(credentials: SignupFields) {
    const { data } = await this.api.post(`/auth/create`, credentials);
    return data;
  }

  async getClientUser() {
    const { data } = await this.api.get<User>(`/users/@me`);
    return data;
  }

  async login(credentials: LoginCredentials) {
    const { data } = await this.api.post(`/auth/login`, credentials);
    this.session = data.session;
    this.updateHeaders();
  }

  updateHeaders() {
    if (this._lastInterceptor) {
      this.api.interceptors.request.eject(this._lastInterceptor);
    }

    const session = this.session;
    this._lastInterceptor = this.api.interceptors.request.use((config) => {
      if (session) {
        config.headers.Authorization = session.token;
      }
      return config;
    });
  }
}

const client = new Client(import.meta.env.VITE_API_URL);
export const useClient = cache(() => client);
