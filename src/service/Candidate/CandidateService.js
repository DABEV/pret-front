import API from "../TokenApi";
class CandidateService {
    getProfile() {
        return API.get("candidato/perfil");
    }

    updateProfile(candidato) {
        return API.post("candidato/actualizar", candidato);
    }
}
export default new CandidateService();