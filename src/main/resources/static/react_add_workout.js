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
            }),
            reps: null,
            sets: null,
            rest: null,
            exerciseName: null
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
    setWorkoutName = (value) => {
        this.setState(() => ({workoutName: value}))
    };
    saveWorkout = () => {

    }

    render() {
        return (
            <div>
                <input placeholder={'Workout Name'} className={'form-control'}
                       onChange={(e) => {
                           this.setWorkoutName(e.target.value)
                       }}/>
                {this.state.exercises.map((e, i) => (
                    <Exercise
                        exerciseName={e.exerciseName}
                        sets={e.sets}
                        reps={e.reps}
                        rest={e.rest}
                    />))
                }
                <div className="card">
                    <div className="card-body">
                        <div className={"row"}>
                            <div className={"col-3"}>
                                <input className={'form-control'}
                                       placeholder={'Name'}
                                       value={this.state.exerciseName || ''}
                                       onChange={(e) => {
                                           this.setExerciseName(e.target.value)
                                       }}/>
                            </div>
                            <div className={"col-3"}>
                                <input className={'form-control'} type="number"
                                       placeholder={'Sets'}
                                       value={this.state.sets || ''}
                                       onChange={(e) => {
                                           this.setSets(e.target.value)
                                       }}/>
                            </div>
                            <div className={"col-3"}>
                                <input className={'form-control'} type="number"
                                       placeholder={'Reps'}
                                       value={this.state.reps || ''}
                                       onChange={(e) => {
                                           this.setReps(e.target.value)
                                       }}/>
                            </div>
                            <div className={"col-3"}>
                                <input className={'form-control'} type="number"
                                       placeholder={'Rest'}
                                       value={this.state.rest || ''}
                                       onChange={(e) => {
                                           this.setRest(e.target.value)
                                       }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className={'btn-secondary  btn-lg pull-right'}
                            onClick={() => {
                                this.addExercise()
                            }}
                            disabled={!this.state.exerciseName
                            || !this.state.sets
                            || !this.state.reps
                            || !this.state.rest ? true : false}>
                        +
                    </button>
                </div>
                <div>
                    <button className={'btn-primary btn-lg'} onClick={() => {
                        this.saveWorkout()
                    }}
                            disabled={!this.state.workoutName || this.state.exercises.length == 0}>Done
                    </button>
                </div>
            </div>)
    }
}

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (

            <div className={"card"}>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>{this.props.exerciseName} </h5>
                    {this.props.sets} Sets X {this.props.reps} Reps
                    : {this.props.rest} seconds rest
                </div>
            </div>
        )
    }
}

const domContainer =
    document.querySelector('#add-workout-react-container');
ReactDOM.render(<App/>, domContainer);