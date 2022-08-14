import API from "../Auth/ApiAuth";
class AuthService {
    registrar(data){
        return API.post("reclutador/registrar", data);
    }
}
export default new AuthService();