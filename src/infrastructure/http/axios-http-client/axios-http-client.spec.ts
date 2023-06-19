import { AxiosHttpClient } from "./axios-http-client";
import { mockAxios } from "@/infrastructure/test";
import axios from "axios";
import { makePostRequest } from "@/data/test";

jest.mock('axios');

type SutTypes = {
    sut: AxiosHttpClient;
    mockedAxios: jest.Mocked<typeof axios>;
}

const makeSut = (): SutTypes => {
   const sut = new AxiosHttpClient();
   const mockedAxios = mockAxios();

   return {
    sut,
    mockedAxios
   }
}

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async() => {
        const { sut, mockedAxios } = makeSut();
        sut.post(makePostRequest());
        expect(mockedAxios.post).toHaveBeenCalledWith(makePostRequest().url, makePostRequest().body)
    });

    test('Should return the correct status code and body', () => {
        const { sut, mockedAxios } = makeSut();
        const promise = sut.post(makePostRequest());
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
})