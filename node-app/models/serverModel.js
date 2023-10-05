const express   = require('express');
const cors       = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');


const urlBase = '/heroes-api/v1';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.APP_LOCAL_PORT || 3000;

        this.paths = {
            auth       : `${urlBase}/auth`,
            heroes     : `${urlBase}/heroes`,
            users      : `${urlBase}/users`,
            publishers : `${urlBase}/publishers`,
            searchs    : `${urlBase}/searchs`,
            uploads    : `${urlBase}/uploads`
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

        this.app.use( fileUpload({
            useTempFiles    :true,
            tempFileDir     : '/tmp/',
            createParentPath: true
        }))
    }


    routes(){
        this.app.use( this.paths.auth,       require('../routes/authRoute') );
        this.app.use( this.paths.heroes,     require('../routes/heroesRoute') );
        this.app.use( this.paths.users,      require('../routes/usersRoute') );
        this.app.use( this.paths.publishers, require('../routes/publishersRoute') );


        //todo search
        this.app.use( this.paths.searchs, require('../routes/searchsRoute') );
        this.app.use( this.paths.uploads, require('../routes/uploadsRoute'));
    }


    listen(){
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en el puerto -', this.port);
        });
    }
}


module.exports = Server;
