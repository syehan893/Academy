import dotenv from 'dotenv';
import { dirname, resolve, join } from 'path';

export default function confiure() {
    if(process.env.NODE_ENV == 'test'){
        dotenv.config({path : resolve('test.env')});
    }else {
        dotenv.config();
    }

    if (!process.env.APP_NAME){
        console.error(`Environment file (.env) cannot be found in te root folder`);
        process.exit(1);
    }
    process.env.BASE_PATH = dirname(resolve(`api.js`));
}