import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
    test('Should call axios with correct url', async() => {
        const sut = new AxiosHttpClient();
        sut.post({url: 'any_url'});
        expect(mockedAxios).toHaveBeenCalledWith('any_url')
    })
})