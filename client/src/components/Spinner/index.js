import {useTasks} from '../../Context/reducer';
import {useEffect, useState} from 'react';
import {FadeLoader} from 'react-spinners';
import './spinner.css';

function SpinnerBtn() {
    const {
        state: {isLoading = false}
    } = useTasks();

    let [show, setShow] = useState(false);
    let [isEndTimer, setIsEndTimer] = useState(false);

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
                    {/*<div className="background"></div>*/}
                    <FadeLoader className="spinner" color="#0dcaf0" width={5} height={20} speedMultiplier={2} />
                    {/*<div className="backgroundAll"></div>*/}
                </>
            )}
        </>
    );
}

export default SpinnerBtn;
