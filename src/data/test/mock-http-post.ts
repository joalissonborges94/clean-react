import { HttpPostParams } from "../protocols/http";

export const makePostRequest = (): HttpPostParams<any> => ({
    url: 'any_url',
    body: {}
})