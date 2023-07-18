const e = React.createElement;

class LoadProgramA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentInstruction: 0,
            isHoveredPrevious: false,
            isHoveredNext: false,
            isTimerInterruptAlertShown: false,
        };
    }

    handleNext = () => {
        const { currentInstruction } = this.state;
        if (currentInstruction === 4) {
            this.setState({ isTimerInterruptAlertShown: true });
            window.alert('Timer Interrupt!');
            const interruptSection = document.querySelector('.interrupt_section');
            ReactDOM.render(e(TimerInterruptComponent), interruptSection);
        } else {
            this.setState((prevState) => ({
                currentInstruction: prevState.currentInstruction + 1,
            }));
        }
    };

    handlePrevious = () => {
        this.setState((prevState) => ({
            currentInstruction: prevState.currentInstruction - 1,
        }));
    };

    handleMouseEnterPrevious = () => {
        this.setState({ isHoveredPrevious: true });
    };

    handleMouseLeavePrevious = () => {
        this.setState({ isHoveredPrevious: false });
    };

    handleMouseEnterNext = () => {
        this.setState({ isHoveredNext: true });
    };

    handleMouseLeaveNext = () => {
        this.setState({ isHoveredNext: false });
    };

    render() {
        const instructions = [
            "pushq %rbp",
            "movq %rsp, %rbp",
            "movl $5, -12(%rbp)",
            "movl $10, -8(%rbp)",
            "movl -12(%rbp), %edx",
            "movl -8(%rbp), %eax",
            "addl %edx, %eax",
            "movl %eax, -4(%rbp)",
            "movl -4(%rbp), %eax",
            "popq %rbp",
            "ret",
        ];

        const previousButtonStyles = {
            margin: '0 10px',
            padding: '10px 20px',
            background: 'skyblue',
            border: '1px solid #ccc',
            borderRadius: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            // Hover styles
            background: this.state.isHoveredPrevious ? 'dodgerblue' : 'skyblue',
            color: this.state.isHoveredPrevious ? 'white' : 'black',
            fontWeight: this.state.isHoveredPrevious ? 'bold' : 'normal',
        };

        const nextButtonStyles = {
            margin: '0 10px',
            padding: '10px 20px',
            background: 'skyblue',
            border: '1px solid #ccc',
            borderRadius: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            // Hover styles
            background: this.state.isHoveredNext ? 'dodgerblue' : 'skyblue',
            color: this.state.isHoveredNext ? 'white' : 'black',
            fontWeight: this.state.isHoveredNext ? 'bold' : 'normal',
        };

        return e(
            'div',
            { className: 'load_process_A' },
            e(
                'div',
                { className: 'load_process_A' },
                e(
                    'div',
                    {
                        style: {
                            height: '360px',
                            overflowY: 'scroll',
                            position: 'relative',
                            marginTop: 0,
                        },
                    },
                    e(
                        'div',
                        {
                            style: {
                                marginBottom: '40px',
                                paddingLeft: '10px',
                                fontFamily: 'Courier New',
                            },
                        },
                        instructions.map((instruction, index) =>
                            e(
                                'p',
                                {
                                    key: index,
                                    style: {
                                        backgroundColor:
                                            index === this.state.currentInstruction
                                                ? 'yellow'
                                                : 'transparent',
                                    },
                                },
                                instruction
                            )
                        )
                    ),
                    e(
                        'div',
                        {
                            style: {
                                position: 'sticky',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                padding: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                            },
                        },
                        e(
                            'button',
                            {
                                style: previousButtonStyles,
                                onClick: this.handlePrevious,
                                onMouseEnter: this.handleMouseEnterPrevious,
                                onMouseLeave: this.handleMouseLeavePrevious,
                                disabled: this.state.currentInstruction === 0,
                            },
                            'Previous'
                        ),
                        e(
                            'button',
                            {
                                style: nextButtonStyles,
                                onClick: this.handleNext,
                                onMouseEnter: this.handleMouseEnterNext,
                                onMouseLeave: this.handleMouseLeaveNext,
                                disabled:
                                    this.state.currentInstruction === instructions.length - 1,
                            },
                            'Next'
                        )
                    )
                )
            )
        );
    }
}

class TimerInterruptComponent extends React.Component {
    render() {
        return e(
            'div',
            { className: 'interrupt_section' },
            e('h2', null, 'Timer Interrupt'),
            e('p', null, 'save reg(A) to k-Stack(A).'),
            e('p', null, 'move to Kernel mode.'),
            e('p', null, 'move to trap handler.')
        );
    }
}

class CpuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: 0,
            isUserMode: true,
            isKernelMode: false,
            registerSet: [],
        };
    }

    setIP = () => {
        // Get the instruction pointer from the LoadProgramA component
        const ip = document.querySelector('.load_process_A').state.currentInstruction;
        this.setState({ ip: ip });
    };

    checkMode = () => {
        // Return mode as user or kernel based on the boolean values
        if (this.state.isUserMode) {
            return 'user';
        } else if (this.state.isKernelMode) {
            return 'kernel';
        }
    };

    render() {
        return e(
            'div',
            { className: 'cpu_details' },
            e(
                'div',
                { className: 'cpu_details' },
                e('p', null, `ip: ${this.state.ip}`),
                e('p', null, `mode: ${this.checkMode()}`),
                e('p', null, `register set: ${this.state.registerSet}`)
            )
        );
    }
}

ReactDOM.render(e(LoadProgramA), document.querySelector('.load_process_A'));
ReactDOM.render(e(TimerInterruptComponent), document.querySelector('.interrupt_section'));
ReactDOM.render(e(CpuComponent), document.querySelector('.cpu_details'));