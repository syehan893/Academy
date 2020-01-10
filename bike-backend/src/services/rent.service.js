import { getRepository } from 'typeorm';
import Rent from '../models/rent';

export default class rentService{
    itemRepository(){
        return getRepository(Rent);
    }

    findAll(){
        return this.itemRepository().find({relations : ['user','stand','bike']});
    }
    findOne(id){
        return this.itemRepository().findOne({where : {id}, relations : ['user','bike','stand']});
    }
    create(rentData){
        return this.itemRepository().save(rentData);
    }
    update(rentData){
        return this.itemRepository().save(rentData);
    }
    delete(id){
        return this.itemRepository().delete(id);
    }
}