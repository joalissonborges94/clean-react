import { AuthenticationParams } from "@/domain/useCases/authentication";
import { AccountModel } from "../models/account-model";

export const mockAuthentication = (): AuthenticationParams => ({
    email: 'teste@teste.com.br',
    password: '12345678'
});

export const mockAccountModel = (): AccountModel => ({
    accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4Njc5NDQ4MSwiaWF0IjoxNjg2Nzk0NDgxfQ.dGjuU7ilCteIVlv6Tphq1phDu4SGyTnQyFPzT-RQscQ'
});