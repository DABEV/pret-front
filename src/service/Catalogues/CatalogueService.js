import API from "../NoTokenApi";

class CatalogueService {
    listarEstados() {
        return API.get("estado-republica/obtener", );
    }
    listarUniversidades() {
        return API.get("universidad/obtener", );
    }
}
export default new CatalogueService();