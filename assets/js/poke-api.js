/*
DESENVOLVEDOR: VBDOL.DEV
GITHUB: https://github.com/VBDOL
LINKEDIN: https://www.linkedin.com/in/victor-b-o-leme-dev
Alura: https://cursos.alura.com.br/user/vbdol-dev
DIO: https://www.dio.me/users/vbdol_dev

DATA: 26/10/2024
*/

const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height / 10; // Conversão para metros
    pokemon.weight = pokeDetail.weight / 10; // Conversão para kg
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name); // Abilities

    return pokemon;
}

pokeApi.getPokemonDetail = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => Promise.all(pokemons.map((pokemon) => pokeApi.getPokemonDetail(pokemon.url.split('/').slice(-2, -1)[0]))))
        .then((pokemonsDetails) => pokemonsDetails);
};