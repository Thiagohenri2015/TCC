const Usuario = require('../model/Usuario');

module.exports = class UsuarioMiddleware {

    // UsuarioMiddleware.js
validar_CamposUsuario(request, response, next) {

    console.log("Request body:", request.body);
    console.log("TipoUsuario recebido:", request.body.usuario?.tipoUsuario);
    // Aqui desestruturamos o 'usuario' de dentro do request.body
    const { usuario } = request.body;

    // Caso 'usuario' seja undefined, definimos {} para evitar erro
    const { nomeUsuario, email, cpf, senha, tipoUsuario } = usuario || {};

    if (!nomeUsuario || nomeUsuario.length < 3) {
        return response.status(200).send({
            status: false,
            msg: "O nome do usuário deve ter pelo menos 3 caracteres"
        });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regexEmail.test(email)) {
        return response.status(200).send({
            status: false,
            msg: "O e-mail fornecido é inválido"
        });
    }

    const regexCPF = /^\d{11}$/;
    if (!cpf || !regexCPF.test(cpf)) {
        return response.status(200).send({
            status: false,
            msg: "O CPF deve conter exatamente 11 números"
        });
    }

    if (!senha || senha.length < 6) {
        return response.status(200).send({
            status: false,
            msg: "A senha deve ter pelo menos 6 caracteres"
        });
    }

    if (!tipoUsuario || !tipoUsuario.idTblTipoUsuarios) {
        return response.status(200).send({
            status: false,
            msg: "Selecione um tipo de usuário válido"
        });
    }

    next();
}



    async existe_EmailCadastrado(request, response, next) {
    const { email } = request.body;

    const usuario = new Usuario();
    usuario.email = email;

    const existe = await usuario.isEmailCadastrado();

    if (existe === true) {
        return response.status(200).send({
            status: false,
            msg: "Já existe um usuário cadastrado com esse e-mail"
        });
    }

    next();
}

}
