// vetores para as estrelas de reviews
const estrelaCheia = './src/img/VectorCheio.png';
const estrelaVazia = './src/img/Vector.png';
////////

class app {

    static api = 'https://m2-kenzie-shop.herokuapp.com/products'

    static arrKShop;

    static async getProdutos(){
        
        await fetch(app.api)

            .then((response) => {

                return response.json()

            }).then((response) => {

                app.arrKShop = response.products
            })
    }
    
    static async postVitrine(array){

        let  newArray = await array

        const listaVitrini = document.getElementById('lista')

        listaVitrini.innerHTML = ''

        for(let i = 0; i < newArray.length; i++){

            //tratamento de number para do preço
            let numberPrice = Number(newArray[i].price.productPrice).toFixed(0)
            let numberPrice2 = Number(newArray[i].price.productPromotionPrice).toFixed(0)
            
            /* Extra. Estrelas de reviews */
            //objeto para atribuir as estrelas de reviews
            let stars = {
                s1: estrelaVazia,
                s2: estrelaVazia,
                s3: estrelaVazia,
                s4: estrelaVazia,
                s5: estrelaVazia
            }
            // LOOP que add quantas estrelas "cheias" tem no card
            for(let j = 1; j <= newArray[i].reviews; j++){

                stars[`s${j}`] = estrelaCheia
            }
            ////////

            //Sem promoção
            if(newArray[i].promotionStatus === false){

                listaVitrini.innerHTML += `
                
                <li> 
                    <img src = https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${newArray[i].id}/${newArray[i].imageUrl} id = 'imgProd'>
                    <div id = 'estrelas'><img src = ${stars.s1} id = 's1'>
                        <img src = ${stars.s2} id = 's2'><img src = ${stars.s3} id = 's3'>
                        <img src = ${stars.s4} id = 's4'><img src = ${stars.s5} id = 's5'></div>
                    <p id = 'nomeProduto'>${newArray[i].productName}</p>
                    <h4 class = 'priceFix'>R$ ${numberPrice},99</h4>
                    <button>Comprar</button>
                </li>
                ` 
            //Com promoção            
            }else{

                listaVitrini.innerHTML += `
                
                <li> 
                    <img src = https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${newArray[i].id}/${newArray[i].imageUrl} id = 'imgProd'>
                    <div id = 'estrelas'><img src = ${stars.s1} id = 's1'>
                        <img src = ${stars.s2} id = 's2'><img src = ${stars.s3} id = 's3'>
                        <img src = ${stars.s4} id = 's4'><img src = ${stars.s5} id = 's5'></div>
                    <p id = 'nomeProduto'>${newArray[i].productName}</p>
                    <h5 class = 'originalPrice'>De R$ ${numberPrice},99</h5>
                    <h4 class = 'price'>Por R$ ${numberPrice2},99</h4>
                    <button>Comprar</button>
                </li>
                ` 

            }

            // "Esvazia" todas as estrelas de reviews para proxima interação do LOOP
            stars = {
                s1: estrelaVazia,
                s2: estrelaVazia,
                s3: estrelaVazia,
                s4: estrelaVazia,
                s5: estrelaVazia
            }
 
        }

    }
}

// função que executa as duas funçôes estaticas da class "app", para criar vitrine.
async function chamaVitrine(){

    await app.getProdutos();

    app.postVitrine(app.arrKShop);
}
chamaVitrine()