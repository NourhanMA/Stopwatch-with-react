import React from "react";

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      laps: [],
      displayedTime: "00:00:00:00",
      starting: false,
    };
  }

  componentDidMount() {}
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  setData = () => {
    this.setState((state) => {
      return {
        time: state.time + 1,
        displayedTime: this.formatTime(this.state.time),
      };
    });
  };

  start = () => {
    this.setState((state) => {
      return {
        starting: !state.starting,
      };
    });
    if (this.state.starting) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.setData();
      }, 10);
    }
  };

  reset = () => {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      displayedTime: "00:00:00:00",
      laps: [],
      starting: false,
    });
  };

  lap = () => {
    if (this.state.starting) {
      let lap = 0;
      this.setState((state) => {
        if (state.laps.length > 0) {
          lap = state.laps[state.laps.length - 1].total;
        }
        console.log(state);
        return {
          laps: [
            ...state.laps,
            {
              lap: state.time - lap,
              total: state.time,
            },
          ],
        };
      });
    }
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
        <div className="btns">
          <button
            className={this.state.starting ? "stop" : "start"}
            onClick={this.start}
          >
            {this.state.starting ? "Stop" : "Start"}
          </button>
          <button className="reset" onClick={this.reset}>
            Reset
          </button>
          <button
            className={this.state.starting ? "lap" : "disabled"}
            onClick={this.lap}
          >
            Lap
          </button>
        </div>

        {this.state.laps.length != 0 ? (
          <div className="list-row">
            <p className="index">#</p>
            <p>Lap time</p>
            <p>Total time</p>
          </div>
        ) : (
          ""
        )}
        {this.state.laps.map((lap, i) => {
          return (
            <div className="list-row" key={`lap-${i + 1}`}>
              <p className="index">{i + 1}</p>
              <p>{this.formatTime(lap.lap)}</p>
              <p>{this.formatTime(lap.total)}</p>
            </div>
          );
        })}
      </>
    );
  }
}

export default Stopwatch;
