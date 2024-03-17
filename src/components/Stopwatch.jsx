import React from "react";

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, laps: [], displayedTime: "00:00:00:00" };
  }

  componentDidMount() {}
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick = () => {
    this.setState((state) => {
      return {
        time: state.time + 1,
        displayedTime: this.formatTime(this.state.time),
      };
    });
  };

  start = () => {
    this.timer = setInterval(() => {
      this.tick();
      // this.newTime = this.formatTime(this.state.time);
    }, 10);
  };

  stop = () => {
    clearInterval(this.timer);
    this.setState({ time: 0, displayedTime: "00:00:00:00" });
    this.newTime = 0;
  };

  lap = () => {
    this.setState((state) => {
      return { laps: [...state.laps, state.displayedTime] };
    });
  };

  formatTime = (time) => {
    const mlsec = Math.floor(time % 100);
    const sec = Math.floor((time % 6000) / 100);
    const min = Math.floor((time % 360000) / 6000);
    const hours = Math.floor(time / 360000);
    return (
      this.transform(hours) +
      ":" +
      this.transform(min) +
      ":" +
      this.transform(sec) +
      ":" +
      this.transform(mlsec)
    );
  };

  transform = (time) => {
    return time < 10 ? "0" + time : time;
  };

  render() {
    return (
      <>
        <h1> {this.state.displayedTime}</h1>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>reset</button>
        <button onClick={this.lap}>lap</button>

        {this.state.laps.map((lap, i) => {
          return <p key={`lap-${i}`}>{lap}</p>;
        })}
      </>
    );
  }
}

export default Stopwatch;
