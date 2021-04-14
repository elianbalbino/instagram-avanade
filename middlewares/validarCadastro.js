const { Usuario } = require('../models')
​
//validando um cadastro através do email
module.exports = async (request, response, next) => {

    let { nome, email, senha } = request.body;
    
    let users = await Usuario.findAll({ where: { nome, email, senha } });

    if (users.length) {
        response.status(400).json({ erro: "Email já cadastrado" })
        return;

    } else {

        if(!email) {
            response.status(400).json({erro: "Necessário informar email"});
        } else {

            if(!nome){
                response.status(400).json({erro:"Necessário informar nome"});
            } else {
                
                if(senha.length < 6 || senha.length > 12) {
                    response.status(400).json({erro: "Necessário senha ter entre 6 e 12 dígitos"});
                } else {

                    next();

                }
            }
        }

      
    }
​
}