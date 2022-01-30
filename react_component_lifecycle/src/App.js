import React, { Component } from 'react';
import Counter from './components/Counter';

// https://www.youtube.com/watch?v=m_mtV4YaI8c for tutorial

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mount: true,
      ignoreProp: 0,
      seed: 40,
      showErrorComponent: false,
    };

    this.mountCounter = () => this.setState({ mount: true });
    this.unmountCounter = () => this.setState({ mount: false });

    this.ignorePropUpdate = () => this.setState({ ignoreProp: Math.random() });
    this.seedGenerator = () =>
      this.setState({ seed: Number.parseInt(Math.random() * 100, 10) });

    this.toggleErrorOn = () => this.setState({ showErrorComponent: true });
    this.toggleErrorOff = () => this.setState({ showErrorComponent: false });
  }

  render() {
    const { mount, ignoreProp, seed, showErrorComponent } = this.state;

    return (
      <div>
        {mount ? (
          <Counter
            ignoreProp={ignoreProp}
            seed={seed}
            showErrorComponent={showErrorComponent}
          />
        ) : null}
        <button type="button" onClick={this.mountCounter} disabled={mount}>
          Mount Counter
        </button>
        <button type="button" onClick={this.unmountCounter} disabled={!mount}>
          Unmount Counter
        </button>
        <button type="button" onClick={this.seedGenerator}>
          Generate Seed
        </button>
        <button type="button" onClick={this.ignorePropUpdate}>
          Ignore Prop
        </button>
        <button type="button" onClick={this.toggleErrorOn}>
          Toggle Error On
        </button>
        <button type="button" onClick={this.toggleErrorOff}>
          Toggle Error Off
        </button>
      </div>
    );
  }
}

export default App;
