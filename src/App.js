import React from 'react';
import { connect } from 'react-redux';
import { isWaiting, anyWaiting } from 'redux-waiters';
import { addNumberCreator, addNumberAction, minusNumberCreator, minusNumberAction } from './reducers/counter';
import logo from './logo.svg';
import './App.css';

function App({ adding, minusing, anyLoading, addNumber, minusNumber, counter }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>Number: {counter}</p>
        <button onClick={addNumber}>Add number</button>
        <button onClick={minusNumber}>Minus number</button>
        {adding ? 'Adding...' : ''}
        {minusing ? 'Minusing...' : ''}
        {anyLoading && <p>Any loading...</p>}
      </header>
    </div>
  );
}

const isAddingNumerSelector = isWaiting(addNumberAction.id);
const isMinusingNumerSelector = isWaiting(minusNumberAction.id);

const mapStateToProps = (state) => {
  const {
    waiter,
    counter: { counter }
  } = state;
  return {
    adding: isAddingNumerSelector(waiter),
    minusing: isMinusingNumerSelector(waiter),
    anyLoading: anyWaiting(waiter),
    counter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: () => dispatch(addNumberCreator()),
    minusNumber: () => dispatch(minusNumberCreator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
