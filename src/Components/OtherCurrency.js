import React from 'react';
import { useSelector } from 'react-redux';
import {
    Form, Jumbotron, Row, Col
} from 'react-bootstrap';

const OtherCurrency = (props) => {
    const counter = useSelector(state => state.currencyList)
    console.log(counter)
    const handleLangChange = (value) => {
        console.log("hello", value)
        props.onSelectLanguage(value);
    }

    return (
        <React.Fragment>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Home currency </Form.Label>
                <Form.Control as="select" onChange={(e) => handleLangChange(e.target.value)}>
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
        </React.Fragment>
    )
}

export default OtherCurrency;