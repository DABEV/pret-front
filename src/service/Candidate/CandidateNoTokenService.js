import API from "../Auth/ApiAuth";
class AuthService {
    registrar(data){
        return API.post("candidato/registrar", data);
    }
}
export default new AuthService();