import { GameWords } from '../../containers/Game'
import DisplayedWord from './DisplayedWord'

type Props = {
    gameWords: GameWords,
    currentWord: number
}

const DisplayedSentence = ({ gameWords, currentWord }: Props) => {

    const isCurrentWord = (i: number) => {
        if (currentWord == i) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <p className='select-none'>
            {
                gameWords.words.map((word, i) => (
                    <DisplayedWord
                        key={i}
                        word={word.letters}
                        isCursorCurrentWord={isCurrentWord(i)}
                    />
                ))
            }
        </p>
    )
}

export default DisplayedSentence;