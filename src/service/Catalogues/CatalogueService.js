import API from "../Auth/ApiAuth";

class CatalogueService {
    listarEstados() {
        return API.get("estado-republica/obtener", );
    }
    listarUniversidades() {
        return API.get("universidad/obtener", );
    }
    listarPuestos() {
        return API.get("puesto/obtener", );
    }
}
export default new CatalogueService();