//Aqui seleccionamos todos los data que usamos en el index
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

// const btn-document.querySelector('button');
// const body-document.querySelector('body');

//Le pondremos Colores dependiendo del tipo de pokemon

const typeColors = {
	electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    fairy: '#B09398',
    poison: '#E333FF',
    default: '#2A1A1F',

};

//Crear funcion de busqueda de pokemon
/* const searchPokemon = event => {

 	//Se hace el prevent para que se cancele el submit del form para que no se recargue la pagina
 	event.preventDefault();

    //Del event que mandamos se tiene un input con el nombre de pokemon, cuando
    //se tenga un valor en el input vamos a obtener el value
 	const {value}= event.target.pokemon;

 	//En el fetch se usa la api que vamos a utilizar y el tolowercase para que no 
 	//importe cómo el usuario ingrese el nombre del pokemon
 	fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
 		.then(data => data.json())
 		//Esta funcion es para enviar el response
 		.then(response => renderPokemonData(response))
 }*/

 const randomPokemon = event =>{
 	event.preventDefault();
 	//Let random para dar un pokemon al azar del 0 al 969
 	let random = Math.floor(Math.random()*969);
 	//En el fetch se usa la api que vamos a utilizar
 	fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)
 		.then(data => data.json())
 		//Esta funcion es para enviar el response
 		.then(response => renderPokemonData(response))
 }

//
 const renderPokemonData = data => {
 	//aquí obtenemos de la data los sprites y para mostrar la información del Pokemon
 	//La informacion son los stats y los typos
 	const sprite = data.sprites.front_default;
 	const {stats, types} = data;

 	//Al pokeName es ponerle al nombre que saca de la data
 	pokeName.textContent = data.name;
 	//pokeImg se deja el atributo src y se manda a llamar el sprite de arriba
 	pokeImg.setAttribute ('src', sprite);
 	//Le vamos a poner el id del pokemon
 	pokeId.textContent=`Nº${data.id}`;

 	//Funcion en donde estara el color de fondo y los estilos
 	setCardColor(types)
 	//Funcion en donde se agregan los tipos de pokemon y sus etilos
 	renderPokemonTypes(types);
 	//Funcion en donde se agregan los stats del pokemon o informacion del pokemon
 	renderPokemonStats(stats);
 	console.log(data);
 }

 //creacion de la funcion que recibira el parametro de types
 const setCardColor = types => {

 	//creacion de dos colores.
 	//color 1 busca en la funcion typecolors y toma el primer type junto con el nombre y el color
 	const colorOne = typeColors[types[0].type.name];

 	//color dos, si hay un segundo color se hace lo mismo que en el primer color,
 	//sino hay segundo color se pone uno por defecto que es el negro
 	const colorTwo = types[1] ? typeColors[types[1].type.name]: typeColors.default;

 	//vamos a dale un estilo en la imagen que el color dos son pelotitas 
 	//con radial-gradient con 33% 
 	//y el color uno da el color de fondo con 33%
 	pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
 	pokeImg.style.backgroundSize = '5px 5px';
 }

 //Creación de la función de los tipos de pokemon

 const renderPokemonTypes = types => {

 	//Aquí cada vez que se ingrese un nuevo pokemon va a borrar los datos del 
 	//anterior, de igual manera si el pokemon tiene solo un color solo pondra uno
 	//si tiene dos colores pondrá los dos.
 	pokeTypes.innerHTML = '';
 	types.forEach(type => {

 		//Elemento en donde aparecera el tipo de pokemon
 		// y para darle el color al texto en donde va a ir el tipo de pokemon
 		const typeTextElement = document.createElement("div");
 		typeTextElement.style.color = typeColors[type.type.name];
 		typeTextElement.textContent = type.type.name;
 		pokeTypes.appendChild(typeTextElement);
 	});
 }

 //Creación de la funcion de los stats eh información del pokemon
 const renderPokemonStats = stats => {
 	//Cada vez que se ingrese un nuevo pokemon borrara los datos del anterior
 	// y pondra los stats del pokemon 
 	pokeStats.innerHTML='';

 	//Muestra de los stats
 	stats.forEach(stat => {
 		const statElement = document.createElement("div");
 		//Elementos que tenemos en los stats
 		const statElementName = document.createElement("div");
 		const statElementAmount = document.createElement("div");

 		//Aquí se mandan a llamar los datos que hay desde la ápi
 		statElementName.textContent = stat.stat.name;
 		statElementAmount.textContent = stat.base_stat;

 		//estos son para agregar los dos elementos que se crearon que son
 		// statElementName y statElementAmount
 		statElement.appendChild(statElementName);
 		statElement.appendChild(statElementAmount);

 		//Agregamos las pokestats para mostrar todos los elementos
 		pokeStats.appendChild(statElement);
 	});

 }	