import { EntitySchema } from 'typeorm';
import Stand from '../../models/stand';

const standSchema = new EntitySchema({
    name : 'Stand',
    target : Stand,
    tableName : 'stand',
    columns : {
        id : {
            type : 'int',
            unique : true,
            generated : true,
            nullable : false,
            primary : true
        },
        name : {
            type : 'varchar',
            length : 150,
            nullable : false
        },
        location : {
            type : 'varchar',
            length : 150,
            nullable : false
        },
        status : {
            type : 'varchar',
            length : 150,
            nullable : false
        }
    },
    relations : {
        rent : {
            target : 'Rent',
            type : 'one-to-many',
            inverseSide : 'stand',
            JoinColumn : true,
        }
    }
});

export default standSchema;