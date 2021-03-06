// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             cc: 2
//         }
//     }
//
//     startTimer = () => {
//         console.log('clicked');
//         this.setState(() => ({cc: 5}), () => {
//             console.log(this.state)
//         });
//         console.log('a', this.state);
//     };
//
//     render() {
//         return (
//             <div>
//                 <button onClick={this.startTimer}>start</button>
//                 <div>{this.state.cc}</div>
//                 <TimerContainer startCountdownFrom={this.state.cc}/>
//             </div>)
//     }
// }
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

class WorkoutContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
            workoutExerciseLogs: []
        }
    }

    startWorkout = () => {
        this.setState((prevState) => ({
            started: true
        }));
    };

    workoutComplete = (workoutLog) => {
        this.setState((prevState) => ({
            completed: true,
            workoutLog: workoutLog
        }));
        $.ajax({
            url: "/api/addWorkoutLog",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(workoutLog),
            async: false,
            cache: false,
            processData: false,
            success: function (resposeJsonObject) {
                // Success Message Handler
                console.log('done', resposeJsonObject)

            }
        });

    };

    render() {
        return (<div>
            {!this.state.started ?
                <div>
                    <ul className={'list-group'}>
                        {this.props.workout.workoutExercises.map((workoutExercise) => {
                            return (
                                <li className={"list-group-item"}>{workoutExercise.exercise.name} {workoutExercise.sets}X{workoutExercise.reps} {workoutExercise.restInSeconds}sec </li>
                            );
                        })}
                    </ul>
                    <button className={"btn-primary btn-lg mt-3"}
                            onClick={() => this.startWorkout()}>Start Workout
                    </button>
                </div> : (!this.state.completed ?
                    (<Workout workout={this.props.workout}
                              onWorkoutComplete={this.workoutComplete}/>) : (
                        <div><h2>Workout Complete</h2></div>))}
        </div>)
    }
}

class Workout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exerciseNumber: 0,
            currentWorkoutExercise: props.workout.workoutExercises[0],
            startDateTime: ticks(),
            workoutExerciseLogs: []
        }
    }

    resetComponent = () => {
        this.setState(() => ({
            exerciseNumber: 0,
            currentWorkoutExercise: this.props.workout.workoutExercises[0],
            startDateTime: ticks(),
            workoutExerciseLogs: []
        }));
    };

    componentWillReceiveProps() {
        this.resetComponent();
    }

    componentDidMount() {
        this.resetComponent()
    }

    onExerciseComplete = (completedWorkoutExercise) => {
        //completedWorkoutExercise was last exercise
        let nextExerciseNumber = this.state.exerciseNumber + 1
        let wasLastExerciseInWorkout = this.state.exerciseNumber === this.props.workout.workoutExercises.length - 1;
        if (wasLastExerciseInWorkout) {
            this.props.onWorkoutComplete({
                workoutExerciseLogs: this.state.workoutExerciseLogs.concat(completedWorkoutExercise),
                workout: this.props.workout,
                startDateTime: this.state.startDateTime,
                endDateTime: ticks()
            })
        } else {
            this.setState((prevState) => ({
                exerciseNumber: nextExerciseNumber,
                currentWorkoutExercise: this.props.workout.workoutExercises[nextExerciseNumber],
                workoutExerciseLogs: prevState.workoutExerciseLogs.concat(completedWorkoutExercise)
            }));
        }
    };

    render() {
        return (<div>
            {<Exercise
                workoutExercise={this.state.currentWorkoutExercise}
                nextExercise={this.nextExercise}
                isLastExercise={this.state.exerciseNumber === this.props.workout.workoutExercises.length - 1}
                onExerciseComplete={this.onExerciseComplete}
            />}
        </div>)
    }
}

class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setNumber: 1,
            workoutExerciseSetLogs: [],
            startDateTime: ticks(),
            isLastSet: false
        }
    }

    resetComponent = () => {
        this.setState(() => ({
            setNumber: 1,
            workoutExerciseSetLogs: [],
            startDateTime: ticks(),
            isLastSet: false
        }));
    };

    componentWillReceiveProps() {
        this.resetComponent();
    }

    componentDidMount() {
        this.resetComponent()
    }

    onSetComplete = (workoutExerciseSet) => {
        let completedSetNumber = this.state.setNumber;
        let wasLastSetForExerciseCompleted = completedSetNumber === this.props.workoutExercise.sets;
        let nextSetNumber = this.state.setNumber + 1;
        let isNextSetLastSetInExercise = (nextSetNumber === this.props.workoutExercise.sets);

        if (wasLastSetForExerciseCompleted) {
            this.props.onExerciseComplete({
                workoutExerciseSetLogs: this.state.workoutExerciseSetLogs.concat(workoutExerciseSet),
                exercise: this.props.workoutExercise.exercise,
                startDateTime: this.state.startDateTime,
                endDateTime: ticks()
            });
        } else {
            this.setState((prevState) => ({
                setNumber: nextSetNumber,
                workoutExerciseSetLogs: prevState.workoutExerciseSetLogs.concat(workoutExerciseSet),
                isLastSet: (isNextSetLastSetInExercise)
            }));
        }
    };

    render() {
        return (
            <div>
                {
                    <ExSet
                        exercise={this.props.workoutExercise.exercise}
                        setNumber={this.state.setNumber}
                        sets={this.props.workoutExercise.sets}
                        reps={this.props.workoutExercise.reps}
                        restInSeconds={this.props.workoutExercise.restInSeconds}
                        onWorkoutExerciseSetComplete={this.onSetComplete}
                        skipTimer={this.props.isLastExercise && this.state.isLastSet}
                    />
                }
            </div>
        )
    }
}

class ExSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTimer: false,
            startDateTime: ticks(),
            reps: props.reps
        }
    }

    resetComponent = () => {
        this.setState(() => ({
            showTimer: false,
            startDateTime: ticks(),
            reps: this.props.reps
        }));
    };

    componentWillReceiveProps() {
        this.resetComponent();
    }

    componentDidMount() {
        this.resetComponent()
    }

    onWorkoutExerciseSetComplete = () => {
        this.props.onWorkoutExerciseSetComplete({
            reps: this.state.reps,
            weight: this.state.weight,
            startDateTime: this.state.startDateTime,
            endDateTime: ticks()
        });
    };
    onNextSetButtonClick = () => {
        if (this.props.skipTimer) {
            this.onWorkoutExerciseSetComplete();
        } else {
            this.setState(() => ({showTimer: true}))
        }
    };
    setReps = (value) => {
        this.setState(() => ({reps: parseInt(value, 10)}));
    };
    setWeight = (value) => {
        this.setState(() => ({weight: parseFloat(value)}));
    };
    onTimerElapsed = () => {
        this.onWorkoutExerciseSetComplete();
    };
    exerciseComponent = () => (<div>
            <h2>{this.props.exercise.name}</h2>
            <div className={'text-center'}>
                <img className="col-12 col-md-7"
                     src={this.props.exercise.image}/>
            </div>
            <h2>Set {this.props.setNumber} of {this.props.sets}</h2>
            <p>{this.props.exercise.description}</p>
            <div className="form-row">
                <div className="input-group col-6">
                    <label className="col-12 mb-0 pl-0"> Reps</label>
                    <input type="number" className="col-12 form-control"
                           value={this.state.reps || ''}
                           onChange={(e) => {
                               this.setReps(e.target.value)
                           }}/>
                </div>
                <div className="input-group col-6"><label
                    className="col-12 mb-0 pl-0">Weight</label>
                    <input type="number" className="col-12 form-control"
                           value={this.state.weight || ''} onChange={(e) => {
                        this.setWeight(e.target.value)
                    }}/>
                    <div className="input-group-prepend">
                        <div className="input-group-text">lbs</div>
                    </div>
                </div>
            </div>
            <button className={"btn-primary btn-lg mt-3"}
                    onClick={this.onNextSetButtonClick}>Next
            </button>
        </div>
    );

    timerComponent = () => ((<TimerContainer
        startCountdownFrom={this.props.restInSeconds}
        timerElapsed={this.onTimerElapsed}
    />));

    render() {
        return (
            <div>
                {!this.state.showTimer ? this.exerciseComponent() :
                    this.timerComponent()}
            </div>
        )
    }


}

class TimerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsedTimeRemaining: props.startCountdownFrom
        }
    }

    componentDidMount() {
        this.startCountdown();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({elapsedTimeRemaining: nextProps.startCountdownFrom}));
        this.startCountdown();
    }

    startCountdown = () => {
        this.intervalHandle = setInterval(this.decrement, 1000)
    };
    resetTimer = () => {
        clearInterval(this.intervalHandle);
        this.props.timerElapsed();
    };
    decrement = () => {
        if (this.state.elapsedTimeRemaining === 0) {
            this.resetTimer();
            return;
        }
        this.setState((prevState) => ({elapsedTimeRemaining: prevState.elapsedTimeRemaining - 1}));
    };

    render() {
        return <div className={"clockContainer"}><Timer
            seconds={this.state.elapsedTimeRemaining}></Timer>
            <div className={"p-5"}>
                <button className={"btn-secondary btn-lg btn-block"}
                        onClick={() => this.resetTimer()}>Skip
                </button>
            </div>
        </div>
    }
}

function Timer(props) {
    return (
        <div>
            <div className="clock" style={{fontSize: '10em'}}>
                {props.seconds}
            </div>
        </div>
    );
}

const domContainer =
    document.querySelector('#workout-react-container');
ReactDOM.render(<App/>, domContainer);