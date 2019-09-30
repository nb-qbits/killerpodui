
// reactstrap components
import {
    Row
} from "reactstrap";
import Countdown from 'react-countdown-now';

import Player from './player';

import React, { useEffect, useState } from 'react';

const _ = require('lodash');

function LiveScore() {
    const [playersData, setPlayersData] = useState({});

    // const baseUrl = 'https://api.te2019.aws.redhat-demo.com:6443/apis/rhte.demojam.battlefield/v1alpha1/namespaces/visual/battlefields/'
    const baseUrl = 'http://www.mocky.io/v2/5d915ede310000520010c80a';

    function getData() {
        fetch(baseUrl, {
            method: 'GET',
            // headers: new Headers({
            //     'Authorization': 'Bearer 1lL4ojP24vlkcAR2Etigp0-loT-L1dbta0bOz9tAgfE'
            // })
        }).then(async (fetchedData) => {
            const dataAsJson = await fetchedData.json();
            var merged = _.merge(_.keyBy(dataAsJson['spec']['players'], 'name'), _.keyBy(dataAsJson['status']['scores'], 'name'));
            setPlayersData({'rawData': dataAsJson, 'data': _.values(merged)});
            console.log(dataAsJson['spec']['duration'])
        });
    }

    // Random component
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
        // Render a completed state
        return <Completionist />;
        } else {
        // Render a countdown
        return <span>{minutes < 10 ? `0${minutes}` : minutes }:{seconds < 10 ? `0${seconds}` : seconds}</span>;
        }
    };
    

    useEffect(() => {
        getData();
        const pollForData = setInterval(() => getData(), 5000);
        return () => {
            clearTimeout(pollForData);
        };
    }, []);

    return (
        <div className="main-panel">
            <div className="content">
                <Row>
                    {playersData.data && playersData['data'].map((player, key) => {
                        return <Player key={key} details = {player}></Player>
                    })}
                </Row>
                {playersData['rawData'] && playersData['rawData']['spec'] &&
                    <p className="blockquote blockquote-primary countdown-timer">
                        <Countdown renderer={renderer} date={Date.now() + playersData['rawData']['spec']['duration'] * 1000} />
                    </p>
                }
            </div>
        </div>
    );
}

export default LiveScore;