const btnBuscar = document.querySelector("#btn-buscar");
const nombrePokemonInput = document.querySelector("#nombre-pokemon-input");
const cardPokemon = document.querySelector("#card-pokemon-grande");
const imgPokemon = document.querySelector("#img-pokemon");
const infoPokemon = document.querySelector("#info-pokemon");
const nombrePokemon = document.querySelector("#nombre-pokemon")
const caracteristicasPokemon = document.querySelector("#caracteristicas-pokemon");
const pieCard = document.querySelector("#pie-card");
const pokemonCardModal = document.querySelector("#pokemon-card-modal");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const cardsContainer = document.querySelector("#cards-container");
const spinner = document.querySelector("#spinner");
const URL = "http://pokeapi.co/api/v2/pokemon";

let offset = 1; //arranca en el 1er pokemon
let limit = 11; //trae 12 pokemones. El offset + 11 mas

cargarPokemones(offset,limit);

previous.addEventListener("click", () => {
    if(offset != 1){
        offset -= 12;    
        removeChildNodes(pokemonContainer);
        cargarPokemones(offset,limit);
    }
});

next.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContainer); 
    cargarPokemones(offset,limit)
});

btnBuscar.onclick = ()=>{    
    console.log("btnBuscar clickeado");
    mostrarCardPokemonGrande();       
};

function cargarPokemones (offest, limit){
    spinner.style.display = "block";
    for (let i=offset; i<=offset + limit; i++){
        cargarPokemon(i);
    }
}

function cargarPokemon (id) {
    fetch (`${URL}/${id}`)
        .then(respuesta => respuesta.json())
        .then (respuestaJSON => crearCardChica(respuestaJSON));
        spinner.style.display = "none";
}

function crearCardChica (pokemon){

    const flipCard = document.createElement ("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const cardPokemonChica = document.createElement ("div");
    cardPokemonChica.classList.add("pokemon-card-chica");

    const contenedorImagen = document.createElement("div");
    contenedorImagen.classList.add("img-container");

    const imagen = document.createElement("img");
    imagen.src = pokemon.sprites.front_default;

    contenedorImagen.appendChild(imagen);

    const numero = document.createElement("p");

    //Con el # indicamos que es un numero. Para que aparezcan 0 antes del num, hay que pasarlo a string y luego 
    //pad.Start que agrega 0 al ppio (en este caso 2 ceros).
    numero.textContent = `${pokemon.id.toString().padStart(3,0)}`;

    const nombre = document.createElement("p");
    nombre.classList.add("nombre");
    nombre.textContent = pokemon.name;

    cardPokemonChica.appendChild(contenedorImagen);
    cardPokemonChica.appendChild(numero);
    cardPokemonChica.appendChild(nombre);

    const cardPokemonChicaBack = document.createElement("div");
    cardPokemonChicaBack.classList.add("pokemon-card-chica-back"); 

    const listaCaracteristicas = document.createElement("ul");
    listaCaracteristicas.classList.add("lista-caracteristicas");
    
    const altura = document.createElement("li");
    altura.textContent = `Altura: ${pokemon.height}`;
    listaCaracteristicas.appendChild(altura);

    const peso = document.createElement("li");
    peso.textContent = `Peso: ${pokemon.weight}`;
    listaCaracteristicas.appendChild(peso);

    const experiencia = document.createElement("li");
    experiencia.textContent = `Experiencia: ${pokemon.base_experience}`;
    listaCaracteristicas.appendChild(experiencia);

    const orden = document.createElement("li");
    orden.textContent = `Orden: ${pokemon.order}`;
    listaCaracteristicas.appendChild(orden);

    cardPokemonChicaBack.appendChild(listaCaracteristicas);
    cardContainer.appendChild(cardPokemonChica);
    cardContainer.appendChild(cardPokemonChicaBack);  
    cardsContainer.appendChild(flipCard);
}

function removeChildNodes (parent) {
    while (parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

function mostrarCardPokemonGrande (){
    console.log(nombrePokemonInput.value.toLowerCase());
    fetch (`${URL}/${nombrePokemonInput.value.toLowerCase()}`).
    then(respuesta => respuesta.json()).
    then(respuestaJSON => {
        imgPokemon.src = respuestaJSON.sprites.front_default;        
        //caracteristicasPokemon.textContent = "";        
        nombrePokemon.textContent = nombrePokemonInput.value;                

        //Para mostrar toda la info dentro de la rta haria esto:
        // Object.keys(respuestaJSON).forEach(caracteristica => {
        //     console.log(JSON.stringify(respuestaJSON[caracteristica]));            
        //     caracteristicasPokemon.append($(`<li class="negrita mt-2">${caracteristica}: </li>`));
        //     caracteristicasPokemon.append($(`<li>${JSON.stringify(respuestaJSON[caracteristica])}</li>`));            
        // }); 

        //Para mostrar solo las caracteristicas que quiero:
        const id = document.createElement ("li");
        id.textContent = `ID: ${respuestaJSON.id}`;
        caracteristicasPokemon.appendChild(id);
        console.log(id);

        const experiencia = document.createElement ("li");
        experiencia.textContent = `Experiencia: ${respuestaJSON.base_experience}`;
        caracteristicasPokemon.appendChild(experiencia);
        console.log(experiencia);

        const altura = document.createElement ("li");
        altura.textContent = `Altura: ${respuestaJSON.height}`;
        caracteristicasPokemon.appendChild(altura);
        console.log(altura);

        const peso = document.createElement ("li");
        peso.textContent = `Peso: ${respuestaJSON.weight}`;
        caracteristicasPokemon.appendChild(peso);
        console.log(peso);

        
        const orden = document.createElement ("li");
        orden.textContent = `Orden: ${respuestaJSON.order}`;
        caracteristicasPokemon.appendChild(orden);
        console.log(orden);
     
        pieCard.classList.add("visible");
        console.log("holu1");
        console.log(pokemonCardModal);
        console.log("holu2");
        $('#pokemon-card-modal').modal("show"); 
        console.log("holu3");
    }).    
    catch (error => mostrarCardError ());
}

function mostrarCardError (){
    alert("Pokemon no encontrado");               
}