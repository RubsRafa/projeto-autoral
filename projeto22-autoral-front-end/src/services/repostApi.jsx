import api from './api';

export async function postRepost(body, token) {
    const { data } = await api.post('/repost', body, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function deleteRepostApi(token, postId) {
    const { data } = await api.delete(`/repost/${postId}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}