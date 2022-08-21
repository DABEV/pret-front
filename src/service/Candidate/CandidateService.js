import API from "../NoTokenApi";
import API_TOKEN from "../TokenApi";
class CandidateService {
    getProfile() {
        return API_TOKEN.get("candidato/perfil");
    }

    updateProfile(candidato) {
        return API_TOKEN.post("candidato/actualizar", candidato);
    }

    registrar(data){
        return API.post("candidato/registrar", data);
    }

    updatePhoto(foto){
        return API_TOKEN.post("candidato/actualizar-foto", foto)
    }
}
export default new CandidateService();
