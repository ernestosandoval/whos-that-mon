import React, { useState, useEffect } from 'react';

export default function Pokemon({ pokemon }) {
    // Filter the flavor text entries to include only English entries
    const englishFlavorTextEntries = pokemon.flavor_text_entries.filter(
        entry => entry.language.name === "en"
    );

    // Access the random English flavor text entry and save it in state
    const [randomEnglishFlavorText] = useState(() => {
        const randomIndex = Math.floor(Math.random() * englishFlavorTextEntries.length);
        let flavorText = englishFlavorTextEntries[randomIndex].flavor_text;
        const pokemonName = pokemon.name;
        const pokemonNameRegex = new RegExp(pokemonName, 'gi');
        return flavorText.replace(pokemonNameRegex, "______");
    });

    // State to manage user input and result
    const [userInput, setUserInput] = useState("");
    const [result, setResult] = useState("");

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.toLowerCase() === pokemon.name.toLowerCase()) {
            setResult("Correct!");
        } else {
            setResult("Incorrect. Try again.");
        }
    };

    return (
        <div>
            <div>
                {randomEnglishFlavorText}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter the Pokémon name"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <p>{result}</p>
        </div>
    );
}