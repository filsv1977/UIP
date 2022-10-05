import {Button, Spinner} from 'react-bootstrap';
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
                <div className="background">
                    <div className="spinner">
                        <Button variant="primary" disabled>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            <span className="caption">Loading...</span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default SpinnerBtn;
