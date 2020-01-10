import { createConnection as connect } from 'typeorm';
import entities from './entities';

const createConnection = async () => {
    const connection = await connect({
        type : 'mysql',
        host : 'localhost',
        username : 'root',
        password : '',
        database : 'bike',
        synchronize : true,
        logging : false,
        entities : Object.values(entities),
    });
    return connection;
}

export default createConnection;
