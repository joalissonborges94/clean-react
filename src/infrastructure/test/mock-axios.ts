import axios from "axios";

export const mockAxios = ():  jest.Mocked<typeof axios> => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue({
        status: 200,
        data: {}
    });

    return mockedAxios;
}