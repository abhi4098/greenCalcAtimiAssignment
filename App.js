/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,

} from 'react-native';





export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultText: '',
      calculationText: ''
    }
    this.operations = ['+', '/', '-', '*']
  }


  operationsClicked(operations) {
    switch (operations) {

      case '+':

      case '/':

      case '-':

      case '*':
        const lastChar = this.state.resultText.split('').pop();

        if (this.operations.indexOf(lastChar) > -1) return;


        if (this.state.text == '') return;
        this.setState({
          resultText: this.state.resultText + operations
        })

    }



  }



  buttonIsPressed(text) {

    if (text == '=')
      return this.calculateResult();


    if (this.state.text == '') return;
    this.setState({
      resultText: this.state.resultText + text
    })

    if (text == 'C') {
      let updateText = this.state.resultText.split('');
      updateText.pop();
      this.setState({
        resultText: updateText.join('')
      })
    }

  }

  // --- Parse a calculation string into an array of numbers and operators
  parseCalculationString(s) {

    var calculation = [],
      current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
      if ('*/+-'.indexOf(ch) > -1) {
        if (current == '' && ch == '-') {
          current = '-';
        }
        else {
          calculation.push(parseFloat(current), ch);
          current = '';
        }
      } else {
        current += s.charAt(i);
      }
    }
    if (current != '')
      calculation.push(parseFloat(current));

    return calculation;
  }

  // --- Perform a calculation expressed as an array of operators and numbers
  calculate(calc) {


    var ops = [{
      '*': (a, b) => (parseInt(a, 6) * parseInt(b, 6)).toString(6),
      '/': (a, b) => (parseInt(a, 6) / parseInt(b, 6)).toString(6),
    },
    {
      '+': (a, b) => (parseInt(a, 6) + parseInt(b, 6)).toString(6),
      '-': (a, b) => (parseInt(a, 6) - parseInt(b, 6)).toString(6)
    }
    ],
      newCalc = [],
      currentOp;
    for (var i = 0; i < ops.length; i++) {
      for (var j = 0; j < calc.length; j++) {
        if (ops[i][calc[j]]) {
          currentOp = ops[i][calc[j]];
        } else if (currentOp) {
          newCalc[newCalc.length - 1] =
            currentOp(newCalc[newCalc.length - 1], calc[j]);
          currentOp = null;
        } else {
          newCalc.push(calc[j]);
        }
      }
      calc = newCalc;
      newCalc = [];
    }
    if (calc.length > 1) {

      return calc;
    } else {
      return calc[0];
    }
  }


  calculateResult() {

    const text = this.state.resultText;

    const lastChar = text.split('').pop();
    var updatedStr = '';
    if (this.operations.indexOf(lastChar) > -1)
      updatedStr = text.substring(0, text.length - 1);

    else
      updatedStr = text;



    calcOutput = this.calculate(this.parseCalculationString(updatedStr));

    this.setState({
      calculationText: calcOutput
    })
  }

  render() {
    let btnValue = [[0, 1, 2, 'C'], [3, 4, 5, '=']];
    let rows = [];
    for (let i = 0; i < 2; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {

        row.push(
          <TouchableOpacity
            key={btnValue[i][j]}
            style={styles.button}
            onPress={() => this.buttonIsPressed(btnValue[i][j])}
          >
            <Text style={styles.buttonText}>{btnValue[i][j]}</Text>
          </TouchableOpacity>
        )
      }

      rows.push(<View key={i}
        style={styles.row}>{row}</View>)
    }


    let ops = []
    for (let i = 0; i < 4; i++) {
      ops.push(
        <TouchableOpacity
          key={this.operations[i]}
          style={styles.opsbutton}
          onPress={() => this.operationsClicked(this.operations[i])}
        >
          <Text style={styles.opsButtonText}>{this.operations[i]}</Text>
        </TouchableOpacity>
      )
    }




    return (
      <View
        style={styles.container}>

        <View
          style={styles.resultArea}>
          <Text
            style={styles.resultAreaText}>
            {this.state.resultText} </Text>

        </View>

        <View
          style={styles.calculationArea}>
          <Text style={styles.calculationAreaText}>
            {this.state.calculationText} </Text>

        </View>

        <View
          style={styles.operationArea}>
          {ops}

        </View>

        <View
          testID={'buttonArea'}
          style={styles.buttonsArea}>
          <View style={styles.numbersArea}>

            {rows}
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'green',
    margin: 5

  },
  resultArea: {
    flex: 3,
    backgroundColor: '#D5F5E3',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 7,


  },
  resultAreaText: {
    fontSize: 30,
    color: '#2E8B57',
    fontStyle: 'italic'


  },
  calculationAreaText: {
    fontSize: 25,
    color: '#006400'
  },

  buttonsArea: {
    flex: 2,
    flexDirection: 'row',



  },
  button: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: '#98FB98'

  },
  opsbutton: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#556B2F'

  },
  buttonText: {
    fontSize: 30,
    color: '#006400'
  },

  opsButtonText: {
    fontSize: 30,
    color: '#90EE90'
  },


  numbersArea: {
    flex: 2,
    backgroundColor: 'green'
  },

  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  operationArea: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'green'

  },
  calculationArea: {
    flex: 1,
    backgroundColor: '#D5F5E3',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 7,
    marginBottom: 10

  }

});
