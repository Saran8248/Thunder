// auth.js - Authentication handling
class Auth {
    static login(email, password) {
        // Mock login
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockToken = 'mock_jwt_token_' + Date.now();
                const user = { id: 1, name: 'User', email, role: 'customer' };
                localStorage.setItem('thunder_token', mockToken);
                localStorage.setItem('thunder_user', JSON.stringify(user));
                resolve({ token: mockToken, user });
            }, 800);
        });
    }

    static logout() {
        localStorage.removeItem('thunder_token');
        localStorage.removeItem('thunder_user');
        window.location.reload();
    }

    static getUser() {
        const userStr = localStorage.getItem('thunder_user');
        return userStr ? JSON.parse(userStr) : null;
    }

    static isAuthenticated() {
        return !!localStorage.getItem('thunder_token');
    }
}
