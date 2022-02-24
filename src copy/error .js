const {Pokemon} = require('../../api/src/db.js');
async function nombreRepetido(name) {

    const existe = await Pokemon.findAll({
        where: {
            name: name
        }
    })
    if(existe.length >0 ){
        return existe
    }
}

module.exports = {
    nombreRepetido
}
    
