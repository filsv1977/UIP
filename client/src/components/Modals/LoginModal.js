import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {logIn} from "../../api/login";
import {useTasks} from "../../Context/reducer";

function LoginModal({show, handleClose}) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const {state, dispatch} = useTasks()

  const onChangeLogin = ({target: {value}}) => {
    setLogin(value);
  };

  const onChangePassword = ({target: {value}}) => {
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    await logIn({login, password}, dispatch)

    if (state.isAdmin) handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Авторизация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id={'myForm'}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="text" placeholder="Введите логин" onChange={onChangeLogin}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={onChangePassword}/>
          </Form.Group>
        </Form>
        {state.error && <h6>{state.error}</h6>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="primary" type="submit" form="myForm">
          Войти
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LoginModal;