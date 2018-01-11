'use strict';

const { _state } = require('./state');

function LoggerObject () {

    this.logs = [];

    this.log = (object) => {

        const obj = {};

        obj.time = Date.now();
        obj.state = Object.assign({}, _state);
        Object.keys(object).forEach((key)=> {

            obj[key] = object[key];
        });

        this.logs.push(Object.assign({}, obj));
    };

    this.getLog = () => console.log(this.logs);

    return this;
}

module.exports = LoggerObject;
