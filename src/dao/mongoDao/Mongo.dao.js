export default class MongoDao{
    constructor(model){
        this.model = model;
    }
    async getAll(){
        try {
            console.log(`items de ${JSON.stringify(this.model)} encontrados`);
            return await this.model.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async create(obj){
        try {
            console.log(`Creando nuevo item en ${JSON.stringify(this.model)}`);
            return await this.model.create(obj);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getById(id){
        try {
            console.log(`Item de ${JSON.stringify(this.model)} con id ${id} encontrado`);
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async update(id, obj){
        try {
            console.log(`Item de ${JSON.stringify(this.model)} con id ${id} actualizado`);
            return await this.model.findByIdAndUpdate(id, obj, {new: true});
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async delete(id){
        try {
            console.log(`Item de ${JSON.stringify(this.model)} con id ${id} eliminado`);
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}