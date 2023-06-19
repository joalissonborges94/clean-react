import { AuthenticationParams } from "@/domain/useCases/authentication";

export const mockAuthentication = (): AuthenticationParams => ({
    email: 'teste@teste.com.br',
    password: '12345678'
});