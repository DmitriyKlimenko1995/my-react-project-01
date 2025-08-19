import { jwtDecode } from 'jwt-decode';

/**
 * Проверяет, истёк ли JWT-токен.
 * @param {string} token - JWT токен.
 * @returns {boolean} - true, если токен истёк, иначе false.
 */
export const isTokenExpired = (token) => {
    if (!token) {
        return true; // Если токена нет, считаем его истёкшим
    }
    try {
        const decodedToken = jwtDecode(token);
        // Проверяем, существует ли поле exp (expiration time) и сравниваем его с текущим временем
        if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
            return true; // Токен истёк
        }
        return false; // Токен ещё действителен
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return true; // В случае ошибки декодирования считаем токен недействительным
    }
};