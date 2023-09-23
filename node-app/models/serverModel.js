const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');

const urlBase = '/heroes-api/v1';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.APP_LOCAL_PORT || 3000;

        this.paths = {
            auth   : `${urlBase}/auth`,
            heroes : `${urlBase}/heroes`,
            users  : `${urlBase}/users`
        }

        //Conectar a db
        this.conectarDB();

        //middlewares
        this.middlewares();

        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }


    middlewares(){

        //CORS
        this.app.use( cors() );

        //lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( urlBase, express.static('public') );
    }


    routes(){
        this.app.use( this.paths.auth,   require('../routes/authRoute') );
        this.app.use( this.paths.heroes, require('../routes/heroesRoute') );
        this.app.use( this.paths.users,  require('../routes/usersRoute') );

    }


    listen(){
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en el puerto -', this.port);
        });
    }
}


module.exports = Server;
