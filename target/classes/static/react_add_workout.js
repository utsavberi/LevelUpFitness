
function ticks() {
    return (new Date()).getTime();
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"container"}>
                <WorkoutContainer workout={jsondata}/>
            </div>
        )
    }
}


const domContainer =
    document.querySelector('#add-workout-react-container');
ReactDOM.render(<App/>, domContainer);