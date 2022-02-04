import React, { Component } from 'react';

function ErrorComponent() {
  return <div>{props.ignore}</div>; // try to access some non-existent value
}

class Counter extends Component {
  constructor(props) {
    console.log('Constructor');
    super(props);

    this.state = {
      counter: 0,
    };

    this.increment = () =>
      this.setState((prevState) => ({
        counter: prevState.counter + 1,
      }));

    this.decrement = () =>
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }));
  }

  static getDerivedStateFromProps(props, state) {
    console.log('Get Derived State from Props');
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log('Component Did Mount');
    console.log('-------------------');
  }

  shouldComponentUpdate(nextProps) {
    const { ignoreProp } = this.props;
    // ignoreProp is a random value, if it changed, then someone clicked the ignoreProp button and we don't want to render
    if (nextProps.ignoreProp && ignoreProp !== nextProps.ignoreProp) {
      console.log('Should Component Update - DO NOT RENDER');
      console.log('-------------------');
      return false;
    }
    console.log('Should Component Update - RENDER');
    return true;
  }

  componentDidUpdate() {
    console.log('Component Did Update');
    console.log('-------------------');
  }

  componentDidCatch(error) {
    console.log('Component Did Catch');
    this.setState({ error });
  }

  componentWillUnmount() {
    console.log('Component Will Unmount');
    console.log('-------------------');
  }

  getSnapshotBeforeUpdate() {
    console.log('Get Snapshot');
    return null;
  }

  render() {
    console.log('Render');
    const { showErrorComponent } = this.props;
    const { counter, error } = this.state;

    if (showErrorComponent && error) {
      return <div>We have encountered an error! {error.message}</div>;
    }

    return (
      <div>
        <div className="counter">Counter: {counter}</div>

        <button type="button" onClick={this.increment}>
          Increment
        </button>
        <button type="button" onClick={this.decrement}>
          Decrement
        </button>
        {showErrorComponent ? <ErrorComponent /> : null}
      </div>
    );
  }
}

export default Counter;
