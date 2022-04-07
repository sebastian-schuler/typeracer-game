import React, { useEffect, useRef, useState } from 'react'
import { GameProperties, GameState, GameStats } from './GameSetup';
import CountdownGameStart from '../components/game/CountdownGameStart';
import CountdownGame from '../components/game/CountdownGame';
import DisplayedSentence from '../components/game/DisplayedSentence';
import CustomButton from '../components/CustomButton';

export type GameLetter = {
    letter: string,
    status: "correct" | "wrong" | "default",
}

export type GameWords = {
    length: number,
    words: Array<{
        letters: Array<GameLetter>,
        startIndex: number,
        finished: boolean,
    }>,
}

export type CursorPosition = {
    wordIndex: number,
    letterIndex: number
}

type Props = {
    gameState: GameState,
    setGameState: (state: GameState) => void,
    textSentence: string,
    handleFinishedSentence: () => void,
    gameStats: GameStats,
    gameProperties: GameProperties,
}

const Game = ({ gameState, setGameState, textSentence, handleFinishedSentence, gameStats, gameProperties }: Props) => {

    const [gameWords, setGameWords] = useState<GameWords>({ words: [], length: 0 });
    const [currentWord, setCurrentWord] = useState<number>(0);
    const [typedText, setTypedText] = useState("");

    const gameInput = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const input = event.target;
        const newText = input.value;
        const isBackspace = newText.length < typedText.length; // Bei backspace sollen Fehler nicht gezählt werden

        for (let letterIndex = 0; letterIndex < gameWords.words[currentWord].letters.length; letterIndex++) {

            // Space wird übersprungen
            if (letterIndex == gameWords.words[currentWord].letters.length - 1) break;

            // If user hasnt typed more letters than that, skip iteration here so we draw default on remaining letters
            if (newText.length - 1 < letterIndex) {
                gameWords.words[currentWord].letters[letterIndex].status = "default";
                continue;
            }

            if (newText.charAt(letterIndex) == gameWords.words[currentWord].letters[letterIndex].letter) {
                gameWords.words[currentWord].letters[letterIndex].status = "correct";
            } else {
                gameWords.words[currentWord].letters[letterIndex].status = "wrong";
                if (!isBackspace && letterIndex == newText.length - 1) gameStats.mistakes += 1; // Fehler werden nur gezählt wenn KEIN backspace gedrückt + nur aktueller index
            }

        }

        // Save new typed text in state
        setTypedText(newText);

    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.code == "Space" && gameInput && gameInput.current) {

            // Check if mistakes in word
            let mistake = false;
            let word = gameWords.words[currentWord];
            word.letters.forEach((letter, i) => {
                if (letter.status != 'correct') {
                    mistake = true;
                }
            })

            // If no mistake is found, advance to next word
            if (!mistake) {

                gameStats.wordsCompleted += 1;
                gameStats.lettersCompleted += gameWords.words[currentWord].letters.length - 1;

                if (gameWords.words.length == currentWord + 1) {
                    setCurrentWord(0);
                    handleFinishedSentence();
                } else {
                    setCurrentWord(prevState => (prevState + 1));
                }
                setTypedText("");
                gameInput.current.value = "";
            }

            event.preventDefault();

        } else if (typedText.length == gameWords.words[currentWord].letters.length - 1 && event.code != "Backspace") {
            event.preventDefault();
            return;
        }

    }

    useEffect(() => {
        let text = textSentence;
        let arrLetters: GameLetter[] = [];
        for (let i = 0; i < text.length; i++) {
            arrLetters.push({ letter: text.charAt(i), status: "default" });
        }

        let wordList: GameWords = { words: [], length: 0 };
        const wordsRaw = text.split(" ");
        let wordLetterIndex = 0;
        wordsRaw.forEach((word, i) => {

            let wordLetters = [];
            for (let index = wordLetterIndex + i; index < wordLetterIndex + word.length + i; index++) {
                wordLetters.push(arrLetters[index]);
            }
            // Add space
            let tmpLetter: GameLetter = { letter: " ", status: "correct" }
            wordLetters.push(tmpLetter);

            if (i == 0) wordList.words.push({ letters: wordLetters, startIndex: wordLetterIndex, finished: false });
            else wordList.words.push({ letters: wordLetters, startIndex: wordLetterIndex + 1, finished: false }); // Only count wordLetterIndex+1 after the first word because of the spaces
            wordLetterIndex += word.length;
        });

        wordList.length = wordLetterIndex;
        setGameWords(wordList);

    }, [textSentence]);

    useEffect(() => {
        if (gameState.mode === "Playing") gameInput.current?.focus();
    }, [gameState.mode]);

    return (
        <div className='w-full sm:w-2/3 m-auto'>
            <div className="flex flex-col bg-themeBackgroundLight rounded-lg">

                <div className='flex flex-row justify-between p-4 md:p-8 rounded-t bg-themeBackgroundLight border-b-2'>

                    <h1 className='text-white text-xl font-medium'>Text: {gameProperties.gameText.name}</h1>
                    <div className='flex flex-row gap-3'>
                        {gameState.mode === "Waiting" &&
                            <CountdownGameStart target={"endTimestamp" in gameState ? gameState.endTimestamp : -1} />
                        }
                        {gameState.mode === "Playing" &&
                            <CountdownGame target={"endTimestamp" in gameState ? gameState.endTimestamp : -1} />
                        }
                        <CustomButton className='px-2 py-1' text='Main Menu' onClick={() => { setGameState({ mode: "Menu" }) }} />
                    </div>

                    {/* <p>Mistakes: {gameStats.mistakes}</p>
                    <p>Words completed: {gameStats.wordsCompleted}</p>
                    <p>Letters completed: {gameStats.lettersCompleted}</p> */}

                </div>

                <div className='flex flex-col gap-4 p-4 md:p-8'>

                    <DisplayedSentence gameWords={gameWords} currentWord={currentWord} />

                    <div className='flex flex-row justify-between items-center mt-4'>
                        <input
                            disabled={gameState.mode !== 'Playing'}
                            ref={gameInput}
                            className='w-full rounded focus:outline-none focus:ring-themeAccent focus:ring border-none'
                            onChange={(event) => { handleChange(event) }}
                            onPaste={(event) => { event.preventDefault() }}
                            onKeyDown={(event) => { handleKeyDown(event) }}
                            onContextMenu={(event) => { event.preventDefault(); return false; }}
                            spellCheck={false}
                            type="text"
                            name="typing"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Game;