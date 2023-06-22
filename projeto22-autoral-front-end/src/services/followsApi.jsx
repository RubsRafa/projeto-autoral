import api from './api';

export async function getFollows(token, userId) {
    const { data } = await api.get(`/follow/${userId}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function followUser(token, body) {
    const { data } = await api.post('/follow', body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function unfollowUser(token, followId) {
    const { data } = await api.delete(`/follow/${followId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}