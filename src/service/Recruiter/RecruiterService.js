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

    obtenerVacanteUnica(id){
        return API.get(`vacante/obtener/${id}`, );
    }

    registrarVacante(data){
        return API_TOKEN.post("vacante/registrar", data);
    }

    actualizarVacante(data){
        return API_TOKEN.post("vacante/actualizar", data);
    }
    
}
export default new RecruiterService();
