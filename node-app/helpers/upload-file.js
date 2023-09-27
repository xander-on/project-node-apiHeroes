const path          = require('path');
const { v4:uuidv4 } = require('uuid');

const extensionesImg = ['png', 'jpg', 'jpeg', 'gif'];


const uploadFile = ( files, extensionesValidas=extensionesImg, carpeta='' ) => {

    return new Promise( ( resolve, reject ) => {

        // const { archivo } = files;
        if( !files ) return reject( `no hay archivos que cargar` );

        const archivos      = Object.values(files);
        const nombreCortado =  archivos[0].name.split('.');
        // const nombreCortado =  archivo.name.split('.');
        const extension     = nombreCortado[ nombreCortado.length - 1 ];

        if( !extensionesValidas.includes( extension) ){
            return reject( `La extension ${extension} no es permitida, solo: ${extensionesValidas}`)
        }

        const tempName   = uuidv4()+'.'+extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, tempName );

        archivos[0].mv( uploadPath, (err)=>{
            if( err ) reject( err );
            resolve( tempName );
        });
    });
}


module.exports = {
    uploadFile
}
