import api from "./api";

export async function signUp(user) {
    const { data } = await api.post('/auth/signup', user);
    return data;
}

export async function signIn(user) {
    const { data } = await api.post('/auth/signin', user);
    return data;
}