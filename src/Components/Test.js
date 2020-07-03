import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            userlist: [],
            userData: [],
            userSubArray: []
        }
    }

    componentDidMount() {
        console.log("components did mount");
        let self = this;
        axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
            console.log(res)
            self.setState({
                userlist: res.data
            })
        })
    }

    userDetails(value) {
        console.log("clicked", value)
        let newList = [];
        this.state.userlist.map(item => {
            if (value.userId == item.userId) {
                newList.push({
                    "userId": item.userId,
                    "id": item.id,
                    "title": item.title,
                    "completed": item.completed
                })
            }
        })

        this.setState({
            userData: [value],
            userSubArray: newList
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Row>
                    <Col sm="6">
                        <table>
                            <tr>
                                <td>ID</td>
                                <td>Title</td>
                                <td>Status</td>
                            </tr>
                            <tbody>
                                {
                                    this.state.userlist.map((item, index) =>
                                        <tr key={index} className="pointer-div" onClick={() => this.userDetails(item)}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.completed ? 'Complete' : 'Pendding'}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </Col>
                    <Col sm="6">
                        {
                            this.state.userData.map((item, index) =>
                                <div>
                                    <p>ID: {item.id}</p>
                                    <p>Title: {item.title}</p>
                                    <p>Status: {item.completed ? 'Complete' : 'Pendding'}</p>
                                </div>
                            )
                        }
                        <div>
                            <table>
                                <tr>
                                    <td>ID</td>
                                    <td>Title</td>
                                    <td>Status</td>
                                </tr>
                                <tbody>
                                    {
                                        this.state.userSubArray.map((item, index) =>
                                            <tr key={index} className="pointer-div" onClick={() => this.userDetails(item)}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.completed ? 'Complete' : 'Pendding'}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Test;