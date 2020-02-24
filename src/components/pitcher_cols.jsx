import React from 'react'
import Card from './card.jsx'

export default class PitcherCols extends React.Component{
    constructor(props){
        super(props)

        this.generateRows = this.generateRows.bind(this);
    }

    generateRows(_ply, rowIndex){
        return (
            <tr>
                <Card player={_ply} team={this.props.team} type={"player"}/>
            </tr>
            
        );
    }

    render() {
        
        return (
            <div className="pitchers-home">
                <table>
                    <thead className="pitchers-head"><tr><th>{this.props.name}</th></tr></thead>
                    <tbody className="pitchers-body">{this.props && this.props.players && this.props.players.map(this.generateRows)}</tbody>
                </table>
            </div>
        );
    }
}