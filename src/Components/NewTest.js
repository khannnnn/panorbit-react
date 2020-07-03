import React from 'react';
import axios from 'axios';
import HomeCurrency from './HomeCurrency';
import OtherCurrency from './OtherCurrency';
import * as actions from '../Actions';
import { connect } from 'react-redux';

import {
    Form, Jumbotron, Row, Col, Button
} from 'react-bootstrap';

class NewTest extends React.Component {
    constructor() {
        super();
        this.state = {
            allCurrency: [],
            homeCurrency: 0,
            othersCurrency: 0,
            currencyDiff: 0,
            reset: true
        }
    }

    componentDidMount() {
        console.log(this.props.currencyList)
        let self = this;
        axios.get('https://api.exchangeratesapi.io/latest').then((res) => {
            let currencyArray = [{ value: "select" }]
            console.log(res)
            for (const property in res.data.rates) {
                currencyArray.push({
                    value: `${property}: ${res.data.rates[property]}`
                })
            }
            this.props.currencyListAction(currencyArray);
            self.setState({
                allCurrency: currencyArray
            })
        })

    }

    calculate() {
        console.log(this.state)
        let home = this.state.homeCurrency.substr(4);
        let other = this.state.othersCurrency.substr(4);
        let result = parseFloat(home) - parseFloat(other);
        this.setState({
            currencyDiff: result
        })
    }

    reset() {
        this.setState({
            currencyDiff: 0,
            allCurrency: []
        })
        this.componentDidMount();
    }

    render() {
        return (
            <React.Fragment>
                <Jumbotron>
                    {/* <HomeCurrency onSelectLanguage={this.handleLanguage} val={this.state.reset} /> */}
                    <Row>
                        <Col sm="6">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Home currency </Form.Label>
                                <Form.Control as="select"
                                    onChange={(e) => this.setState({ homeCurrency: e.target.value })}
                                >
                                    {
                                        this.state.allCurrency.map((item, index) =>
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
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Home currency </Form.Label>
                                <Form.Control as="select"
                                    onChange={(e) => this.setState({ othersCurrency: e.target.value })}
                                >
                                    {
                                        this.state.allCurrency.map((item, index) =>
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
                    <Row>
                        <Col sm="12">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Diffrance</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Latest comparison" disabled
                                    value={this.state.currencyDiff}
                                />
                                <Form.Text className="text-muted">
                                    Value of our currency with Others.
                                </Form.Text>
                            </Form.Group>
                            <Button onClick={() => this.calculate()}>Result</Button>
                            <Button onClick={() => this.reset()}>Reset</Button>
                        </Col>
                    </Row>
                </Jumbotron>
            </React.Fragment >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    currencyListAction: (data) => dispatch(actions.currencyList(data))
})

const mapStateToProps = state => ({
    currencyList: state.currencyList
})
export default connect(mapStateToProps, mapDispatchToProps)(NewTest);
