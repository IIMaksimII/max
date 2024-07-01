import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from ".";

export const registration = async (email, password) => {
    try {
        const {data} = await $host.post('/api/user/registration', { email, password, role: 'USER' });
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token);
    } catch (error) {
      
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const {data} = await $host.post('/api/user/login', { email, password });
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token);
    } catch (error) {
       
        throw error;
    }
}


export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
        return jwtDecode(data.token);
}
export const fetchUsers = async () => {
    const { data } = await $authHost.get('/api/user');
    return data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roles.map(role => role.name).join(', ')
    }));
};
export const updateUser = async (userId, updatedUserData) => {
    try {
        // Assume `updatedUserData` contains the fields you want to update for the user
        const { data } = await $authHost.put(`/api/user/${userId}`, updatedUserData);
        return data; // Return updated user data or confirmation
    } catch (error) {
        throw error;
    }
};
export const deleteUserAPI = async (userId) => {
    try {
        const { data } = await $authHost.delete(`/api/user/${userId}`);
        return data; // Возвращаем данные об успешном удалении пользователя или подтверждение
    } catch (error) {
        throw error;
    }
};

export const fetchRoles = async () => {
    try {
        const { data } = await $authHost.get('/api/user');
        return data;
    } catch (error) {
        throw error;
    }
};
