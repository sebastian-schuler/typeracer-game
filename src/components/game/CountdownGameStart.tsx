import React, { useEffect, useState } from 'react'

type Props = {
    target: number
}

const CountdownGameStart = ({ target }: Props) => {

    const [secsRemaining, setSecsRemaining] = useState<number>(() => (target - Date.now()) / 1000)

    useEffect(() => {
        let interval = setInterval(() => {
            setSecsRemaining((target - Date.now()) / 1000);
        }, 100)
        return () => clearInterval(interval);
    }, [target]);

    const getFormat = (secs: number) => {
        let val = Number(secs.toFixed(0));
        if (val >= 3) {
            return "bg-red-500";
        } else if (val == 2) {
            return "bg-orange-500";
        } else if (val == 1) {
            return "bg-yellow-500";
        } else if (val == 0) {
            return "bg-green-500";
        } else {
            return "bg-themeAccent";
        }
    }

    return (
        <div className={`fixed top-1/4 left-1/2 right-auto w-20 h-20 -ml-10 rounded items-center ${getFormat(secsRemaining)}`}>
            <div className='flex h-full items-center'>
                <p className='text-center w-full font-medium text-white text-3xl'>
                    {
                        secsRemaining < 0 ?
                            '0' : secsRemaining.toFixed(0)
                    }
                </p>
            </div>
        </div>
    )

}

export default CountdownGameStart;