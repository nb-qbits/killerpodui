/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardText,
    Col,
    Progress
} from "reactstrap";

const nameList = [
    'python', 'java', 'javascript', 'react'
]

const getImage = (name) => {
    let index = 0;
    try {
        index = parseInt(name.replace(/[^\d.]/g, ''))
    } catch (ee) { }
    return nameList[index];
}

const getProgressBarClassName = (value) => {
    if (value > 0 && value < 25) {
        return 'progress-bar-very-low';
    } else if (value >= 25 && value < 50) {
        return 'progress-bar-low';
    } else if (value >= 50 && value < 75) {
        return 'progress-bar-high';
    } else {
        return 'progress-bar-very-high';
    }
}

class Player extends React.Component {
    render() {
        const { details } = this.props;
        return (
            <Col md="4">
                <img
                    alt="..."
                    className={details.ready ? 'status-sign status-sign' : 'status-sign-waiting status-sign'}
                    
                    // src={require("../assets/img/" + details.ready ? "ready.png" : "waiting.png")}
                    src={require(details.ready ? "../assets/img/ready.png" : "../assets/img/waiting.png")}
                />
                <Card className="card-user">
                    <CardBody>
                        <CardText />
                        <div className="author">
                            <div className="block block-one" />
                            <div className="block block-two" />
                            <div className="block block-three" />
                            <div className="block block-four" />
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img
                                    alt="..."
                                    className="avatar"
                                    src={require("../assets/img/icons/" + getImage(details.name) + ".svg")}
                                />
                                <h5 className="title">{getImage(details.name)}</h5>
                            </a>
                        </div>
                        <div className="card-description">
                            <Progress max="100" color={getProgressBarClassName(details.maxhealth)} animated value={details.maxhealth} />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="button-container">
                            <Button className="btn-icon btn-round" color="facebook">
                                <i className="fab fa-facebook" />
                            </Button>
                            <Button className="btn-icon btn-round" color="twitter">
                                <i className="fab fa-twitter" />
                            </Button>
                            <Button className="btn-icon btn-round" color="google">
                                <i className="fab fa-google-plus" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Col>
        );
    }
}

export default Player;
