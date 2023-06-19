import { HttpStatusCode } from './../../protocols/http/http-response';
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from '@/domain/errors/unexpected-error';

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy
};

const makeSut = (url: string = 'any_url'): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy();
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
});