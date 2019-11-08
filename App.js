/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';


import React, { Component } from "react";
import { switchCase } from '@babel/types';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.operations=['←','/', '*', '-', '+'];
  }

  calculateResult() {
    const text = this.state.resultText;
    /*text.split('').forEach(char => {
      if(char==='+' || char==='*') {
        //doo something
      }
    })*/
    this.setState({
      calculationText: eval(text)
    });
  
  }
  validateInput() {
    const text = this.state.resultText;
  
    switch(text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
      default: 
        return true;
    }
  }

  buttonPressed(text) {
    console.log(text);
    if(text=='.' && this.state.resultText.includes(".")) return
    if(text === '=') {
      return this.validateInput() && this.calculateResult();
    }
    
    this.setState({
      resultText: this.state.resultText+text
    })
  }

  clearAll(operation){
    if(operation === '←') {
      this.setState({
        resultText: "",
        calculationText: ""
      })
    }
  }

  operate(operation) {
    switch(operation) {
      case '←':
        let text = this.state.resultText.split('');
        text.pop();
        this.setState({
          resultText: text.join('')
        })
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop();
        if(this.operations.indexOf(lastChar) > 0) return;


        if(text === "") return;
        this.setState({
          resultText: this.state.resultText + operation
        })
    }
  }
  
  render() {
    let rows = [];
    const nums = [[1,2,3], [4,5,6], [7,8,9], ['.',0,'=']]
    for(let i=0; i<4; i++) {
      let row = [];
      for(let j=0; j<3; j++) {
        row.push(
        <TouchableOpacity key={nums[i][j]} onPress={()=>this.buttonPressed(nums[i][j])} style={styles.btn}>
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>
        )
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    
    let ops=[];
    for(let i=0; i<5; i++) {
      ops.push(
      <TouchableOpacity key={this.operations[i]} style={styles.btn} onPress={() => this.operate(this.operations[i])} onLongPress={()=>this.clearAll(this.operations[i])}>
        <Text style={[styles.btnText, styles.white]}>{this.operations[i]}</Text>
      </TouchableOpacity>
      );

    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calculation: {
    flex: 1,
    backgroundColor: '#B2EBF2',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingEnd: 10
  },
  calculationText: {
    fontSize: 30,
    color: 'black'
  },
  result: {
    flex: 2,
    backgroundColor: '#B2EBF2',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingEnd: 20
  },
  resultText: {
    fontSize: 40,
    color: 'black'
  },
  row: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 30,
    color: 'black'
  },
  white: {
    color: 'white',
    fontWeight: 'bold'
  },
  numbers: {
    flex: 3,
    backgroundColor: 'white'
  },
  operations: {
    flex: 1,
    backgroundColor: '#00BCD4',
    justifyContent: "space-around",
    alignItems: 'stretch'
  } 
})

