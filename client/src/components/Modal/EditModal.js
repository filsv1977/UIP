import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import {tasksAPI} from "../../services/TaskService";


function EditModal({show, handleClose , editData }) {
  const {name, url, estimationHours, cost: taskCost } = editData
  const [cost, setCost] = useState(taskCost)
  const [estimation, setEstimationHours] = useState(estimationHours)
  const [editTask, {}] = tasksAPI.useEditTaskMutation()

  const onPaymentChange = ({ target: { value } }) => {
    setCost(value);
  };

  const onEstimationHoursChange = ({ target: { value } }) => {
    setEstimationHours(value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    let newData = {...editData, cost: +cost ,estimationHours: +estimation}
    await editTask({id: newData.id, body: newData})
    handleClose()
  }

  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать задачу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id={'myForm'}>
            <Form.Group className="mb-3" controlId="formBasicTask">
              <Form.Label>Наименование задачи</Form.Label>
              <Form.Control type="text" disabled defaultValue={name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrl">
              <Form.Label>Адрес задачи</Form.Label>
              <Form.Control type="text" defaultValue={url}  disabled/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEstimationHours">
              <Form.Label>Оценка задачи</Form.Label>
              <Form.Control type="number"  defaultValue={estimationHours} onChange={onEstimationHoursChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCost">
              <Form.Label>Стоимость</Form.Label>
              <Form.Control type="number"  defaultValue={cost} onChange={onPaymentChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" type="submit" form="myForm">
            Применить
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditModal;
