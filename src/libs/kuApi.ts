import { Bindings } from '@/bindings/index';

export class KuApi {
  private readonly env: Bindings;
  private accessToken!: string;
  private refreshToken!: string;

  constructor(env: Bindings) {
    this.env = env;
  }
  async validateFace(body: { file: string; single: boolean }): Promise<boolean> {
    try {
      await this.login();
      const response = await fetch(`${this.env.KU_API_BASEURL}/terminal/recognition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
          'X-API-Key': this.env.TERMINAL_ID,
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as { match: boolean };
      if (response.status === 200) {
        return data.match;
      }
      throw new Error('Failed to validate face from api');
    } catch (e) {
      throw new Error(e as string);
    }
  }

  private async login(): Promise<void> {
    try {
      const response = await fetch(`${this.env.KU_API_BASEURL}/token/pair`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.env.KU_API_USERNAME,
          password: this.env.KU_API_PASSWORD,
        }),
      });
      const data = (await response.json()) as LoginResponse;
      if (response.status === 200) {
        this.accessToken = data.access;
        this.refreshToken = data.refresh;
      }
    } catch (e) {
      throw new Error(e as string);
    }
  }
}

type LoginResponse = {
  token: string;
  refresh: string;
  access: string;
};
