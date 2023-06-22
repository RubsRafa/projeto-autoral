import api from './api';

export async function getChatMessagesApi(token, userId) {
    const { data } = await api.get(`/chat/${userId}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function postChatMessagesApi(token, body) {
    const { data } = await api.post('/chat', body, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function deleteChatMessagesApi(token, messageId) {
    const { data } = await api.delete(`/chat/${messageId}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function getChatUsersApi(token) {
    const { data } = await api.get('/chat/users', {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}