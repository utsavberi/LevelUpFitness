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
                <AddWorkoutForm exercisePicklist={jsondata}/>
            </div>
        )
    }
}

class AddWorkoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            numberOfExercises: 0,
            exerciseOrderId: 0
        }
    }

    addExercise = () => {
        this.setState((prevState) => ({
            numberOfExercises: prevState.numberOfExercises + 1,
            exercises: prevState.exercises.concat({
                exerciseName: prevState.exerciseName,
                exerciseId: prevState.exerciseId,
                exercise: prevState.exercise,
                sets: prevState.sets,
                reps: prevState.reps,
                restInSeconds: prevState.restInSeconds,
                orderId: prevState.exerciseOrderId
            }),
            reps: null,
            sets: null,
            restInSeconds: null,
            exerciseName: null,
            exerciseId: null,
            exercise: null,
            exerciseOrderId: prevState.exerciseOrderId + 1
        }));
    };

    setExercise = (value) => {
        let exercisePicklist = this.props.exercisePicklist;
        let exercise = exercisePicklist.find(o => o.id === parseInt(value)) || null;
        if (exercise) {
            this.setState(() => ({
                exerciseName: exercise ? exercise.name : null,
                exerciseId: value,
                exercise: exercise
            }));
        }
    };

    setSets = (value) => {
        this.setState(() => ({sets: parseInt(value, 10)}));
    };

    setReps = (value) => {
        this.setState(() => ({reps: parseInt(value, 10)}));
    };

    setrestInSeconds = (value) => {
        this.setState(() => ({restInSeconds: parseInt(value, 10)}));
    };
    setWorkoutName = (value) => {
        this.setState(() => ({workoutName: value}))
    };
    saveWorkout = () => {
        let workout = {
            name: this.state.workoutName,
            workoutExercises: this.state.exercises
        };
        $.ajax({
            url: "/api/addWorkout",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(workout),
            async: false,
            cache: false,
            processData: false,
            success: function (resposeJsonObject) {
                window.location.replace("/workouts");

            }
        });
    };

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
                        restInSeconds={e.restInSeconds}
                    />))
                }
                <div className="card">
                    <div className="card-body">
                        <div className={"row"}>
                            <div className={"col-3 p-0"}>
                                <select className={'form-control'}
                                        onChange={(e) => {
                                            this.setExercise(e.target.value)
                                        }} value={this.state.exerciseId || ''}>
                                    <option>Exercise</option>
                                    )
                                    {this.props.exercisePicklist.map((e, i) => (
                                        <option
                                            value={e.id}>{e.name}</option>))}
                                </select>
                            </div>
                            <div className={"col-3 p-0"}>
                                <input className={'form-control'} type="number"
                                       placeholder={'Sets'}
                                       value={this.state.sets || ''}
                                       onChange={(e) => {
                                           this.setSets(e.target.value)
                                       }}/>
                            </div>
                            <div className={"col-3 p-0"}>
                                <input className={'form-control'} type="number"
                                       placeholder={'Reps'}
                                       value={this.state.reps || ''}
                                       onChange={(e) => {
                                           this.setReps(e.target.value)
                                       }}/>
                            </div>
                            <div className={"col-3 p-0"}>
                                <input className={'form-control'} type="number"
                                       placeholder={'restInSeconds(sec)'}
                                       value={this.state.restInSeconds || ''}
                                       onChange={(e) => {
                                           this.setrestInSeconds(e.target.value)
                                       }}/>
                            </div>
                        </div>
                        <div className={"row mt-3"}>
                            <div className={'col-12'}>
                                <button
                                    className={'btn-secondary  btn-lg pull-right'}
                                    onClick={() => {
                                        this.addExercise()
                                    }}
                                    disabled={!this.state.exerciseName
                                    || !this.state.sets
                                    || !this.state.reps
                                    || !this.state.restInSeconds ? true : false}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-6"}>
                        <button className={'btn-primary btn-lg'}
                                onClick={() => {
                                    this.saveWorkout()
                                }}
                                disabled={!this.state.workoutName || this.state.exercises.length == 0}>Done
                        </button>
                    </div>


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
                    : {this.props.restInSeconds} seconds restInSeconds
                </div>
            </div>
        )
    }
}

const domContainer =
    document.querySelector('#add-workout-react-container');
ReactDOM.render(<App/>, domContainer);