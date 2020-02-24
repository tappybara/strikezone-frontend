import React from 'react'
import withFirebase from '../components/Firebase/firebase_context';


import PitcherCols from '../components/pitcher_cols.jsx'
import '../css/main.css'

class PitchersBase extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: false,
            starters: null,
            bullpen: [],
            closers: [],
        }

        this.getPitchers = this.getPitchers.bind(this);
    }

    componentDidMount() {
        this.getPitchers();
        console.log(this.props.location.state)
    }

    getPitchers() {
        var team = this.props.match.params.tn;
        console.log(team);
        this.props.firebase.pitchers(team).on('value', snapshot => {
            const object = snapshot.val();

            if (object) {
                const pitcherList = Object.keys(object).map(key => ({
                    ...object[key]
                }));
                console.log(pitcherList)

                const st = pitcherList.filter(player => player.type === "starter");
                const bp = pitcherList.filter(player => player.type === "bullpen");
                const cl = pitcherList.filter(player => player.type === "closer");
                console.log(st)
                this.setState(
                    {
                    starters: st,
                    bullpen: bp,
                    closers: cl,
                    },
                    () => console.log(this.state)
                );
                    
            }
        })
    }

    componentWillUnmount() {
        let team = this.props.match.params.tn;
        this.props.firebase.pitchers(team).off();
    }

    render() {
        const team = this.props.match.params.tn;
        return (
            this.state.starters ?
            <div className="pitchers">
                <div className="pitchers-container">
                    <div className="pitchers-col">
                        <PitcherCols className="division" name={"Starters"} players={this.state.starters} team={team}/>
                    </div>
                    <div className="pitchers-col">
                        <PitcherCols className="division" name={"Bullpen"} players={this.state.bullpen} team={team}/>
                    </div>
                    <div className="pitchers-col">
                        <PitcherCols className="division" name={"Closers"} players={this.state.closers} team={team}/>
                    </div>
                </div>
            </div>
            : <div>Loading...</div>
        )
    
    }
}

const Pitchers = withFirebase(PitchersBase);
export default Pitchers
