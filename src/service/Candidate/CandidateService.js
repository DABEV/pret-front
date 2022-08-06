import API from "./CandidateApi";
class AuthService {
    getProfile() {
        return API.get("/perfil");
    }
}
export default new AuthService();