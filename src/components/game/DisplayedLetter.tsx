import { GameLetter } from '../../containers/Game';

type Props = {
    gtLetter: GameLetter,
}

const DisplayedLetter = ({ gtLetter }: Props) => {

    return (
        <>
            <span
                className={`inline text-xl
                    ${gtLetter.status == "default" && "text-white"}
                    ${gtLetter.status == "correct" && "text-green-500"}
                    ${gtLetter.status == "wrong" && "text-white bg-red-500"} 
                `}
            >
                {gtLetter.letter}
            </span>
        </>
    )
}

export default DisplayedLetter;