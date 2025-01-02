export interface AbstractAuthService {
  login(email: string, password: string): Promise<string>;
}
