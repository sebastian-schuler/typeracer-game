import React, { useEffect, useState } from 'react'

type Props = {
    target: number,
    precision?: number,
}

const CountdownGame = ({ target, precision }: Props) => {

    const [secsRemaining, setSecsRemaining] = useState<number>(() => (target - Date.now()) / 1000)

    useEffect(() => {
        let interval = setInterval(() => {
            setSecsRemaining((target - Date.now()) / 1000);
        }, 100)
        return () => clearInterval(interval);
    }, [target]);

    const getFormat = (secs: number) => {
        let val = Number(secs.toFixed(0));
        if (val == 3) {
            return "text-red-500";
        } else if (val == 2) {
            return "text-orange-500";
        } else if (val == 1) {
            return "text-yellow-500";
        } else if (val == 0) {
            return "text-green-500";
        } else {
            return "text-white";
        }
    }

    return (
        <span className='text-themeMild'>
            <span className={`${getFormat(secsRemaining)} text-lg`}>
                {
                    secsRemaining < 0 ?
                        '0' : secsRemaining.toFixed(precision ?? 0)
                }s
            </span>
            {" remaining"}
        </span>
    )

}

export default CountdownGame;