import { EntitySchema } from 'typeorm';
import Rent from '../../models/rent';

const rentSchema = new EntitySchema({
    name : 'Rent',
    target : Rent,
    tableName : 'rent',
    columns : {
        id : {
            type :'int',
            unique : true,
            generated : true,
            nullable : false,
            primary : true
        },
        startTime : {
            type : 'time',
            nullable : false
        },
        endTime : {
            type : 'time',
            nullable : false
        },
        price : {
            type : 'int',
            nullable : false
        },
        fromLocation : {
            type : 'varchar',
            length : 150,
            nullable : false
        },
        toLocation : {
            type : 'varchar',
            length : 150,
            nullable : false
        },
    },
    relations : {
        user : {
            target : 'User',
            type : 'many-to-one',
            JoinColumn : true,
            cascade : true,
        },
        bike : {
            target : 'Bike',
            type : 'many-to-one',
            JoinColumn : true,
            cascade : true,
        },
        stand : {
            target : 'Stand',
            type : 'many-to-one',
            JoinColumn : true,
            cascade : true,
        }
    }
});

export default rentSchema;
