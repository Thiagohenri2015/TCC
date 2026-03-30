// Importa o modelo TipoUsuario para verificar se o nome já existe no banco de dados.
const TipoUsuario = require('../model/TipoUsuario');

// Exporta a classe TipoUsuarioMiddleware, que contém funções de validação para as requisições.
module.exports = class TipoUsuarioMiddleware {
    // Método para validar o nome do tipo de usuário antes de prosseguir com a criação ou atualização.
    validar_NomeTipoUsuario(request, response, next) {
        // Recupera o nome do tipo de usuário enviado no corpo da requisição (request body).
        const nomeTipoUsuario = request.body.tipoUsuario.nomeTipoUsuario;

        // Verifica se o nome do tipo de usuário tem menos de 3 caracteres.
        if (nomeTipoUsuario.length < 3) {
            // Se o nome for inválido, cria um objeto de resposta com o status falso e a mensagem de erro.
            const objResposta = {
                status: false,
                msg: "O nome deve ter mais do que 3 letras"
            };
            // Envia a resposta com status HTTP 200 e a mensagem de erro.
            response.status(200).send(objResposta);
        } else {
            // Caso o nome seja válido, chama o próximo middleware ou a rota definida.
            next(); // Chama o próximo middleware ou rota
        }
    }

    // Método assíncrono para verificar se já existe um tipo de usuário com o mesmo nome cadastrado.
    async existe_NomeTipoUsuario_cadastrado(request, response, next) {
        // Recupera o nome do tipo de usuário enviado no corpo da requisição (request body).
        const nomeTipoUsuario = request.body.tipoUsuario.nomeTipoUsuario;

        // Cria uma nova instância do modelo TipoUsuario.
        const objTipoUsuario = new TipoUsuario();
        // Define o nome do tipo de usuário na instância do modelo.
        objTipoUsuario._nomeTipoUsuario = nomeTipoUsuario;

        // Verifica se o tipo de usuário já existe no banco de dados chamando o método isTipoUsuario().
        const tipoUsuarioExiste = await objTipoUsuario.isTipoUsuario();

        // Se o tipo de usuário já existir no banco de dados, cria um objeto de resposta com o status falso e uma mensagem de erro.
        if (tipoUsuarioExiste === true) {
            const objResposta = {
                status: false,
                msg: "Não é possível cadastrar um tipo de usuário com o mesmo nome de um já existente"
            };
            // Envia a resposta com status HTTP 200 e a mensagem de erro.
            response.status(200).send(objResposta);
        } else {
            // Caso o nome do tipo de usuário seja único, chama o próximo middleware ou rota.
            next(); // Chama o próximo middleware ou rota
        }
    }
}
