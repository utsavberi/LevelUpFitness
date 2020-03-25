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
            workoutLogs: {workout: props.workout},
            workoutExerciseLogs: []
        }
    }

    startWorkout = () => {
        this.setState((prevState) => ({
            started: true,
            workoutLogs: {
                ...prevState.workoutLogs,
                startDateTime: (new Date()).getTime()
            }
        }));
    };

    workoutComplete = () => {
        this.setState((prevState) => ({
            completed: true,
            workoutLogs: {
                ...prevState.workoutLogs,
                endDateTime: (new Date()).getTime()
            }
        }));
    };

    render() {
        return (<div className={"container"}>
            {!this.state.started ?
                <div>
                    <ul>
                        {this.props.workout.workoutExercises.map((workoutExercise) => {
                            return (
                                <li>{workoutExercise.exercise.name} {workoutExercise.sets}X{workoutExercise.reps} {workoutExercise.restInSeconds}sec </li>
                            );
                        })}
                    </ul>
                    <button className={"btn-primary"}
                            onClick={() => this.startWorkout()}>Start Workout
                    </button>
                </div> : (!this.state.completed ?
                    (<Workout workout={this.props.workout}
                              workoutComplete={this.workoutComplete}/>) : (
                        <div><h1>Workout Complete</h1></div>))}
        </div>)
    }
}

class Workout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workout: props.workout,
            i: 0,
            currentWorkoutExercise: props.workout.workoutExercises[0],
            workoutLog: {}
        }
    }

    nextExercise = () => {
        if (this.state.i != this.props.workout.workoutExercises.length - 1) {
            this.setState((prevState) => {
                return {
                    i: prevState.i + 1,
                    currentWorkoutExercise: this.props.workout.workoutExercises[prevState.i + 1]
                };
            })
        } else {
            this.props.workoutComplete();
            // this.setState(() => ({workoutComplete: true}));
        }

    };

    render() {
        return (<div>
            {<WorkoutExerciseTimer
                workoutExercise={this.state.currentWorkoutExercise}
                nextExercise={this.nextExercise}
                isLastExercise={this.state.i == this.props.workout.workoutExercises.length - 1}
            />}
        </div>)
    }
}

class WorkoutExerciseTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setNumber: 1,
            workoutExerciseLog: {
                startDateTime: null,
                endDateTime: null,
                exercise: null,
                workoutExerciseSetLogs: []
            },
            workoutExerciseSetLog: {
                startDateTime: null,
                endDateTime: null,
                reps: null,
                weight: 10
            }
        }
    }

    componentDidMount() {
        console.log('set 1 ex 1 started', (new Date()).getTime());
        this.logSetStart();

    }

    componentWillReceiveProps() {
        this.setState(() => ({
            setNumber: 1,
            workoutExerciseLog: null,
            workoutExerciseSetLog: null
        }))
        console.log('set started', (new Date()).getTime());
        this.logSetStart();

    }

    logSetStart() {
        this.setState(() => ({workoutExerciseSetLog: {startDateTime: (new Date()).getTime()}}));
    }

    logSetEnd() {
        let workoutExerciseSetLog = {
            ...this.state.workoutExerciseSetLog,
            endDateTime: (new Date()).getTime(),
            reps: this.props.workoutExercise.reps,
            weight: 10
        };
        // this.setState((prevState) => ({workoutExerciseSetLog: {...prevState.workoutExerciseSetLog, endDateTime: (new Date()).getTime(), reps:this.props.workoutExercise.reps, weight:10}}));
        this.setState((prevState) => {
            return {
                workoutExerciseSetLog: null,
                workoutExerciseLog: {
                    ...prevState.workoutExerciseLog,
                    workoutExerciseSetLogs: prevState.workoutExerciseLog ? prevState.workoutExerciseLog.workoutExerciseSetLogs.concat(workoutExerciseSetLog) : [workoutExerciseSetLog]
                }
            }
        });
    }

    next = () => {
        let isLastSetOfLastExercise = this.props.isLastExercise && this.state.setNumber === this.props.workoutExercise.sets;
        if (!this.state.showTimer && !(isLastSetOfLastExercise)) {
            this.setState(() => ({showTimer: true}));
            console.log('set ended1', (new Date()).getTime());
            this.logSetEnd();
        } else {
            if (this.state.setNumber === this.props.workoutExercise.sets) {
                this.setState(() => ({showTimer: false}));
                console.log('set ended', (new Date()).getTime());
                this.logSetEnd();
                let workoutExerciseLog = {}
                this.props.nextExercise();

            } else {
                console.log('set started', (new Date()).getTime());
                this.logSetStart();
                this.setState((prevState) => {
                    return {
                        showTimer: false,
                        setNumber: prevState.setNumber + 1
                    }
                });
            }

        }
    };


    timerElapsed = () => {
        this.next();
    };

    render() {
        return (
            <div>
                {!this.state.showTimer ?
                    <Exercise exercise={this.props.workoutExercise.exercise}
                              setNumber={this.state.setNumber}
                              totalSets={this.props.workoutExercise.sets}
                              next={this.next}/> :
                    <TimerContainer
                        startCountdownFrom={this.props.workoutExercise.restInSeconds / 10}
                        // startCountdownFrom={1}
                        timerElapsed={this.timerElapsed}
                    />}
            </div>
        )
    }
}

class Exercise extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <h1>{this.props.exercise.name}</h1>
            <h2>Set {this.props.setNumber} of {this.props.totalSets}</h2>
            <p>{this.props.exercise.description}</p>
            <button className={"btn-primary"} onClick={this.props.next}>Next
            </button>
        </div>)
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
        return <div><Timer seconds={this.state.elapsedTimeRemaining}></Timer>
            <button className={"btn-secondary"}
                    onClick={() => this.resetTimer()}>Skip
            </button>
        </div>
    }
}

class Timer extends React.Component {
    render() {
        return (
            <div>
                <div className="clock" style={{fontSize: 100, marginLeft: 100}}>
                    {this.props.seconds}
                </div>
            </div>
        );
    }
}

const domContainer =
    document.querySelector('#workout-react-container');
ReactDOM.render(<App/>, domContainer);