import { HttpPostParams } from "@/data/protocols/http";
import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockResolvedValue({
    status: 200,
    data: {}
});


const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient();
}

const makePostRequest = (): HttpPostParams<any> => ({
    url: 'any_url',
    body: {}
})

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async() => {
        const sut = makeSut();
        sut.post(makePostRequest());
        expect(mockedAxios.post).toHaveBeenCalledWith(makePostRequest().url, makePostRequest().body)
    });

    test('Should return the correct status code and body', async() => {
        const sut = makeSut();
        const httpResponse = await sut.post(makePostRequest());
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {}
        });
    });
})