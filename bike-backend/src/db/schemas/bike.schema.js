import { EntitySchema } from 'typeorm';
import Bike from '../../models/bike';

const bikeSchema = new EntitySchema({
    name : 'Bike',
    target : Bike,
    tableName : 'bike',
    columns : {
        id :{
            type : 'int',
            unique : true,
            generated : true,
            nullable : false,
            primary : true
        },
        name :{
            type : 'varchar',
            length : 150,
            nullable : false
        },
        code : {
            type : 'varchar',
            length : 150,
            nullable : false
        },
        status : {
            type : 'varchar',
            length : 150,
            nullable : false
        },
        price : {
            type : 'int',
            nullable :false
        },
        location : {
            type : 'varchar',
            length : 150,
            nullable : false
        }
    },
    relations : {
        rent : {
            target : 'Rent',
            type : 'one-to-many',
            inverseSide : 'bike',
            JoinColumn : true,
        }
    }
});

export default bikeSchema;