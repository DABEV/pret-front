
import API from "../NoTokenApi";
import API_TOKEN  from "../TokenApi"

class AuthService {
    login(data) {
        return API.post("auth/login", data);
    }

    cambiarContrasena(data) {
        return API_TOKEN.post("auth/change-password", data);
    }
}
export default new AuthService();