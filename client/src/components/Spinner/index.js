import {useTasks} from '../../Context/reducer';
import {useEffect, useRef, useState} from 'react';
import {FadeLoader} from 'react-spinners';
import './spinner.css';

function SpinnerBtn() {
    const {
        state: {isLoading = false}
    } = useTasks();

    const refBg = useRef(null);

    let [show, setShow] = useState(false);
    let [isEndTimer, setIsEndTimer] = useState(false);
    const [pos, setPos] = useState(0);

    useEffect(() => {
        const {innerHeight: height} = window;
        if (refBg?.current?.offsetTop) {
            setPos((height - refBg.current.offsetTop) / 2 - 24);
        }
    }, [refBg?.current]);

    useEffect(() => {
        if (isLoading) {
            setShow(true);
            setTimeout(() => {
                setIsEndTimer(true);
            }, 400);
        } else {
            if (isEndTimer) {
                setShow(false);
                setIsEndTimer(false);
            }
        }
    }, [isLoading, isEndTimer]);

    return (
        <>
            {show && (
                <>
                    <div className="backgroundAll"></div>
                    <div ref={refBg} className="background"></div>
                    <FadeLoader
                        style={{marginTop: pos}}
                        className="spinner"
                        color="#0dcaf0"
                        width={5}
                        height={20}
                        speedMultiplier={2}
                    />
                </>
            )}
        </>
    );
}

export default SpinnerBtn;
