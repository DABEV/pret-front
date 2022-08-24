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

    getByEmail(email){
        return API_TOKEN.post("candidato/get-id-by-email", email)
    }

    addLanguage(data){
        return API_TOKEN.post("idioma-candidato/registrar", data)
    }

    listContacts(){
        return API_TOKEN.get("contacto/lista-amigos")
    }

    rejectContact(id){
        return API_TOKEN.delete(`contacto/rechazar/${id}`)
    }

    aceptContact(id){
        return API_TOKEN.get(`contacto/aceptar/${id}`)
    }
    addContact(data){
        return API_TOKEN.post("contacto/enviar-solicitud", data)
    }

}
export default new CandidateService();
