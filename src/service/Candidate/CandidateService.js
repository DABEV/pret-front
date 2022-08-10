import API from "../TokenApi";
class CandidateService {
    getProfile() {
        return API.get("candidato/perfil");
    }

    updateProfile(candidato) {
        return API.post("candidato/actualizar", candidato);
    }

    updatePhoto(foto){
        return API.post("candidato/actualizar-foto", foto)
    }
}
export default new CandidateService();