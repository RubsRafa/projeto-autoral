import api from "./api";

export async function getUserHumorDiary(token) {
    const { data } = await api.get('/mental-health', {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function postUserHumorDiary(token, body) {
    const { data } = await api.post('/mental-health', body, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function putUserHumorDiary(token, body) {
    const { data } = await api.put('/mental-health', body, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export async function deleteUserHumorDiary(token, id) {
    const { data } = await api.delete(`/mental-health/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}
