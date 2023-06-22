import api from './api';

export async function sendPost(body, token) {
    const { data } = await api.post('/posts', body, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function getAllPostsApi(token) {
    const { data } = await api.get('/posts', {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function getUserPostsApi(token, userId) {
    const { data } = await api.get(`/posts/user/${userId}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function deleteUserPostApi(token, postId) {
    const { data } = await api.delete(`/posts/${postId}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}