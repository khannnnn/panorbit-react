import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Form, Jumbotron, Row, Col
} from 'react-bootstrap';

const HomeCurrency = (props) => {
    const counter = useSelector(state => state.currencyList)
    console.log(counter)
    const handleLangChange = (value, status) => {
        console.log("hello", value)
        props.onSelectLanguage(value, status);
    }

    return (
        <React.Fragment>
            {props.val}
            <Row>
                <Col sm="6">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Home currency </Form.Label>
                        <Form.Control as="select" onChange={(e) => handleLangChange(e.target.value, 1)}>
                            <option>Select currency</option>
                            {
                                counter.map((item, index) =>
                                    <option
                                        key={index} value={item.value}
                                    >
                                        {item.value}
                                    </option>
                                )
                            }
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Home currency </Form.Label>
                        <Form.Control as="select" onChange={(e) => handleLangChange(e.target.value, 2)}>
                            <option>Select currency</option>
                            {
                                counter.map((item, index) =>
                                    <option
                                        key={index} value={item.value}
                                    >
                                        {item.value}
                                    </option>
                                )
                            }
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

        </React.Fragment>
    )
}

export default HomeCurrency;