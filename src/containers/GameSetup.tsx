import React, { useEffect, useState } from 'react'
import Game from './Game'
import Menu from './Menu';
import Results from './Results';

export type GameState = { mode: "Menu" } | { mode: "Waiting", endTimestamp: number } | { mode: "Playing", endTimestamp: number } | { mode: "Results" };
export type GameText = { name: string, text: string[], source: string, difficulty: number };
export type GameProperties = { gameMode: "Quick" | "Random", gameLength: number, gameText: GameText, difficulty: "Easy" | "Medium" | "Hard" };
export type GameStats = { mistakes: number, wordsCompleted: number, lettersCompleted: number };

const GameSetup = () => {

    const [gameState, setGameState] = useState<GameState>({ mode: "Menu" });

    // Current game
    const [gameProperties, setGameProperties] = useState<GameProperties>(
        { gameLength: 0, gameText: { name: "", source: "", difficulty: 0, text: [] }, gameMode: "Quick", difficulty: "Medium" }
    );
    const [sentenceIndex, setSentenceIndex] = useState(0);

    // Stats
    const [gameStats, setGameStats] = useState<GameStats>({ mistakes: 0, wordsCompleted: 0, lettersCompleted: 0 });

    const handleFinishedSentence = () => {
        if (sentenceIndex == gameProperties.gameText.text.length - 1) {
            setGameState({ mode: "Results" });
        } else {
            setSentenceIndex(sentenceIndex + 1);
        }
    }

    const handleStartQuickGame = () => {
        resetStats();
        setGameProperties((prevState) => ({ ...prevState, gameLength: 60 }));
        setGameState({ mode: "Waiting", endTimestamp: (Date.now() + 3000) });
    }

    const setGameText = (val: GameText) => {
        setGameProperties((prevState) => ({ ...prevState, gameText: val }));
    }

    const resetStats = () => {
        setGameStats({ mistakes: 0, lettersCompleted: 0, wordsCompleted: 0 });
    }

    useEffect(() => {
        const loop = setInterval(() => {
            if (gameState.mode == "Waiting") {
                if (Date.now() >= gameState.endTimestamp) {
                    setGameState({ mode: "Playing", endTimestamp: (Date.now() + (gameProperties.gameLength * 1000)) });
                }
            } else if (gameState.mode == "Playing") {
                if (Date.now() >= gameState.endTimestamp) {
                    setGameState({ mode: "Results" })
                }
            }
        }, 100);
        return () => clearInterval(loop);
    });

    if (gameState.mode === "Menu") {
        return (
            <Menu setGameText={setGameText} handleStartGame={() => handleStartQuickGame()} />
        )
    } else if (gameState.mode === "Waiting" || gameState.mode === "Playing") {
        return (
            <Game
                gameState={gameState}
                setGameState={setGameState}
                textSentence={gameProperties.gameText.text[sentenceIndex]}
                handleFinishedSentence={() => handleFinishedSentence()}
                gameStats={gameStats}
                gameProperties={gameProperties}
            />
        )
    } else if (gameState.mode === "Results") {
        return (
            <Results setGameState={setGameState} gameProperties={gameProperties} gameStats={gameStats} />
        )
    } else {
        return <>Error: Gamestate not found</>
    }

}

export default GameSetup;