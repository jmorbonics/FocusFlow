// src/Game.jsx
import React, { useState, useEffect } from 'react';
import games from '../assets/embed.json';

function Game() {
    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        // Function to select a random game
        const getRandomGame = () => {
            const randomIndex = Math.floor(Math.random() * games.length);
            return games[randomIndex];
        };

        setSelectedGame(getRandomGame());
    }, []);

    if (!selectedGame) {
        return <div>Loading...</div>; // Show a loading state while the game is being selected
    }

    const { title, embed, image, tags, description } = selectedGame;

    return (
        <div className="game-embed">
            <h2>{title}</h2>
            <iframe src={embed} title={title} width="600" height="400" frameBorder="0" allowFullScreen></iframe>
            {/* <img src={image} alt={title} /> */}
            <p>{description}</p>
            {/* <p><strong>Tags:</strong> {tags}</p> */}
        </div>
    );
}

export default Game;