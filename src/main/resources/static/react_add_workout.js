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
                <AddWorkoutForm/>
            </div>
        )
    }
}

class AddWorkoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            numberOfExercises: 0
        }
    }

    addExercise = () => {
        this.setState((prevState) => ({
            numberOfExercises: prevState.numberOfExercises + 1,
            exercises: prevState.exercises.concat({
                exerciseName: prevState.exerciseName,
                sets: prevState.sets,
                reps: prevState.reps,
                rest: prevState.rest
            })
        }));
    };

    setExerciseName = (value) => {
        this.setState(() => ({exerciseName: value}));
    };

    setSets = (value) => {
        this.setState(() => ({sets: parseInt(value, 10)}));
    };

    setReps = (value) => {
        this.setState(() => ({reps: parseInt(value, 10)}));
    };

    setRest = (value) => {
        this.setState(() => ({rest: parseInt(value, 10)}));
    };

    render() {
        return (
            <div>
                <input placeholder={'Workout Name'}/>
                {this.state.exercises.map((e, i) => (
                    <Exercise
                        exerciseName={e.exerciseName}
                        sets={e.sets}
                        reps={e.reps}
                        rest={e.rest}
                    />))}
                <input placeholder={'Exercise Name'} onChange={(e) => {
                    this.setExerciseName(e.target.value)
                }}/>
                <input type="number" placeholder={'Sets'} onChange={(e) => {
                    this.setSets(e.target.value)
                }}/>
                <input type="number" placeholder={'Reps'} onChange={(e) => {
                    this.setReps(e.target.value)
                }}/>
                <input type="number" placeholder={'Rest'} onChange={(e) => {
                    this.setRest(e.target.value)
                }}/>
                <button onClick={() => {
                    this.addExercise()
                }}>+
                </button>
            </div>)
    }


}

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div>
            {this.props.exerciseName} {this.props.set} {this.props.reps} {this.props.interval}
        </div>)
    }
}

const domContainer =
    document.querySelector('#add-workout-react-container');
ReactDOM.render(<App/>, domContainer);