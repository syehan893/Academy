import { getRepository } from 'typeorm';
import User from '../models/user';

export default class UserService{
    itemRepository(){
        return getRepository(User);
    }

    findAll(){
        return this.itemRepository().find();
    }
    findOne(id){
        return this.itemRepository().findOne(id);
    }
    create(userData){
        return this.itemRepository().save(userData);
    }
    update(userData){
        return this.itemRepository().save(userData);
    }
    delete(id){
        return this.itemRepository().delete(id);
    }
}