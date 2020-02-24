import React from 'react';
import {Link} from 'react-router-dom';
import '../css/main.css';
import * as cm from './colourManager';

export default class Card extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            colourDict: cm.getColourDict()
        }
        
        this.playerCard = this.playerCard.bind(this);
        this.getSpan = this.getSpan.bind(this);
    }

    getSpan(_letter, rowIndex) {
        let colours = cm.getColourDict();
            let colour = colours[this.props.name[2]];
        if (_letter === " "){
            return(
                <span>&nbsp;</span>
            );
        } else {
            return (
            <span className="team-card-span" style={{textShadow: `-1px -1px 0 rgb${colour[0]},0 -1px 0 rgb${colour[0]},
            1px -1px 0 rgb${colour[0]},1px 0 0 rgb${colour[0]}, 1px 1px 0 rgb${colour[0]}, 
            0 1px 0 rgb${colour[0]},-1px 1px 0 rgb${colour[0]},-1px 0 0 rgb${colour[0]}`, WebkitTextFillColor: `rgb${colour[0]}`}}>{_letter.toUpperCase()}</span>
            );
        }
    }


    updateStart() {
        this.props.update(this.props.start);
    }

    playerCard() {
        if (this.props.type === "player"){
            let link = `/team/${this.props.team}/${this.props.player.ID}`;
            let team = this.props.team;
            let colours = this.state.colourDict;
            let colour = colours[team];
            return(
                <Link to={{pathname: link}}>
                    <div className="team-card" style={{borderColor: `rgb${colour[0]}`}}>
                        <span className="card-name" style={{textShadow: `-2.5px -2.5px 0 rgb${colour[1]},0 -2.5px 0 rgb${colour[1]},
                                                                2.5px -2.5px 0 rgb${colour[1]},2.5px 0 0 rgb${colour[1]}, 2.5px 2.5px 0 rgb${colour[1]}, 
                                                                0 2.5px 0 rgb${colour[1]},-2.5px 2.5px 0 rgb${colour[1]},-2.5px 0 0 rgb${colour[1]}`}}>
                            {this.props.player.name}</span>
                    </div>
                </Link>
            )
        }
        else{
            let link = `/team/${this.props.name[2]}`;
            let city = this.props.name[0];
            let name = this.props.name[1];
            let colours = this.state.colourDict;
            let colour = colours[this.props.name[2]];
            return(
                <Link to={{pathname: link}}>
                    <div className="team-card" style={{borderColor: `rgb${colour[0]}`}}>
                        <div className="team-card-name" style={{textShadow: `-2.5px -2.5px 0 rgb${colour[1]},0 -2.5px 0 rgb${colour[1]},
                                                                2.5px -2.5px 0 rgb${colour[1]},2.5px 0 0 rgb${colour[1]}, 2.5px 2.5px 0 rgb${colour[1]}, 
                                                                0 2.5px 0 rgb${colour[1]},-2.5px 2.5px 0 rgb${colour[1]},-2.5px 0 0 rgb${colour[1]}`}}>
                            {name}
                        </div>
                        <div className="team-card-city">
                            {Array.from(city).map(this.getSpan)}
                        </div>
                    </div>
                </Link>
            )
            
        }
    }
    render() {
        return (
            
            <td>
                {this.playerCard()}
            </td>            
        );
    }
}