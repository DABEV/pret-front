import API from "../TokenApi";
class AuthService {
    getProfile() {
        return API.get("candidato/perfil");
    }

    updateProfile(candidato) {
        console.log("candidato: " + candidato)
        return API.post("candidato/actualizar", candidato);
    }
}
export default new AuthService();