import React from 'react'
import { GameProperties, GameState, GameStats } from './GameSetup'

type Props = {
    setGameState: (state: GameState) => void,
    gameProperties: GameProperties,
    gameStats: GameStats,
}

const Results = ({ setGameState, gameProperties, gameStats }: Props) => {

    const wpm = (gameStats.wordsCompleted / gameProperties.gameLength) * 60;
    const lpm = (gameStats.lettersCompleted / gameProperties.gameLength) * 60;
    const accuracy = (1.0 - (gameStats.mistakes / gameStats.lettersCompleted)) * 100;

    const getGamemodeString = (mode: string) => {

        if (mode === "Quick") {
            return "Quick Game"
        } else {
            return "";
        }

    }

    let displayedStats = [
        { name: "Mistakes", value: gameStats.mistakes },
        { name: "Words completed", value: gameStats.wordsCompleted },
        { name: "Letters completed", value: gameStats.lettersCompleted },
        { name: "Words per minute", value: wpm },
        { name: "Letters per Minute", value: lpm },
        { name: "Accuracy", value: accuracy.toFixed(2) + "%" },
    ]

    return (

        <div className='w-full sm:w-2/3 m-auto'>
            <div className="flex flex-col bg-themeBackgroundLight rounded-lg">

                <div className='flex flex-row justify-between p-4 md:p-8 rounded-t bg-themeBackgroundLight border-b-2 items-baseline'>
                    <div className='flex flex-row justify-start items-baseline'>
                        <h2 className='font-medium text-xl text-white'>Results: {getGamemodeString(gameProperties.gameMode)} |</h2>
                        <p className='pl-1'>{gameProperties.gameLength} seconds, {gameProperties.difficulty} difficulty</p>
                    </div>
                    <p className='text-gray-200'>
                        <span>{gameProperties.gameText.name}, </span>
                        <a href={gameProperties.gameText.source} className='text-themeMild hover:text-themeAccent'><span className='text-gray-200'>Source:</span> {gameProperties.gameText.source}</a>
                    </p>
                </div>

                <div className='flex flex-col gap-4 p-4 md:p-8'>

                    <table className='table-auto border-y my-16 w-1/2 self-center select-none'>
                        <tbody>
                            {
                                displayedStats.map((stat, i) => (
                                    <tr key={i} className={`border-b hover:bg-themeAccent group ${i % 2 != 0 ? 'bg-themeBlack bg-opacity-30' : ''}`}>
                                        <td className='text-gray-200 group-hover:text-themeBackground font-medium py-4 pl-4'>{stat.name}</td>
                                        <td className='text-gray-200 group-hover:text-themeBackground text-right pr-4'>{stat.value}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <button
                        onClick={() => setGameState({ mode: "Menu" })}
                        className='border rounded text-white font-medium border-themeAccent py-2 hover:bg-themeAccent hover:text-themeBlack'
                    >
                        Main Menu
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Results