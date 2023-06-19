import { AuthenticationParams } from "../useCases/authentication";

export const mockAuthentication = (): AuthenticationParams => ({
    email: 'teste@teste.com.br',
    password: '12345678'
})