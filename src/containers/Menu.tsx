import React from 'react'
import CustomButton from '../components/CustomButton'
import { textData } from '../data/textData';
import { GameText } from './GameSetup';

type Props = {
    setGameText: (text: GameText) => void,
    handleStartGame: () => void
}
const Menu = ({ setGameText, handleStartGame }: Props) => {

    const filterSentences = (text: string) => {
        const textArr = text.split(".");
        textArr.forEach((str, i) => {
            if (str.charAt(0) == " ") textArr[i] = str.substring(1);
            if (str == "") {
                textArr.splice(i, 1);
                return;
            }
        })
        return textArr;
    }

    const handleQuickplay = () => {
        let rand = Math.floor(Math.random() * textData.length);
        let selected = textData[rand];
        let arr = filterSentences(selected.text);

        shuffleArray(arr);
        setGameText({ name: selected.name, difficulty: selected.difficulty, source: selected.source, text: arr });
        handleStartGame();
    }

    function shuffleArray(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    return (
        <div className='flex flex-col items-center w-2/4 self-center'>
            <h1 className='font-bold text-white text-4xl mb-12'>Type Game</h1>
            <CustomButton className='my-2 p-2 w-full' text='Quick Play' onClick={() => handleQuickplay()} />
            <CustomButton className='my-2 p-2 w-full' text='Custom Game' disabled={true} onClick={() => { }} />
            <CustomButton className='my-2 p-2 w-full mt-8' text='My Homepage' onClick={() => window.location.href = 'https://www.sebastian-schuler.de'} />
        </div>
    )
}

export default Menu