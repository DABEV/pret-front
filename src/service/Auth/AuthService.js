import API from "../NoTokenApi";
class AuthService {
    login(data) {
        return API.post("auth/login", data);
    }
}
export default new AuthService();