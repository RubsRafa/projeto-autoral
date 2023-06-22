import api from './api';

export async function postComment(body, token) {
    const { data } = await api.post('/comment', body, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function getComments(token) {
    const { data } = await api.get('/comment', {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}