import { HttpStatusCode } from './../../protocols/http';
import { HttpPostClientSpy } from "@/data/test";
import { RemoteAuthentication } from "./remote-authentication";
import { mockAccountModel, mockAuthentication } from "@/domain/test";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { AccountModel } from '@/domain/models';
import { AuthenticationParams } from '@/domain/useCases';

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
};

const makeSut = (url: string = 'any_url'): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    return {
        sut,
        httpPostClientSpy
    };
};

describe('RemoteAuthentication', () => { 
    test('Should call HttpClient with correct URL', async () => {
        const url = "other_url";
        const { sut, httpPostClientSpy } = makeSut(url);
        await sut.auth(mockAuthentication());
        expect(httpPostClientSpy.url).toBe(url);
    });

    test('Should call HttpClient with correct body', async () => {
        const url = "other_url";
        const { sut, httpPostClientSpy } = makeSut(url);
        await sut.auth(mockAuthentication());
        expect(httpPostClientSpy.body).toEqual(mockAuthentication());
    });
    
    test('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unauthorized
        };
        const promise = sut.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new InvalidCredentialsError());
    });

    test('Should throw UnexpectedError if HttpClient returns 400', async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        };
        const promise = sut.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test('Should throw UnexpectedError if HttpClient returns 404', async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        };
        const promise = sut.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test('Should throw UnexpectedError if HttpClient returns 500', async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.internalError
        };
        const promise = sut.auth(mockAuthentication());
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test('Should return an AccountModel if HttpClient returns 200', async () => {
        const { sut, httpPostClientSpy } = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: mockAccountModel()
        };
        const account = await sut.auth(mockAuthentication());
        await expect(account).toEqual(mockAccountModel());
    });
});