import axios from 'axios';

export const client = axios.create();
client.defaults.baseURL = 'http://localhost:4000';
//client.defaults.withCredentials = true;

// API 요청하는 콜마다 헤더에 담아 보낼 값 설정
export function setClientCookie(cookie: string, token: string) {
    client.defaults.headers.common['Cookie'] = cookie;
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    client.defaults.headers.common['Accept'] = 'application/json';
    client.defaults.headers.common['Content-Type'] = 'application/json';
    //client.defaults.headers.common = { Cookie: cookie, Authorization: `Bearer ${token}` };
}

// Sending the bearer token with axios

// client.interceptors.request.use(
//     config => {
//         // Do something before request is sent
//
//         config.headers["Authorization"] = "bearer " + getToken();
//         return config;
//     },
//     error => {
//         Promise.reject(error);
//     }
// );
