import API from "./AuthApi";
class AuthService {
    login(data) {
        return API.post("/login", data);
    }
}
export default new AuthService();