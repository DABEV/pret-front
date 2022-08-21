
import API from "../NoTokenApi";

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
    
    listarBeneficios() {
        return API.get("beneficio/obtener", );
    }
}
export default new CatalogueService();