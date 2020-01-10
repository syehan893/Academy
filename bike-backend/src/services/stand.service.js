import { getRepository } from 'typeorm';
import Stand from '../models/stand';

export default class StandService{
    itemRepository(){
        return getRepository(Stand);
    }
    findAll(){
        return this.itemRepository().find()
    }
    findOne(id){
        return this.itemRepository().findOne(id);
    }
    create(standData){
        return this.itemRepository().save(standData);
    }
    update(standData){
        return this.itemRepository().save(standData);
    }
    delete(id){
        return this.itemRepository().delete(id);
    }
}