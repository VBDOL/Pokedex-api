/*
DESENVOLVEDOR: VBDOL.DEV
GITHUB: https://github.com/VBDOL
LINKEDIN: https://www.linkedin.com/in/victor-b-o-leme-dev
Alura: https://cursos.alura.com.br/user/vbdol-dev
DIO: https://www.dio.me/users/vbdol_dev

DATA: 26/10/2024
*/


const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonModal = document.getElementById('pokemonModal');
const closeModalButton = document.querySelector('.close-button');
const pokemonName = document.getElementById('pokemonName');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonDetails = document.getElementById('pokemonDetails');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // Adiciona evento de clique a cada card de Pokémon
        document.querySelectorAll('.pokemon').forEach(item => {
            item.addEventListener('click', (event) => {
                const pokemonNumber = event.currentTarget.getAttribute('data-id');
                openModal(pokemonNumber);
            });
        });
    });
}

function openModal(pokemonNumber) {
    pokeApi.getPokemonDetail(pokemonNumber).then(details => {
        pokemonName.innerText = details.name;
        pokemonImage.src = details.photo;
        pokemonDetails.innerHTML = `
            <p><strong>Species:</strong> ${details.species}</p>
            <p><strong>Height:</strong> ${details.height}m</p>
            <p><strong>Weight:</strong> ${details.weight}kg</p>
            <p><strong>Abilities:</strong> ${details.abilities.join(', ')}</p>
            <p><strong>Types:</strong> ${details.types.join(', ')}</p>
        `;
        const modalHeader = document.getElementById('modalHeader');
        modalHeader.className = `modal-header ${details.type}`; // Adiciona a classe correspondente ao tipo do Pokémon
        pokemonModal.style.display = 'block';
    });
}

function closeModal() {
    pokemonModal.style.display = 'none';
}

closeModalButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target == pokemonModal) {
        closeModal();
    }
});

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;
    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});