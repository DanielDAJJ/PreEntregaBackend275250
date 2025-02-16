export default class Services{
    constructor(dao){
        this.dao = dao;
    }
    async getAll(){
        try {
            const response = await this.dao.getAll();
            if(!response) throw new Error("No hay respuesta");
            return response;
        } catch (error) {
            throw error;
        }
    }
    async create(obj){
        try {
            const response = await this.dao.create(obj);
            if(!response) throw new Error("Error al crear objeto");
            return response;
        } catch (error) {
            throw error;
        }
    }
    async update(id, obj){
        try {
            const response = await this.dao.update(id, obj);
            if(!response) throw new Error("No fue posible actualizar");
            return response;
        } catch (error) {
            throw error;
        }
    }
    async delete(id){
        try {
            const response = await this.dao.delete(id);
            if(!response) throw new Error("No fue posible eliminar");
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getById(id){
        try {
            const response = await this.dao.getById(id);
            if(!response) throw new Error("No se encontró el objeto");
            return response;
        } catch (error) {
            throw error;
        }
    }
}