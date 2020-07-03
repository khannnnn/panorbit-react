import React from 'react';
import axios from 'axios';
import * as actions from '../Actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Jumbotron, Row, Col, Button, Image, roundedCircle, Dropdown } from 'react-bootstrap';

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            dropdown: false,
            userDetails: []
        }

        if (!localStorage.getItem('id')) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        let id = localStorage.getItem("id");
        console.log("Id: ", id)
        console.log("data: ", this.props.usersList)
        if (this.props.usersList.length > 0) {
            this.props.usersList.filter((item) => {
                if (id == item.id) {
                    this.setState({
                        userDetails: [item],
                        usersList: this.props.usersList
                    })
                }
            })
        } else {
            let self = this;
            axios.get('https://panorbit.in/api/users.json').then((res) => {
                console.log("result: ", res)
                if (res.data.users.length > 0) {
                    res.data.users.filter((item) => {
                        if (id == item.id) {
                            self.setState({
                                userDetails: [item],
                                usersList: res.data.users
                            })
                        }
                    })
                    self.props.usersListction(res.data.users);
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }

    signOut() {
        this.setState({ dropdown: !this.state.dropdown })
        this.props.history.push('/');
        localStorage.clear();
    }

    render() {
        console.log(this.state.userDetails[0])
        return (
            <div style={{ width: "98%" }}>
                <Row style={{ padding: "50px" }}>
                    <Col sm="2" className="menu-div">
                        <div className="menu-div-mar">
                            <div className="font-pointer">
                                <font>Profile</font>
                            </div><hr />
                            <div className="font-pointer">
                                <font>Posts</font>
                            </div><hr />
                            <div className="font-pointer">
                                <font>Gallery</font>
                            </div><hr />
                            <div className="font-pointer">
                                <font>ToDo</font>
                            </div><hr />
                        </div>
                    </Col>
                    {
                        this.state.userDetails.length > 0 ?
                            <Col sm="10">
                                <Row className="padding-top-left">
                                    <Col sm="6">
                                        <b className="font-color">Profile</b>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div class="dropdown">
                                            <div
                                                className="pointer-div"
                                                onClick={() => { this.setState({ dropdown: !this.state.dropdown }) }}
                                            >
                                                <Image src={this.state.userDetails[0].profilepicture} roundedCircle width="30px" height="30px" />
                                                <span className="font-color" style={{ marginLeft: "10px" }}>{this.state.userDetails[0].name}</span>
                                            </div>

                                            {
                                                this.state.dropdown ?
                                                    <div className="dropdown-content">
                                                        <div className="div-redius">
                                                            <div className="text-cenetr">
                                                                <Image src={this.state.userDetails[0].profilepicture} roundedCircle width="100px" height="100px" /><br />
                                                                <span className="font-color">{this.state.userDetails[0].name}</span><br />
                                                                <span className="small-font">{this.state.userDetails[0].email}</span>
                                                            </div><hr />
                                                            <div className="scroll-div">
                                                                {
                                                                    this.state.usersList.map((item, index) =>
                                                                        < div className="pointer-div" onClick={() => { this.signOut() }}>
                                                                            <div className="text-cenetr">
                                                                                <Image src={item.profilepicture} roundedCircle width="30px" height="30px" />
                                                                                <span className="small-font">{item.name}</span>
                                                                            </div><hr />
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="text-cenetr">
                                                                <Button type="button"
                                                                    style={{ borderRadius: "20px" }}
                                                                    onClick={() => { this.signOut() }}
                                                                >
                                                                    Sign out
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="padding-30">
                                    <Col xs="5" className="profile-div">
                                        <Image src={this.state.userDetails[0].profilepicture} roundedCircle width="150px" height="150px" />
                                        <p className="font-color">{this.state.userDetails[0].name}</p>
                                        <div>
                                            <Row>
                                                <Col xs="6" className="text-right">
                                                    <span className="font-color">
                                                        Username :
							                </span>
                                                </Col>
                                                <Col xs="6" className="text-left">
                                                    <span className="font-size-18">{this.state.userDetails[0].username}</span>
                                                </Col>
                                            </Row>
                                            <Row class="row">
                                                <Col xs="6" className="text-right">
                                                    <span className="font-size-17">
                                                        e-mail :
							                </span>
                                                </Col>
                                                <Col xs="6" className="text-left">
                                                    <span className="font-size-18">{this.state.userDetails[0].email}</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6" className="text-right">
                                                    <span className="font-size-17">
                                                        Phone :
							                </span>
                                                </Col>
                                                <Col xs="6" className="text-left">
                                                    <span className="font-size-18">{this.state.userDetails[0].phone}</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6" className="text-right">
                                                    <span className="font-size-17">
                                                        Website :
							                </span>
                                                </Col>
                                                <Col xs="6" className="text-left">
                                                    <span className="font-size-18">{this.state.userDetails[0].website}</span>
                                                </Col>
                                            </Row>
                                        </div><hr />
                                        <div>
                                            <p className="font-size-17">Company</p>
                                            <Row>
                                                <Col xs="6" className="text-right">
                                                    <span className="font-size-17">
                                                        Name :
							                        </span>
                                                </Col>
                                                <Col xs="6" className="text-left">
                                                    <span className="font-size-18">{this.state.userDetails[0].company.name}</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6" className="text-right">
                                                    <span className="font-size-17">
                                                        catchphrase :
							                        </span>
                                                </Col>
                                                <Col xs="6" className="text-left">
                                                    <span className="font-size-18">{this.state.userDetails[0].company.catchPhrase}</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="6" className="text-right">
                                                    <span className="font-size-17">
                                                        bs :
							                        </span>
                                                </Col>
                                                <Col xs="6" className="text-left">
                                                    <span className="font-size-18">{this.state.userDetails[0].company.bs}</span>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col class="col-xs-7">
                                        <div className="padding-left-30">
                                            <p className="font-size-17">Address </p>
                                            <div className="margin-left-30">
                                                <Row>
                                                    <Col xs="2" className="text-right">
                                                        <span className="font-size-17">
                                                            Street :
								                        </span>
                                                    </Col>
                                                    <Col class="col-xs-10" className="text-left">
                                                        <span className="font-size-18">{this.state.userDetails[0].address.street}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="2" className="text-right">
                                                        <span className="font-size-17">
                                                            Suite :
								                        </span>
                                                    </Col>
                                                    <Col xs="10" className="text-left">
                                                        <span className="font-size-18">{this.state.userDetails[0].address.suite}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="2" className="text-right">
                                                        <span className="font-size-17">
                                                            City :
								                        </span>
                                                    </Col>
                                                    <Col xs="10" className="text-left">
                                                        <span className="font-size-18">{this.state.userDetails[0].address.city}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs="2" className="text-right">
                                                        <span className="font-size-17">
                                                            Zipcode:
								                        </span>
                                                    </Col>
                                                    <Col xs="10" className="text-left">
                                                        <span className="font-size-18">{this.state.userDetails[0].address.zipcode}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            : null
                    }
                </Row>
            </div >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    usersListction: (data) => dispatch(actions.usersList(data))
})

const mapStateToProps = state => ({
    usersList: state.usersList
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));