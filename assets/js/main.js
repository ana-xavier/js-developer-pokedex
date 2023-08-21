// Exercício DIO - Pokedex (Original: https://github.com/digitalinnovationone/js-developer-pokedex)
// Aluna: Ana Xavier
// Data: 21/08/2023 -->

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// --> Mostrar detalhes dos pokemons
function displayPokemonDetails(pokemon) {
    const pokemonDetails = document.getElementById('pokemonDetails');
    pokemonDetails.innerHTML = `
        <div class="detail">
            <h2>${pokemon.name}</h2>
            <p>Number: #${pokemon.number}</p>
            <p>Type(s): ${pokemon.types.join(', ')}</p>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    `;
}

// --> Atualizando o método 
function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        // --> evento que ao clicar em cada pokemon, chama o display
        const pokemonItems = document.querySelectorAll('.pokemon');
        pokemonItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const selectedPokemon = pokemons[index];
                displayPokemonDetails(selectedPokemon);
            });
        });
    });
}

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});

loadPokemonItems(offset, limit); 