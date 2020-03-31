class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"container mt-n2"}>
                <LevelProgressContainer/>
            </div>
        )
    }
}

class LevelProgressContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let that = this;
        $.ajax({
            url: "/api/level",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            cache: false,
            processData: false,
            success: function (resposeJsonObject) {
                // Success Message Handler
                that.setState(() => ({levelInfo: resposeJsonObject}));
                console.log('done', resposeJsonObject)
            }
        });
    }

    render() {
        return (<div><LevelInfo levelInfo={this.state.levelInfo}/></div>)
    }
}

function LevelInfo(props) {
    return (<div>
        {props.levelInfo &&
        <div>
            <ProgressBar
                percentage={props.levelInfo.points}
                valuenow={props.levelInfo.points}
                valuemin={props.levelInfo.previousLevelAt}
                valuemax={props.levelInfo.nextLevelAt}
                />
            <div className="row">
                <div className="col-1" style={{"font-size":"10px"}}>{props.levelInfo.previousLevelAt}</div>
                <div className="col-5 text-right border-right"><strong>LEVEL {props.levelInfo.level}</strong></div>
                <div className="col-5">XP {props.levelInfo.points}</div>
                <div className="col-1 text-right" style={{"font-size":"10px"}}>{props.levelInfo.nextLevelAt}</div>
            </div>
        </div>}

    </div>);
}

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={(((props.valuenow-props.valuemin)*100)/(props.valuemax-props.valuemin))}/>
        </div>
    )
};

const Filler = (props) => {
    return <div className="filler" style={{width: `${props.percentage}%`}}/>
};

const domContainer =
    document.querySelector('#home-react-container');
ReactDOM.render(<App/>, domContainer);