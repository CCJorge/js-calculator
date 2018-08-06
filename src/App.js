import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

//Redux Code
const UPDATERESULT = 'UPDATERESULT'
const actResult = (pExpression) => {return { type: UPDATERESULT, expression: pExpression }}
const stringToResult = (pExpression) => eval(pExpression);
const calculatorReducer = (state = '0', action) => {
  switch (action.type) {
    case UPDATERESULT:
      return stringToResult(action.expression);
      break;
    
    default:
      return state;
      break;
  }
}
const store = createStore(calculatorReducer)
const mapStateToProps = (state) => {return { result: state }}
const mapDispatchToProps = (dispatch) => {
  return {
    makeResult: (pExpression) => {
      dispatch(pExpression);
    }
  }
}

//React Code
class NumberButton extends React.Component {
  constructor(props) {
    super(props)

    this.numberClickHandler = this.numberClickHandler.bind(this)
  }

  numberClickHandler() {}

  render() {
    return (
      <button className='numberButton' onClick={this.numberClickHandler}>{this.props.number}</button>
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

class Presentational extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const numberButtons = []
    for (let i=0; i<10; i++) numberButtons.push(<NumberButton number={i} />);

    return (
      <div className='calculatorContainer'>
        <div className='results'></div>
        <div className='calculatorKeys'>
          <div className='numbers'>
            {numberButtons}
          </div>
          <div className='operators'></div>
        </div>
      </div>
    );
  }
}
const Container = connect(mapStateToProps, mapStateToProps)(Presentational)

export default Presentational;
