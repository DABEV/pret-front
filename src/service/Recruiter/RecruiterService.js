import API from "../NoTokenApi";
import API_TOKEN from "../TokenApi";
class RecruiterService {
    getProfile() {
        return API_TOKEN.get("reclutador/perfil");
    }
    
    registrar(data){
        return API.post("reclutador/registrar", data);
    }

    updateProfile(candidato) {
        return API_TOKEN.post("reclutador/actualizar", candidato);
    }

    updatePhoto(foto){
        return API_TOKEN.post("reclutador/actualizar-foto", foto)
    }

    listarVacantes(){
        return API_TOKEN.get("vacante/obtener/reclutador", );
    }

    registrarVacante(data){
        return API_TOKEN.post("vacante/registrar", data);
    }
    
}
export default new RecruiterService();
