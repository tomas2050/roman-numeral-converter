const { TransitionGroup, CSSTransition } = ReactTransitionGroup;
class Header extends React.Component {
  render() {
    return (
      <header className="bg-warning">
        <h1 className="display-4 text-center">{this.props.name}</h1>
      </header>
    );
  }
}
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", result: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  roman_to_num(char) {
    switch (char) {
      case "I":
        return 1;
      case "V":
        return 5;
      case "X":
        return 10;
      case "L":
        return 50;
      case "C":
        return 100;
      case "D":
        return 500;
      case "M":
        return 1000;
      default:
        return false;
    }
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    if (isNaN(this.state.value)) {
      let result = this.roman_to_num(this.state.value.charAt(0));
      let x, y;
      for (let i = 1; i < this.state.value.length; i++) {
        x = this.roman_to_num(this.state.value.charAt(i));
        y = this.roman_to_num(this.state.value.charAt(i - 1));
        if (x > y) {
          result = result - y * 2 + x;
        } else {
          result += x;
        }
      }
      if (result == false) {
        this.setState({ result: "Invalid Input!" });
      } else this.setState({ result: result });
    } else {
      let roman = {
          M: 1000,
          CM: 900,
          D: 500,
          CD: 400,
          C: 100,
          XC: 90,
          L: 50,
          XL: 40,
          X: 10,
          IX: 9,
          V: 5,
          IV: 4,
          I: 1,
        },
        num = this.state.value,
        result = "",
        element;

      for (element in roman) {
        while (num >= roman[element]) {
          console.log(element);
          result += element;
          num -= roman[element];
        }
      }
      if (result == 0) {
        this.setState({ result: "Invalid Input!" });
      } else this.setState({ result: result });
    }
    event.preventDefault();
  }
  render() {
    return (
      <>
        <form>
          <div className="form-group">
            <label>
              Roman Numeral or Number:
              <input
                className="form-control"
                onChange={this.handleChange}
                placeholder="e.g. IV"
              ></input>
            </label>

            <button
              type="submit"
              className="btn btn-dark"
              onClick={this.handleSubmit}
            >
              Convert
            </button>
          </div>
        </form>
        <TransitionGroup>
          <CSSTransition
            key={this.state.result}
            timeout={500}
            classNames="fade"
          >
            <div>
              <p>result: {this.state.result}</p>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </>
    );
  }
}
class App extends React.Component {
  render() {
    return (
      <>
        <Header name="Roman Numeral Converter" />
        <Form />
      </>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#app"));
