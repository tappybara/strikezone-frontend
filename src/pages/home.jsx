import React from 'react';

import Division from '../components/division.jsx'
import '../css/main.css'

export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            al_east: [["Baltimore","Orioles", "BAL"], ["Boston","Red Sox","BOS"], ["New York", "Yankees", "NYY"], ["Tampa Bay", "Rays", "TB"], ["Toronto", "Blue Jays", "TOR"]],
            al_west: [["Houston", "Astros", "HOU"], ["Los Angeles", "Angels","LAA"], ["Oakland", "Athletics", "OAK"], ["Seattle", "Mariners", "SEA"], ["Texas", "Rangers", "TEX"]],
            al_central: [["Chicago", "White Sox", "CWS"], ["Cleveland", "Indians", "CLE"], ["Detroit", "Tigers", "DET"], ["Kansas City", "Royals", "KC"], ["Minnesota", "Twins", "MIN"]],
            nl_east: [["Atlanta", "Braves", "ATL"], ["Miami", "Marlins", "MIA"], ["New York", "Mets", "NYM"], ["Philadelphia", "Phillies", "PHI"], ["Washington", "Nationals", "WSH"]],
            nl_west: [["Arizona", "Diamondbacks", "ARI"], ["Colorado", "Rockies", "COL"], ["Los Angeles", "Dodgers", "LAD"], ["San Diego", "Padres", "SD"], ["San Francisco", "Giants", "SF"]],
            nl_central: [["Chicago", "Cubs","CHI"], ["Cincinnati", "Reds", "CIN"], ["Milwaukee", "Brewers", "MIL"], ["Pittsburgh", "Pirates", "PIT"], ["St.Louis", "Cardinals", "STL"]]
        }

    }

    componentDidMount() {
        
    }



    render() {
        return (
            <div className="home">
                <div className="home-division">
                    <Division className="division" name={"A.L. EAST"} teams={this.state.al_east}/>
                    <Division className="division" name={"A.L. CENTRAL"} teams={this.state.al_central}/>
                    <Division className="division" name={"A.L.  WEST"} teams={this.state.al_west}/>
                </div>
                <div className="home-division">
                    <Division className="division" name={"N.L. EAST"} teams={this.state.nl_east}/>
                    <Division className="division" name={"N.L. CENTRAL"} teams={this.state.nl_central}/>
                    <Division className="division" name={"N.L. WEST"} teams={this.state.nl_west}/>
                </div>
            </div>
        )
    }

}