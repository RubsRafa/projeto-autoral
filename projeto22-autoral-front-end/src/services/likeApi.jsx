import api from './api';

export async function postLike(body, token) {
    const { data } = await api.post('/like', body, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function deleteLike(postId, token) {
    const { data } = await api.delete(`/like/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
  

export async function getUserLikes(token) {
    const { data } = await api.get('/like', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function getAllUsersLikes(token) {
    const { data } = await api.get('/like/users', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}