import { EntitySchema } from 'typeorm';
import User from '../../models/user';

const userSchema = new EntitySchema({
    name : 'User',
    target : User,
    tableName :'user',
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
        username : {
            type : 'varchar',
            length : 150,
            nullable : false
        },
        password : {
            type : 'varchar',
            length : 150,
            nullable : false
        },
        saldo : {
            type : 'int',
            nullable : false
        },
    },
    relations : {
        rent : {
            target : 'Rent',
            type : 'one-to-many',
            inverseSide : 'user',
            JoinColumn : true,
        }
    }
});

export default userSchema;