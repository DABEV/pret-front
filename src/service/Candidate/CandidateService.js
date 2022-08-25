import API from "../NoTokenApi";
import API_TOKEN from "../TokenApi";
class CandidateService {
  getProfile() {
    return API_TOKEN.get("candidato/perfil");
  }

  updateProfile(candidato) {
    return API_TOKEN.post("candidato/actualizar", candidato);
  }

  registrar(data) {
    return API.post("candidato/registrar", data);
  }

  updatePhoto(foto) {
    return API_TOKEN.post("candidato/actualizar-foto", foto);
  }

  addLanguage(data) {
    return API_TOKEN.post("idioma-candidato/registrar", data);
  }

  listarAmigos() {
    return API_TOKEN.get("contacto/lista-amigos");
  }

  applyVancy(data) {
    return API_TOKEN.post("postulacion/registrar", data);
  }

  listarPostulaciones() {
    return API_TOKEN.get("postulacion/obtener/candidato");
  }

  getByEmail(email) {
    return API_TOKEN.post("candidato/get-id-by-email", email);
  }

  addCertificate(data) {
    return API_TOKEN.post("certificacion/registrar", data);
  }

  addCourse(data) {
    return API_TOKEN.post("curso/registrar", data);
  }
}
export default new CandidateService();
