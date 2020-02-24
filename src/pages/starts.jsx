import React from 'react'
import '../css/main.css'
import Card from '../components/card.jsx'
import Data from '../pages/data.jsx'
import DateCard from '../components/date_card.jsx'

export default class Starts extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            dates: [],
            pid: this.props.match.params.pid,
            pteam: this.props.match.params.tn,
            start: null,
            selectIdx: -1,
            loadMessage: "Please Select A Start",
        }

        this.generateRows = this.generateRows.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        let pid = this.state.pid;
        var proxyUrl = 'https://lit-citadel-87801.herokuapp.com/';
        var targetUrl = `https://strikezone-api.herokuapp.com/starts/${pid}`;
        fetch(`${proxyUrl + targetUrl}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
              },
          }).
        then((reply) => {
            return reply.json();
        }).then((data) => {
            this.setState(() => {
                return {dates: data};
            })
        }).catch((err) => {
            console.log(err);
        });
        
    }

    componentDidUpdate() {
        
    }

    update(date, rowIndex) {
        this.setState({
            start: date, 
            selectIdx: rowIndex,
            loadMessage: "Loading..."
        });

    }

    generateRows(_start, rowIndex){
        var team = this.state.pteam;
        var pid = this.state.pid;
        return (
            <DateCard start={_start} pid={pid} pteam={team} active={this.state.selectIdx === rowIndex} onClick={() => this.update(_start, rowIndex)}/>
        );
    }

    render() {
        let dates = this.state.dates;
        return (
            dates ?
            <div className="start">
                <div className="start-container">
                    <div className="start-block">
                        {Object.values(this.state.dates).map(this.generateRows)}
                    </div>
                    {this.state.start ? <div className="data-box"><Data pid={this.state.pid} pteam={this.state.pteam} start={this.state.start}/></div>: 
                    <div className="data-box">{this.state.loadMessage}</div>}
                </div>
                
            </div>
            : <div>Loading...</div>
        )
    }
}