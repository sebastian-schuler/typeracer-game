import { GameLetter } from '../../containers/Game'
import DisplayedLetter from './DisplayedLetter'

type Props = {
    word: Array<GameLetter>,
    isCursorCurrentWord: boolean,
}

const DisplayedWord = ({ word, isCursorCurrentWord }: Props) => {

    const isLastIndex = (index: number) => {
        if ((word.length - 1) == index) return true;
        else return false;
    }

    return (
        <>
            <span className={`${isCursorCurrentWord ? "underline" : ""}`}>
                {
                    word.map((letter, index) => (
                        !isLastIndex(index) &&
                        <DisplayedLetter
                            key={index}
                            gtLetter={letter}
                        />
                    ))
                }
            </span>
            <span key={word.length - 1} className=''>
                <DisplayedLetter
                    gtLetter={word[word.length - 1]}
                />
            </span>
        </>

    )
}

export default DisplayedWord