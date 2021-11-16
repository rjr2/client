import decode from 'jwt-decode';

class AuthService {
    getUser() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token =this.getUser();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        //Sets token in local storage and redirects to the user portal
        window.location.assign('/portal');
    }

    logout() {
        localStorage.removeItem('id_token');
        //Deletes token and takes user to homepage
        window.location.assign('/');
    }
}

export default new AuthService();