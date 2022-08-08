import API from "../TokenApi";
class RecruiterService {
    getProfile() {
        return API.get("reclutador/perfil");
    }

    updateProfile(candidato) {
        return API.post("reclutador/actualizar", candidato);
    }
}
export default new RecruiterService();