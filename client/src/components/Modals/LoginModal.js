import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from 'react';
import {logIn} from '../../api/login';
import {useTasks} from '../../Context/reducer';

function LoginModal({show, handleClose}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const {state, dispatch} = useTasks();

    const onChangeLogin = ({target: {value}}) => {
        setLogin(value);
    };

    const onChangePassword = ({target: {value}}) => {
        setPassword(value);
    };

    useEffect(() => {
        if (state.isAdmin) handleClose();
    }, [state.isAdmin]);

    const handleSubmit = e => {
        e.preventDefault();

        logIn({login, password}, dispatch);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Authorization</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id={'myForm'}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" placeholder="Enter login" onChange={onChangeLogin} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={onChangePassword} />
                    </Form.Group>
                </Form>
                {state.error && <h6>{state.error}</h6>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-primary" type="submit" form="myForm">
                    Enter
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
