/* *****************************************************************************
* Objetivo: Arquivo responsável por criar funções de pesquisa sobre os produtos 
* Data: 15/05/2026  
* Autor: may
* ******************************************************************************/

let produtosJSON = require('../model/dados_cosmeticos.js')
//função que retorna uma lista com os produtos encontrados pelo campo de pesquisa  
const getPesquisarProdutos = function (pesquisaUsuario) {

    let lista = produtosJSON.produtos
    let pesquisa = String(pesquisaUsuario).toLowerCase()
    let status = false
    let produtosEncontrados = []
    let resultado = {}

    lista.forEach(function (produto) {

        let brand = String(produto.brand).toLowerCase()
        let name = String(produto.name).toLowerCase()
        let price = String(produto.price).toLowerCase()
        let description = String(produto.description).toLowerCase()
        let category = String(produto.category).toLowerCase()
        let product_type = String(produto.product_type).toLowerCase()
        //está variável é para verificar se a tag no array de tags foi encontrada
        let encontrouTag = false

        produto.tag_list.forEach(function (tags) {

            let tag = String(tags).toLowerCase()
            //aqui realiza a validação se a tag foi encontrada com base na pesquisa 
            if (tag.includes(pesquisa)) {
                encontrouTag = true
            }

        })

        if (
            brand.includes(pesquisa) ||
            name.includes(pesquisa) ||
            price.includes(pesquisa) ||
            description.includes(pesquisa) ||
            category.includes(pesquisa) ||
            product_type.includes(pesquisa) ||
            encontrouTag
        ) {

            let listaDeProduto = {
                brand: produto.brand,
                name: produto.name,
                price: produto.price,
                description: produto.description,
                category: produto.category,
                product_type: produto.product_type,
                tag_list: produto.tag_list,
                image_link: produto.image_link
            }

            produtosEncontrados.push(listaDeProduto)
            status = true
        }

    })

    if (!status) {
        return false
    } else {
        resultado.quantidade = produtosEncontrados.length
        resultado.produtos = produtosEncontrados

        return resultado
    }
}

module.exports = {
    getPesquisarProdutos
}