import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

//Redux Code
const UPDATERESULT = 'UPDATERESULT'
const UPDATEEXPRESSION = 'UPDATEEXPRESSION'
const actResult = (pExpression) => {return { type: UPDATERESULT, expression: pExpression }}
const actUpdateCurrentExpression = (pNewInput) => {return { type: UPDATEEXPRESSION, newInput: pNewInput }}
const defaultState = {
  result: '0',
  currentExpression: '',
  inputHistory: [],
  resultHistory: []
}

const stringToResult = (pExpression) => eval(pExpression);
const evaluateInput = (latestInput, newInput) => {
  let regex = /[+\-*/]/
  return regex.test(latestInput) && regex.test(newInput);
}

const calculatorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATERESULT:
      return {
        result: stringToResult(action.expression),
        currentExpression: evaluateInput(state.inputHistory[state.inputHistory.length-1], action.newInput) ? state.currentExpression : state.currentExpression+action.newInput
      };
      break;

    case UPDATEEXPRESSION:
      return { result: state.result, currentExpression: state.currentExpression+action.newInput }
    
    default:
      return state;
      break;
  }
}
const store = createStore(calculatorReducer)
const mapStateToProps = (state) => {return { result: state.result, currentExpression: state.currentExpression }}
const mapDispatchToProps = (dispatch) => {
  return {
    makeResult: function (pExpression) {
      dispatch(actResult(pExpression));
    },
    updateCurrentExpression: function (pNewExpression) {
      dispatch(actUpdateCurrentExpression(pNewExpression))
    }
  }
}

//React Code

class Presentational extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const numberButtons = []
    for (let i=0; i<10; i++) numberButtons.push(<NumberButton key={i} number={i} updateExpression={this.props.updateCurrentExpression} />);

    return (
      <div className='calculatorContainer'>
        <div className='results'>
          <Result result={this.props.result} className='result' />
          <Expression currentExpression={this.props.currentExpression} className='expression' />
        </div>
        <div className='calculatorKeys'>
          <div className='numbers grid'>
            {numberButtons}
          </div>
          <div className='operators'></div>
        </div>
      </div>
    );
  }
}

class NumberButton extends React.Component {
  constructor(props) {
    super(props)

    this.numberClickHandler = this.numberClickHandler.bind(this)
  }

  numberClickHandler() {
    this.props.updateExpression(this.props.number)
  }

  render() {
    return (
      <div className='gridItem'><button className='numberButton' onClick={this.numberClickHandler} value={this.props.number}>{this.props.number}</button></div>
    );
  }
}

class OperationButton extends React.Component {
  constructor(props) {
    super(props)
    this.operationClickHandler = this.operationClickHandler.bind(this)
  }

  operationClickHandler() {}

  render() {
    return (
      <button className='operationButton' onClick={this.operationClickHandler}>{this.props.operation}</button>
    );
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <p className="result">{this.props.result}</p>
    )
  }
}

class Expression extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <p className='current-expression'>{this.props.currentExpression}</p>
    )
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational)
class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default AppWrapper;
