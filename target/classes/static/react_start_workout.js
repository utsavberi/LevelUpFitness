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

    workoutComplete = (workoutLog) => {
        this.setState((prevState) => ({
            completed: true,
            workoutLogs: {
                ...prevState.workoutLogs,
                endDateTime: (new Date()).getTime()
            },
            www: workoutLog
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
                              onWorkoutComplete={this.workoutComplete}/>) : (
                        <div><h1>Workout Complete</h1></div>))}
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
            // workoutLog: {
            //
            // }
        }
    }

    resetComponent = () => {
        this.setState(() => ({
            exerciseNumber: 0,
            currentWorkoutExercise: this.props.workout.workoutExercises[0],
            startDateTime: ticks(),
            workoutExerciseLogs: []
        }));
    }

    componentWillReceiveProps() {
        this.resetComponent();
    }

    componentDidMount() {
        this.resetComponent()
    }

    // nextExercise = (completedWorkoutExerciseLog) => {
    //     if (this.state.i != this.props.workout.workoutExercises.length - 1) {
    //         this.setState((prevState) => {
    //             return {
    //                 i: prevState.i + 1,
    //                 currentWorkoutExercise: this.props.workout.workoutExercises[prevState.i + 1],
    //                 workoutLog: {
    //                     ...prevState.workoutLog,
    //                     workoutExerciseLog: prevState.workoutLog.workoutExerciseLog.concat(completedWorkoutExerciseLog)
    //                 }
    //             };
    //         }, () => {
    //             if (this.state.i === this.props.workout.workoutExercises.length - 1) {
    //
    //             }
    //         })
    //     } else {
    //         let workoutLog = {
    //             ...this.state.workoutLog,
    //             workoutExerciseLog: this.state.workoutLog.workoutExerciseLog.concat(completedWorkoutExerciseLog)
    //         }
    //         this.props.workoutComplete(workoutLog);
    //     }
    //
    // };

    onExerciseComplete = (completedWorkoutExercise) => {
        debugger;
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
        //if complete one was last exercise

        //increment exercise number
        // update currentWorkoutExercise++

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
            startDateTime: ticks()
            // workoutExerciseLog: {
            //     workoutExerciseSetLogs: [] //todo flatten 1 up
            // },
            // workoutExerciseSetLog: null//{
            //     startDateTime: null,
            //     endDateTime: null,
            //     reps: null,
            //     weight: 10
            // }
        }
    }

    resetComponent = () => {
        this.setState(() => ({
            setNumber: 1,
            workoutExerciseSetLogs: [],
            startDateTime: ticks()
        }));
    }

    componentWillReceiveProps() {
        this.resetComponent();
    }

    componentDidMount() {
        this.resetComponent()
    }

    // componentDidMount() {
    //     console.log('set 1 ex 1 started', (new Date()).getTime());
    //     this.logSetStart();
    //
    // }
    //
    // componentWillReceiveProps() {
    //     this.setState(() => ({
    //         setNumber: 1,
    //         workoutExerciseLog: null,
    //         workoutExerciseSetLog: null,
    //         showTimer: false
    //     }));
    //     console.log('set started', (new Date()).getTime());
    //     this.logSetStart();
    //
    // }
    //
    // logSetStart() {
    //     this.setState(() => ({workoutExerciseSetLog: {startDateTime: (new Date()).getTime()}}));
    // }
    //
    // logSetEnd(callback) {
    //     debugger;
    //     let workoutExerciseSetLog = {
    //         ...this.state.workoutExerciseSetLog,
    //         endDateTime: (new Date()).getTime(),
    //         reps: this.props.workoutExercise.reps,
    //         weight: 10
    //     };
    //     this.setState((prevState) => {
    //         return {
    //             workoutExerciseSetLog: null,
    //             workoutExerciseLog: {
    //                 ...prevState.workoutExerciseLog,
    //                 workoutExerciseSetLogs: prevState.workoutExerciseLog ? prevState.workoutExerciseLog.workoutExerciseSetLogs.concat(workoutExerciseSetLog) : [workoutExerciseSetLog]
    //             }
    //         }
    //     }, callback);
    // }
    //
    // next = () => {
    //     // let isLastSetOfCurrentExercise = this.state.setNumber === this.props.workoutExercise.sets;
    //     // let isLastSetOfLastExercise = this.props.isLastExercise && isLastSetOfCurrentExercise;
    //     // //show timer if if timer not showing and not last set of last exercise ( dont show timer on last set of last exercise)
    //     // if (!this.state.showTimer && !(isLastSetOfLastExercise)) {
    //     //     this.setState(() => ({showTimer: true}));
    //     //     // console.log('set ended1', (new Date()).getTime());
    //     //     this.logSetEnd();
    //     //     return;
    //     // }
    //     //
    //     //
    //     // // if last set of current exercise and timer showing
    //     // if (isLastSetOfCurrentExercise) {
    //     //     this.setState(() => ({showTimer: false}));
    //     //     console.log('set ended', (new Date()).getTime());
    //     //     // this.logSetEnd(() => {
    //     //     let workoutExerciseSetLog = {
    //     //         ...this.state.workoutExerciseSetLog,
    //     //         endDateTime: (new Date()).getTime(),
    //     //         reps: this.props.workoutExercise.reps,
    //     //         weight: 10
    //     //     };
    //     //     let workoutExerciseLog = {
    //     //         exercise: this.props.workoutExercise.exercise,
    //     //         workoutExerciseSetLogs: this.state.workoutExerciseLog.workoutExerciseSetLogs.concat(workoutExerciseSetLog)
    //     //     };
    //     //     this.props.nextExercise(workoutExerciseLog);
    //     //     // });
    //     //
    //     //
    //     // } else {
    //     //     //if not last set and timer showing
    //     //     console.log('set started', (new Date()).getTime());
    //     //     this.logSetStart();
    //     //     this.setState((prevState) => {
    //     //         return {
    //     //             showTimer: false,
    //     //             setNumber: prevState.setNumber + 1
    //     //         }
    //     //     });
    //     // }
    //
    //
    // };


    onSetComplete = (workoutExerciseSet) => {
        let completedSetNumber = this.state.setNumber;
        let wasLastSetForExerciseCompleted = completedSetNumber === this.props.workoutExercise.sets
        let nextSetNumber = this.state.setNumber + 1
        let isNextSetLastSetInExercise = (nextSetNumber === this.props.workoutExercise.sets)
        // this.setState(() => ({
        //     setNumber: nextSetNumber,
        //     workoutExerciseSetLogs: this.state.workoutExerciseSetLogs.concat(workoutExerciseSet),
        //     isLastSet: (isNextSetLastSetInExercise)
        // }), () => {
        if (wasLastSetForExerciseCompleted) {
            debugger;
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
        // });


        //store in this.state.workoutExerciseSets sets array
        //is last set then call parent.exercisecomplete with exercise start time end time
        //else increment state
    };

    render() {
        return (
            <div>
                {
                    <ExSet
                        exercise={this.props.workoutExercise.exercise}
                        setNumber={this.state.setNumber}
                        totalSets={this.props.workoutExercise.sets}
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
    // props:
    //     {
    //         skipTimer:'bool',
    //         onWorkoutExerciseSetComplete:'callback function'
    //         exercise:{name, description}
    //         workoutExercise:{restInSeconds}
    //         setNumber
    //         totalSets
    //         restInSeconds
    //     }

    constructor(props) {
        super(props);
        this.state = {
            showTimer: false,
            startDateTime: ticks()
        }
    }

    resetComponent = () => {
        this.setState(() => ({
            showTimer: false,
            startDateTime: ticks()
        }));
    }

    componentWillReceiveProps() {
        this.resetComponent();
    }

    componentDidMount() {
        this.resetComponent()
    }

    onWorkoutExerciseSetComplete = () => {
        this.props.onWorkoutExerciseSetComplete({
            reps: this.props.reps,
            weight: this.props.weight,
            startDateTime: this.state.startDateTime,
            endDateTime: ticks()
        });
    }
    onNextSetButtonClick = () => {
        if (this.props.skipTimer) {
            this.onWorkoutExerciseSetComplete();
        } else {
            this.setState(() => ({showTimer: true}))
        }
    };

    onTimerElapsed = () => {
        this.onWorkoutExerciseSetComplete();
    };
    exerciseComponent = () => (<div>
        <h1>{this.props.exercise.name}</h1>
        <h2>Set {this.props.setNumber} of {this.props.totalSets}</h2>
        <p>{this.props.exercise.description}</p>
        <button className={"btn-primary"}
                onClick={this.onNextSetButtonClick}>Next
        </button>
    </div>);

    timerComponent = () => ((<TimerContainer
        startCountdownFrom={this.props.restInSeconds / 10}
        // startCountdownFrom={1}
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