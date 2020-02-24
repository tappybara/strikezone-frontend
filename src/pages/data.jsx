import React from 'react'
import '../css/main.css'
import Plot from 'react-plotly.js'

export default class Data extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            pitches: {},
            ptypes: [],
            results: [],
            pitch_glossary: {},
            result_glossary: {},
            data: null,
            layout: null,
            revision: 0,
        }

        this.initPitchGlossary = this.initPitchGlossary.bind(this);
        this.initResultGlossary = this.initResultGlossary.bind(this);
        this.createPitchTrace = this.createPitchTrace.bind(this);
        this.fetchPitchData = this.fetchPitchData.bind(this);
    }

    componentDidMount(){
        ///graphs/<pid>/<date>/<player_team>/<opp_team>
        console.log("first mount");
        this.fetchPitchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.start !== this.props.start){
            console.log("Update Component");
            this.fetchPitchData();
        }
    }

    fetchPitchData() {

        var pid = this.props.pid;
        var start = this.props.start;
        var pteam = this.props.pteam;
 
        fetch(`https://strikezone-api.herokuapp.com/graphs/${pid}/${start.date + ' 2019'}/${pteam}/${start.opp}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
              },
          }).
        then((reply) => {
            return reply.json();
        }).then((data) => {
            var data_pitches = data['pitches'];
            var data_ptypes = data['ptypes'];
            var data_results = data['results'];
            this.setState({
                pitches: data_pitches,
                ptypes: data_ptypes,
                results: data_results
            }, this.initPitchGlossary)

        }).catch((err) => {
            console.log(err);
        });
    }

    initPitchGlossary() {
        let glossary = {}
        glossary['FA'] = ['Fastball', '#FFFD98'] 
        glossary['FF'] = ['Four-seam Fastball', '#BDE4A7']
        glossary['FT'] = ['Two-seam Fastball', '#B3D2B2']
        glossary['FC'] = ['Cutter', '#9FBBCC']
        glossary['SI'] = ['Sinker', '#7A9CC6']
        glossary['SF'] = ['Split-finger Fastball', '#61E8E1']
        glossary['FS'] = ['Splitter', '#F25757']
        glossary['SL'] = ['Slider', '#3626A7']
        glossary['CH'] = ['Changeup', '#E55812']
        glossary['CU'] = ['Curveball', '#FF4365']
        glossary['KC'] = ['Knuckle-curve', '#036D19']
        glossary['KN'] = ['Knuckleball', '#A67DB8']
        glossary['EP'] = ['Eephus', '#8CFF98']

        this.setState({
            pitch_glossary: glossary
        }, this.initResultGlossary)
        
    }

    initResultGlossary() {
        let glossary = {}
        glossary['Groundout'] = '#BF1A2F'
        glossary['Strikeout'] = '#F00699'
        glossary['Lineout'] = '#454E9E'
        glossary['Pop Out'] = '#018E42'
        glossary['Flyout'] = '#F7D002'
        glossary['Single'] = '#7AE7C7'
        glossary['Double'] = '#E16036'
        glossary['Triple'] = '#5F0F40'
        glossary['Home Run'] = '#306B34'
        glossary['Walk'] = '#141414'
        glossary['Hit By Pitch'] = '#F56416'
        glossary['Grounded Into DP'] = '#E28413'
        glossary['Double Play'] = '#44BBA4'

        this.setState({
            result_glossary: glossary
        }, this.createPitchTrace)
        
    }

    createPitchTrace() {

        var pGlossary = this.state.pitch_glossary;
        var rGlossary = this.state.result_glossary;
        var pitches = this.state.pitches;
        var ptypes = this.state.ptypes;
        var results = this.state.results;

        var traces = [];

        for (let type of ptypes)
        {
            var ptype_pitches = []
            for (let atbat of Object.values(pitches))
            {
                const pitch = atbat.filter(pitch => pitch.pt === type);
                ptype_pitches = ptype_pitches.concat(pitch);
            }

            var x_cord = ptype_pitches.map(pitch => parseFloat(pitch.px));
            var y_cord = ptype_pitches.map(pitch => parseFloat(pitch.pz));
            var labels = ptype_pitches.map(pitch => `Pitch Type: ${type} <br>Velocity: ${pitch.pv}`)
            var colour = pGlossary[type][1];
            var pname = pGlossary[type][0];
            
            var trace = {
                x: x_cord,
                y: y_cord,
                type: 'scatter',
                mode: 'markers',
                marker: {color: colour},
                name: pname,
                text: labels,
                visible: true,
                hovertemplate: '%{text}<extra></extra>'
              }

            traces.push(trace);
        }

        for (let result of results)
        {
            var result_pitches = []
            for (let atbat of Object.values(pitches))
            {
                const res = atbat.filter(pitch => pitch.result === result);
                result_pitches = ptype_pitches.concat(res);
            }

            var x_cord = result_pitches.map(pitch => parseFloat(pitch.px));
            var y_cord = result_pitches.map(pitch => parseFloat(pitch.pz));
            var labels = result_pitches.map(pitch => `Pitch Type: ${pGlossary[pitch.pt]} <br>Velocity: ${pitch.pv}`)
            
            var trace = {
                x: x_cord,
                y: y_cord,
                type: 'scatter',
                mode: 'markers',
                marker: {color: 'red'},
                name: result,
                text: labels,
                visible: false,
                hovertemplate: '%{text}<extra></extra>'
              }

            traces.push(trace);
        }

        var boolArray = [];
        for (var i = 0; i < ptypes.length; i++)
        {
            boolArray.push(true);
        }

        for (var j = 0; j < results.length; j++)
        {
            boolArray.push(false);
        }
        
        var notBoolArray = boolArray.map((bool) => !bool);

        var updatemenus = [
            {
                type: 'buttons',
                visible: true,
                showactive: true,
                buttons: [
                    {
                        label:"All Pitches",
                        method:"update",
                        args:
                        [
                            "visible", boolArray
                        ]
                    },
                    {
                        label:"Final Pitches",
                        method:"update",
                        args:
                        [
                            "visible", notBoolArray
                        ]
                    }
                ]
            }
        ];

        var start = this.props.start;
        var pteam = this.props.pteam;

        var layout = {
            width: 800,
            height: 650, 
            title: `${start.date + ' 2019'}: ${pteam} ${start.opp}`,
            updatemenus: updatemenus,
            xaxis: {
                'range': [-3, 3],
                'dtick': 0.5
            },
            yaxis: {
                'range': [0, 5],
                'dtick': 0.5
            },
            shapes: [{
                'type': 'rect',
                'x0': -0.708335,
                'y0': 1.5,
                'x1': 0.7,
                'y1': 3.5,
                'line': {
                    'color': 'RoyalBlue',
                },
            }],
        }

        this.setState(
            {
                data: traces,
                layout: layout
            })

    }

    render() {
        console.log(this.state);
        return (
            this.state.data ?
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                
                onButtonClicked={(figure) => this.setState(figure)}
                
            />
            : <div>Loading...</div>
        );
    }
}