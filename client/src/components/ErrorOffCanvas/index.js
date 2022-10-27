import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useTasks} from '../../сontext/reducer';
import {actionTypes} from '../../сontext/actionTypes';

function ErrorOffCanvas() {
    const {
        state: {error, showError},
        dispatch
    } = useTasks();

    const handleClose = () => {
        dispatch({
            type: actionTypes.SHOW_ERROR,
            payload: false
        });
    };

    return (
        <>
            <Offcanvas
                className={'offcanvas offcanvas-bottom h-auto text-bg-danger'}
                show={showError}
                onHide={handleClose}
                placement={'bottom'}
            >
                <Offcanvas.Body as={'div'}>
                    <div className="alert alert-danger d-flex justify-content-center align-items-center top-10 text-bg-danger border-danger">
                        {error}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ErrorOffCanvas;
