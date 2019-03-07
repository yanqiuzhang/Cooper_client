import React, { Component } from 'react';
import { bmiCalculation } from '../Modules/BMICalculator';

class DisplayBmi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '100',
      height: '186',
      method: 'metric',
      weightLabel: 'Weight(kg)',
      heightLabel: 'Height(cm)',
      bmiMessage: ''
    }
  }

  async runCalculator(event) {
    await this.setState({
      [event.target.id]: event.target.value,
    });
    this.Calculator()
  }

  Calculator() { 
    this.setState({
      bmiMessage: bmiCalculation(this.state.weight, this.state.height, this.state.method)
    })
  }

  render() {
    return (
      <>
        <div id='response'>
          {this.state.bmiMessage}
        </div>
        <div>
          <h1>BMI Converter</h1>
          <select id="method" value={this.state.method} onChange={(e) => {
            const method = e.target.value
            let heightLabel
            let weightLabel

            if (method === "metric") {
              weightLabel = "Weight(kg)"
              heightLabel = "Height(cm)"
            } else if (method === "imperial") {
              weightLabel = "Weight(lbs)"
              heightLabel = "Height(inches)"
            }

            this.setState({
              method: e.target.value,
              weightLabel: weightLabel,
              heightLabel: heightLabel
            })
          }
          }>
            <option value="metric" > Metric </option>
            <option value="imperial" > Imperial </option>
          </select>

          <div>
            <label>{this.state.weightLabel}</label>
            <input id="weight" name="weight" value={this.state.weight} onChange={(e) => {this.runCalculator(e) }} />
          </div>

          <div>
            <label>{this.state.heightLabel}</label>
            <input id="height" name="height" value={this.state.height} onChange={(e) =>{this.runCalculator(e) }} />
          </div>
        </div>
      </>
    )
  }
}

export default DisplayBmi