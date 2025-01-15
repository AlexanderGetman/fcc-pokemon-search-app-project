const pokemonDB = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const userInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const display = document.getElementById("display");
const stats = document.getElementById("stats");
const sprite = document.getElementById("sprite");

display.style.display = "none";
stats.style.display = "none";

const fetchData = async (pokemon) => {
    try {
        const res = await fetch(`${pokemonDB}/${pokemon.toLowerCase()}`);
        const data = await res.json();
        displaySearchResults(data);
    } catch (err) {
        console.log(err);
        alert("Pokémon not found");
    }
};

const displaySearchResults = (data) => {
    const { height, id, name, sprites: { front_default },
    stats: { 
        0: { base_stat: hp },
        1: { base_stat: attack },
        2: { base_stat: defense },
        3: { base_stat: special_attack },
        4: { base_stat: special_defense },
        5: { base_stat: speed }
    }, types, weight } = data;

    display.style.display = "block";
    stats.style.display = "grid";

    const typeNames = types.map(item => item.type.name);
    const typeNamesSpans = typeNames.map(type => `<span class="type ${type}">${type}</span>`).join('');

    changeSpanText("pokemon-name", name);
    changeSpanText("pokemon-id", `#${id}`);
    changeSpanText("weight", `Weight: ${weight}`);
    changeSpanText("height", `Height: ${height}`);
    sprite.src = front_default;
    changeSpanText("hp", hp);
    changeSpanText("attack", attack);
    changeSpanText("special-attack", special_attack);
    changeSpanText("defense", defense);
    changeSpanText("special-defense", special_defense);
    changeSpanText("speed", speed);
    changeSpanText("types", typeNamesSpans);

}

const changeSpanText = (spanId, newText) => {
    const span = document.getElementById(spanId);
    if (span) {
        span.innerHTML = newText;
    }
}

searchButton.addEventListener("click", () => fetchData(userInput.value));
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchData(userInput.value)
    }
});