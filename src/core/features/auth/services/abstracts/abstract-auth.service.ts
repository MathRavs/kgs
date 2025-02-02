export abstract class AbstractAuthService {
  abstract login(email: string, password: string): Promise<string>;
}
