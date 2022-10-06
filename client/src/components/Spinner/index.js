import {Spinner} from 'react-bootstrap';
import {useTasks} from '../../Context/reducer';
import {useEffect, useState} from 'react';
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
                    <div className="background">
                        <Spinner animation="border" variant="primary" />
                    </div>
                    <div className="backgroundAll"></div>
                </>
            )}
        </>
    );
}

export default SpinnerBtn;
