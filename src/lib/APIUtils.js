const pokemonAPIUrl = 'https://pokeapi.co/api/v2/pokemon/';

const headerOptions = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
};

export async function fetchAllPokemon() {
    try {
        const resp = await fetch(pokemonAPIUrl, headerOptions)
        var data = await resp.json();
        return data
    } catch (err) {
           return err;
    }
};

export async function fetchPokemonDetail(pokemonDetailUrl) {
    try {
        const resp = await fetch(pokemonDetailUrl, headerOptions)
        var data = await resp.json();
        return data
    } catch (err) {
           return err;
    }
};