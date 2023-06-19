import { HttpPostClientSpy } from "../../test/mock-http-client";
import { RemoteAuthentication } from "./remote-authentication";
import { mockAuthentication } from "../../../domain/test/mock-authentication";

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () => { 
    test('Should call HttpClient with correct URL', async () => {
        const url = "other_url";
        const { sut, httpPostClientSpy } = makeSut(url);
        await sut.auth(mockAuthentication());
        expect(httpPostClientSpy.url).toBe(url);
    }) 
})

describe('RemoteAuthentication', () => { 
    test('Should call HttpClient with correct body', async () => {
        const url = "other_url";
        const { sut, httpPostClientSpy } = makeSut(url);
        await sut.auth(mockAuthentication());
        expect(httpPostClientSpy.body).toEqual(mockAuthentication());
    }) 
})