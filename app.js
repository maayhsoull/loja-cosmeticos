/************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Loja de Cosméticos
 * Data: 15/05/2026
 * Autor: May
 * Versão: 1.0
 * **********************************************************************************/

//Import das dependencias para criar a API 
const express = require('express')
const cors = require('cors')

//criando um obj para manipular o express
const app = express()

//conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'], //origem da requisição, podendo ser um ip ou um * que significa todos
    methods: 'GET', //methods são os verbos que serão liberados na API (GET, POST, PUT, DELETE)
    allowedHeaders: ['Content-Type', 'Autorization'] //permissoes do cabeçalho do CORS
}

//configura as permissoes da API atraves do CORS 
app.use(cors(corsOptions))

const funcoes = require('./BACKEND/controller/funcoes.js')

app.get('/v1/senai/loja/cosmeticos/pesquisa', function (request, response) {
    let busca = request.query.busca
    let dados = funcoes.getPesquisarProdutos(busca)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ "message": "O produto informado não foi encontrado" })
    }
})

//serve para inicializar a API para receber requisições 
app.listen(8080, function () {
    console.log('API funcionando e aguardando novas requisisções...')
})