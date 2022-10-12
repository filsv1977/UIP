import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from 'react';
import {logIn} from '../../api/login';
import {useTasks} from '../../Context/reducer';
import {useNavigate} from 'react-router-dom';
import Error from '../Error';
import {actionTypes} from '../../Context/actionTypes';
import './loginModal.css';
import md5 from 'md5';

function LoginModal({show, handleClose}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {state, dispatch} = useTasks();

    const onChangeLogin = ({target: {value}}) => setLogin(value);

    const onChangePassword = ({target: {value}}) => setPassword(value);

    // useEffect(() => {
    //     if (state.isAdmin) handleClose();
    // }, [state.isAdmin, handleClose]);

    const handleSubmit = e => {
        e.preventDefault();

        logIn({login, password: md5(password)}, dispatch);
    };

    const onHandleClose = () => {
        navigate('/');
        dispatch({type: actionTypes.LOGOUT_ADMIN});
        handleClose();
    };

    return (
        <Modal show={show} onHide={onHandleClose} className="modal-backdrop">
            <Modal.Header closeButton>
                <Modal.Title>Authorization</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} id={'myForm'}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter login"
                            autoComplete="on"
                            onChange={onChangeLogin}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            onChange={onChangePassword}
                        />
                    </Form.Group>
                </Form>
                {state.error && <Error message={state.error} />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHandleClose}>
                    Cancel
                </Button>
                <Button variant="outline-primary" type="submit" form="myForm">
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
