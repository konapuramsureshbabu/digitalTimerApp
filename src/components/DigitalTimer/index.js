import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimer: false, seconds: 0, minutes: 25}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  minutesDecrement = () => {
    const {minutes} = this.state

    if (minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  minutesIncrement = () => {
    this.setState(prevState => ({
      minutes: prevState.minutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {minutes, seconds} = this.state
    const isButtonsDisabled = seconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label"> Set Timer limit </p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.minutesDecrement}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{minutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.minutesIncrement}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({isTimer: false, seconds: 0, minutes: 25})
  }

  incrementTimeElapsedInSeconds = () => {
    const {minutes, seconds} = this.state
    const isTimerCompleted = seconds === minutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimer: false})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimer, seconds, minutes} = this.state
    const isTimerCompleted = seconds === minutes * 60

    if (isTimerCompleted) {
      this.setState({seconds: 0})
    }
    if (isTimer) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimer: !prevState.isTimer}))
  }

  renderTimerController = () => {
    const {isTimer} = this.state
    const startOrPauseImageUrl = isTimer
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimer ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimer ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {minutes, seconds} = this.state
    const totalRemainingSeconds = minutes * 60 - seconds
    const requiredMinutes = Math.floor(totalRemainingSeconds / 60)
    const requiredSeconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes =
      requiredMinutes > 9 ? requiredMinutes : `0${requiredMinutes}`
    const stringifiedSeconds =
      requiredSeconds > 9 ? requiredSeconds : `0${requiredSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimer} = this.state
    const labelText = isTimer ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
