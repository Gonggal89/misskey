"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
function toLevelColor(level) {
    switch (level) {
        case 'Error': return chalk.red;
        case 'Warn': return chalk.yellow;
        case 'Info': return chalk.blue;
    }
}
class Logger {
    constructor(domain) {
        this.domain = domain;
    }
    static log(level, message) {
        const color = toLevelColor(level);
        const time = (new Date()).toLocaleTimeString('ja-JP');
        console.log(`[${time} ${color.bold(level.toUpperCase())}]: ${message}`);
    }
    static error(message) {
        Logger.log('Error', message);
    }
    static warn(message) {
        Logger.log('Warn', message);
    }
    static info(message) {
        Logger.log('Info', message);
    }
    log(level, message) {
        Logger.log(level, `[${this.domain}] ${message}`);
    }
    error(message) {
        this.log('Error', message);
    }
    warn(message) {
        this.log('Warn', message);
    }
    info(message) {
        this.log('Info', message);
    }
}
exports.default = Logger;
