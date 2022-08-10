import API from "../TokenApi";
class RecruiterService {
    getProfile() {
        return API.get("reclutador/perfil");
    }

    updateProfile(candidato) {
        return API.post("reclutador/actualizar", candidato);
    }

    updatePhoto(foto){
        return API.post("reclutador/actualizar-foto", foto)
    }
}
export default new RecruiterService();