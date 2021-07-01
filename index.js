class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      display: "0",
      cal: 'zero'
    }
  }
  handleClick = (event) => {
    if (this.state.cal === "zero") {
      if (event.target.innerHTML === "0") {
        this.setState({ formula: "0" });
      }
      if (event.target.innerHTML.match(/[1-9]/)) {
        this.setState({ formula: event.target.innerHTML, display: event.target.innerHTML, cal: 'accum' });
      }
      if (event.target.innerHTML === ".") {
        this.setState({ formula: "0" + event.target.innerHTML, display: this.state.display + event.target.innerHTML, cal: 'seperator' });
      }
      if (event.target.innerHTML.match(/[\+\-x\/]/)) {
        this.setState({ formula: "0" + event.target.innerHTML, display: event.target.innerHTML, cal: 'ops' });
      }
    }

    if (this.state.cal === 'accum') {
      if (event.target.innerHTML.match(/[0-9]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: this.state.display + event.target.innerHTML });
      }
      if (event.target.innerHTML.match(/[\+\-x\/]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: event.target.innerHTML, cal: 'ops' });
      }
      if (event.target.innerHTML === '.') {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: this.state.display + event.target.innerHTML, cal: 'seperator' });
      }
    }

    if (this.state.cal === 'seperator') {
      if (event.target.innerHTML.match(/[0-9]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: this.state.display + event.target.innerHTML, cal: 'accum-with-decimal' });
      }
    }

    if (this.state.cal === 'accum-with-decimal') {
      if (event.target.innerHTML === '.') {
        this.setState({ formula: this.state.formula, display: this.state.display, cal: 'accum-with-decimal' });
      }
      if (event.target.innerHTML.match(/[0-9]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: this.state.display + event.target.innerHTML, cal: 'accum-with-decimal' });
      }
      if (event.target.innerHTML.match(/[\+\-x\/]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: event.target.innerHTML, cal: 'ops' });
      }
    }

    if (this.state.cal === 'ops') {
      if (event.target.innerHTML.match(/[0-9]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: event.target.innerHTML, cal: 'accum' });
      }
      if (event.target.innerHTML === '.') {
        this.setState({ formula: this.state.formula + "0" + event.target.innerHTML, display: "0" + event.target.innerHTML, cal: 'accum-with-decimal' });
      }
      if (event.target.innerHTML.match(/[\-]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: event.target.innerHTML, cal: 'ops-minus' });
      }
      if (event.target.innerHTML.match(/[\+x\/]/)) {
        this.setState({ formula: this.state.formula.replace(/.$/, event.target.innerHTML), display: event.target.innerHTML, cal: 'ops' });
      }
    }

    if (this.state.cal === 'ops-minus') {
      if (event.target.innerHTML.match(/[0-9]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: event.target.innerHTML, cal: 'accum' });
      }
      if (event.target.innerHTML.match(/[\-]/)) {
        this.setState({ formula: this.state.formula, display: event.target.innerHTML, cal: 'ops-double-minus' });
      }
      if (event.target.innerHTML.match(/[\+x\/]/)) {
        this.setState({ formula: this.state.formula.slice(0, this.state.formula.length - 2) + event.target.innerHTML, display: event.target.innerHTML, cal: 'ops' });
      }
    }

    if (this.state.cal === 'ops-double-minus') {
      if (event.target.innerHTML.match(/[0-9]/)) {
        this.setState({ formula: this.state.formula + event.target.innerHTML, display: event.target.innerHTML, cal: 'accum' });
      }
      if (event.target.innerHTML.match(/[\-]/)) {
        this.setState({ formula: this.state.formula, display: event.target.innerHTML, cal: 'ops-double-minus' });
      }
    }

    if (event.target.innerHTML === "=") {
      const y = this.state.formula.replace("x", "*")
      const x = y.replace("--", "+")
      this.setState({ formula: this.state.formula + event.target.innerHTML + eval(x), display: eval(x), cal: 'compute' })
    }

    if (this.state.cal === 'compute') {
      if (event.target.innerHTML.match(/[0-9]/)) {
        this.setState({ formula: event.target.innerHTML, display: event.target.innerHTML, cal: 'accum' });
      }
      if (event.target.innerHTML.match(/[\+\-x\/]/)) {
        this.setState({ formula: this.state.display + event.target.innerHTML, display: event.target.innerHTML, cal: 'ops' });
      }
    }


  }
  clear = () => {
    this.setState({ formula: "", display: "0", cal: "zero" })
  }
  render() {
    return (
      <div>
        <h1>JavaScript Calculator</h1>
        <div className="calculator">
          <div>
            <div className="formula-display">{this.state.formula}</div>
            <div className="result-display" id="display">{this.state.display}</div>
          </div>
          <button id="clear" className="ac-button" onClick={this.clear}>AC</button>
          <button id="divide" onClick={this.handleClick}>/</button>
          <button id="multiply" onClick={this.handleClick}>x</button>
          <button id="seven" onClick={this.handleClick}>7</button>
          <button id="eight" onClick={this.handleClick}>8</button>
          <button id="nine" onClick={this.handleClick}>9</button>
          <button id="subtract" onClick={this.handleClick}>-</button>
          <button id="four" onClick={this.handleClick}>4</button>
          <button id="five" onClick={this.handleClick}>5</button>
          <button id="six" onClick={this.handleClick}>6</button>
          <button id="add" onClick={this.handleClick}>+</button>
          <button id="one" onClick={this.handleClick}>1</button>
          <button id="two" onClick={this.handleClick}>2</button>
          <button id="three" onClick={this.handleClick}>3</button>
          <button id="equals" onClick={this.handleClick}>=</button>
          <button id="zero" className="zero-button" onClick={this.handleClick}>0</button>
          <button id="decimal" onClick={this.handleClick}>.</button>
        </div>
        <div id="author">Designed and Coded by ZUMO
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));