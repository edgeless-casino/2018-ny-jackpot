import React, { Component } from 'react';
import { getWinningKey, keysLenght } from '../rng.service';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverSeed: '0x040c6d229d7b1e14b13c17a23aa4e33bdd28a81f',
      clientSeed: '0x7091778a4871f92ce0a39d1c4135a550462b63b66d5fb39f3aca80a1831a1385',
      keyCount: keysLenght,
      serialNumber: null,
      uniqueKeyId: null,
      createdAt: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getKey();
  }

  handleSubmit (e) {
    e.preventDefault();
    this.getKey();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value ? value : (name === 'keyCount' ? 1 : '0x0')
    });
  }

  getKey() {
    const winningKey = getWinningKey(this.state.clientSeed, this.state.serverSeed, Number(this.state.keyCount));
    this.setState({
      serialNumber: winningKey.serialNumber,
      uniqueKeyId: winningKey.uniqueKeyId,
      createdAt: winningKey.createdAt,
    });
  }

  render () {
    return (
      <div className="block">
        <form onSubmit={this.handleSubmit} >
          Server seed:
          <input name="serverSeed" type="text" ref="serverSeed" value={this.state.serverSeed} onChange={this.handleInputChange}/>
          Client seed:
          <input name="clientSeed" type="text" ref="clientSeed" value={this.state.clientSeed} onChange={this.handleInputChange}/>
          Participant key count:
          <input name="keyCount" type="number" ref="keyCount" value={this.state.keyCount} onChange={this.handleInputChange}/>
          <input type="submit" value="Verify"/>
          <hr/>
          <div className="winner">
            <div>
              Serial Number: {this.state.serialNumber}</div>
            <div>
              Unique Key Id: {this.state.uniqueKeyId}</div>
            <div>
              Key date: {this.state.createdAt}</div>
          </div>
        </form>

        <style jsx>{`
        .block {
          width: 320px;
          margin: 20px auto;
          padding: 15px;
        }
        input {
        width: 100%;
        height: 26px;
        margin-bottom: 5px;
        background: none;
        border: 1px solid #dedede;
        }
        input[type=submit] {
        cursor: pointer;
        width: 100%;
        border: none;
        background: #28a745;
        color: #fff;
        }
        .winner {
        width: 100%;
        }
        .winner > div {
        margin-bottom: 5px;
        }
    `}</style>
      </div>
    )
  }
}

export default Index;
