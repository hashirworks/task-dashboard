import React from "react";

class ActivityLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      toast: "",
    };
    this.timer = null;
    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount() {
    console.log("logger mounted");
    const saved = localStorage.getItem("logs");
    if (saved) {
      this.setState({ logs: JSON.parse(saved) });
    }
    window.addEventListener("keydown", this.handleKey);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.latest != this.props.latest && this.props.latest != "") {
      const newLogs = [this.props.latest, ...this.state.logs];
      this.setState({ logs: newLogs, toast: this.props.latest });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({ toast: "" });
      }, 2000);
    }
    if (prevState.logs != this.state.logs) {
      localStorage.setItem("logs", JSON.stringify(this.state.logs));
    }
  }

  componentWillUnmount() {
    console.log("logger unmounted");
    clearTimeout(this.timer);
    window.removeEventListener("keydown", this.handleKey);
  }

  handleKey(e) {
    if (e.key == "Escape") {
      this.setState({ toast: "" });
    }
  }

  clearLogs() {
    this.setState({ logs: [] });
  }

  render() {
    return (
      <div>
        {this.state.toast && <p>TOAST: {this.state.toast}</p>}
        <button onClick={() => this.clearLogs()}>Clear Logs</button>
        {this.state.logs.length == 0 ? (
          <p>No activity yet</p>
        ) : (
          <ul>
            {this.state.logs.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default ActivityLogger;
