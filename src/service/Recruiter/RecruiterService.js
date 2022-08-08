import API from "../TokenApi";
class AuthService {
    getProfile() {
        return API.get("reclutador/perfil");
    }

    updateProfile(candidato) {
        return API.post("reclutador/actualizar", candidato);
    }
}
export default new AuthService();