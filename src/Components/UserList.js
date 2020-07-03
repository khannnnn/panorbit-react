import React from 'react';
import axios from 'axios';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, roundedCircle, Image } from 'react-bootstrap';

class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        console.log(this.props.usersList)
        let self = this;
        axios.get('https://panorbit.in/api/users.json').then((res) => {
            console.log("result: ", res)
            if (res.data.users.length > 0) {
                self.setState({
                    userList: res.data.users
                })
                self.props.usersListction(res.data.users);
            } else {
                self.setState({
                    userList: []
                })
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    userProfille(value) {
        console.log("User profile..", value)
        this.props.history.push('/profile');
        localStorage.setItem("id", value.id);
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <header>
                    <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="-300 0 950 270" >
                        <path d="M-314,267 C105,364 400,100 812,279" fill="none" stroke="white" stroke-width="120" stroke-linecap="round" />
                    </svg>
                </header>
                <div id="rcorners2" className="div-position">
                    <div className="list-group">
                        <div class="list-group-item" style={{ textAlign: "center" }}>
                            <b className="font-list">Select an account</b>
                        </div>
                        <div class="list-group-item user-list-div">
                            {
                                this.state.userList.map((item, index) =>
                                    <div key={index} className="pointer-div" onClick={() => this.userProfille(item)}>
                                        <Row>
                                            <Col xs="2">
                                                <Image src={item.profilepicture} roundedCircle width="30px" height="30px" />
                                            </Col>
                                            <Col xs="10" className="font-color">
                                                <b>{item.name}</b>
                                            </Col>
                                        </Row><hr />
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    usersListction: (data) => dispatch(actions.usersList(data))
})

const mapStateToProps = state => ({
    usersList: state.usersList
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList));