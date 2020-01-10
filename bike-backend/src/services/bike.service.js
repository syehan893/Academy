import { getRepository } from 'typeorm';
import Bike from '../models/bike';

export default class BikeService{
    itemRepository(){
        return getRepository(Bike);
    }

    findAll(){
        return this.itemRepository().find();
    }
    findOne(id){
        return this.itemRepository().findOne(id);
    }
    create(bikeData){
        return this.itemRepository().save(bikeData);
    }
    update(bikeData){
        return this.itemRepository().save(bikeData);
    }
    delete(id){
        return this.itemRepository().delete(id);
    }
}