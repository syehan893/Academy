import Hapi from '@hapi/hapi';
import configure from "./config";
import routes from "./routes";
import createConnection from './db/connection';

process.on('unhandledRejection', (err)=>{
  console.log(err);
  process.exit(1);
});

export default async () => {
    configure();
  const connection = await createConnection();
  const server = Hapi.server({
      port : process.env.APP_PORT,
      host : process.env.APP_HOST,
  });

  server.route(routes);

    if(connection.isConnected){
    await server.start();
    console.log(`Database connectio name ${connection.name}`)
    console.log('Server',process.env.APP_NAME, 'running on %s', server.info.uri);
}

return server.listener;
};