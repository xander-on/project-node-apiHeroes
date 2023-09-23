const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };

        const jwtCallback = (err, token) =>{
            if( err ){
                console.log(err),
                reject('No se pudo generar el token')
            }else{
                resolve( token );
            }
        }

        jwt.sign( payload, process.env.SECRETORPUBLICKEY, {
            expiresIn:'1h'
        }, jwtCallback);
    });


}


module.exports = {
    generarJWT
}
