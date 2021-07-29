import {UserInterface} from "../interfaces/user.interface";

const url = 'https://api.github.com';

class UserAPI {
    async getAllUsersAsync(count: number = 10): Promise<UserInterface[]> {
        const response = await fetch(`${url}/users?per_page=${count}`, {
            redirect: 'follow',
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Не удалось получить список пользователей');
        }

        return response.json();
    }

    async getUserAsync(login: string) {
        const response = await fetch(`${url}/users/${login}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Не удалось получить пользователя');
        }

        return response.json();
    }
}

export default new UserAPI();
