import {Button, Spinner} from 'react-bootstrap';
import './spinner.css';
import {useTasks} from '../../Context/reducer';
import {useEffect, useState} from 'react';

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
        <div className={'spinner'}>
            {show && (
                <Button variant="primary" disabled>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Loading...
                </Button>
            )}
        </div>
    );
}

export default SpinnerBtn;
