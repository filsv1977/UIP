import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import logIn from '../../api/login';
import {useTasks} from '../../сontext/reducer';
import {useNavigate} from 'react-router-dom';
import Error from '../Error';
import {actionTypes} from '../../сontext/actionTypes';
import './loginModal.css';
import {Base64} from 'js-base64';

function LoginModal() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {state, dispatch} = useTasks();

    const onChangeLogin = ({target: {value}}) => setLogin(value);

    const onChangePassword = ({target: {value}}) => setPassword(value);

    const handleSubmit = e => {
        e.preventDefault();

        logIn({login, password: Base64.encode(password)}, dispatch);
    };

    const onHandleClose = () => {
        navigate('/');
        dispatch({type: actionTypes.LOGOUT_ADMIN});
        dispatch({type: actionTypes.SET_VISIBLE, payload: false});
    };

    return (
        <Modal show={state.showLogin} onHide={onHandleClose} className="modal">
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
