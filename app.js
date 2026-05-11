'use strict'

//cria um array de produtos
let produtos = []

//utilizao query selector ao inves de getelementbyid pq usei classe no hmtl ao invés de id
const inputPesquisar = document.querySelector('.input-pesquisar')
const botaoPesquisar = document.querySelector('.img-pesquisar')
const containerProdutos = document.querySelector('.produtos')


//função para carregar dados da api 
async function carregarProdutos() {
    const resposta = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json")
    const dados = await resposta.json()

    produtos = dados

    // console.log(produtos)

}

//função que cria o card com o produto
function criarCard(produto) {

    //cria uma imagem para poder testar se a imagem que chega da api é válida
    const imagemProduto = new Image()

    imagemProduto.src = produto.image_link // aqui recebe a imagem da api

    //o onload serve para carregamento, isto é nesse contexto espera a imagem carregar para verificar se exite antes 
    //de crar o card
    imagemProduto.onload = function () {

        const card = document.createElement('div')
        card.className = 'card-produtos'

        const imagem = document.createElement('img')
        imagem.src = produto.image_link
        imagem.alt = produto.name

        const texto = document.createElement('p')
        texto.className = 'texto-produtos'

        const nomeProduto = document.createElement('span')
        nomeProduto.textContent = produto.name
        nomeProduto.style.fontWeight = 'bold'

        const preco = document.createElement('span')
        preco.textContent = produto.price

        const botao = document.createElement('button')
        botao.className = 'botao-adicionar'

        const textoBotao = document.createElement('span')
        textoBotao.textContent = 'ADICIONAR'
        textoBotao.style.fontWeight = 'bold'

        const carrinho = document.createElement('img')
        carrinho.src = './img/carrinho.png'
        carrinho.alt = 'carrinho'

        botao.appendChild(textoBotao)
        botao.appendChild(carrinho)

        texto.appendChild(nomeProduto)
        texto.appendChild(preco)

        card.appendChild(imagem)
        card.appendChild(texto)
        card.appendChild(botao)

        containerProdutos.appendChild(card)
    }
}

//função criada para traduzir a pesquisa em ingles e realizar a busca na api.
//utilizando consulta em api
async function tradutor(palavra) {

    const resposta = await fetch(`https://api.mymemory.translated.net/get?q=${palavra}&langpair=pt|en`)

    const dados = await resposta.json()

    return dados.responseData.translatedText.toLowerCase()
}

//função que busca o produto na api com base em uma palavra de pesquisa
async function buscarProduto() {

    //usa o campo de pesquisa do html 
    const pesquisa = inputPesquisar.value.toLowerCase()

    //consulta a palavra da pesquisa no tradutor pois a api inteira é em ingles 
    const pesquisaEmIngles = await tradutor(pesquisa)

    //variável para verificar se o produto foi encontrado 
    let produtoEncontrado = false

    //limpa a div de produtos, neste caso limpa os produtos anteriores para uma nova pesquisa
    containerProdutos.textContent = ''

    //percorre os produtos da api e verifica quais irão aparecer na pesquisa 
    produtos.forEach(function (produto) {

        //verifica se o produto possui imagem, caso não, não aparece na pesquisa
        if (produto.image_link != '' &&
            (
                //verifica se o texto pesquisado existe no nome e no tipo de produto 
                produto.name.toLowerCase().includes(pesquisaEmIngles) ||
                produto.product_type.toLowerCase().includes(pesquisaEmIngles)
            )
        ) {
            //caso encontre o produto ele cria o card 
            produtoEncontrado = true
            criarCard(produto)
        }
    })

    //se não encontrar o produto ele mostra uma msg na tela informando que não foi encontrado
    if (!produtoEncontrado) {
        const mensagem = document.createElement('p')
        mensagem.className = 'nao-encontrado'
        mensagem.textContent = 'Nenhum produto encontrado.'
        containerProdutos.appendChild(mensagem)
    }
}

botaoPesquisar.addEventListener('click', buscarProduto)

carregarProdutos()
