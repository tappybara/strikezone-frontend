import React from 'react';
import '../css/main.css';
import * as cm from './colourManager';

export default class DateCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            colourDict: cm.getColourDict(),
        }
    }
    
    render() {
        let colorDict = this.state.colourDict;
        let colours = colorDict[this.props.pteam];
        let result = this.props.start.result[0];
        let resultColour = result === 'W' ? 'green' : 'red';
        let selected = this.props.active;
        return(
            <button className={selected ? "date-card-selected" : "date-card"} style={{borderColor: `rgb${colours[0]}`}}onClick={this.props.onClick}>
                <div className="date-card-date">{this.props.start.date}</div>
                <div className="date-card-opp">{this.props.start.opp}</div>
                <div className="date-card-result" style={{color: resultColour}}>{this.props.start.result}</div>
            </button>
        )
    }
}