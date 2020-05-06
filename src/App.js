import React, { Component } from 'react'
import logo from './logo.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MonthPicker from './components/MonthPicker'

const items = [
  {
    'id': 1,
    'title': '旅游',
    'price': 200,
    'date': '2020-05-05',
    'category': {
      'id': 1,
      'name': '旅行',
      'type': 'outcome',
      'iconName': 'ios-plane'
    }
  },
  {
    'id': 2,
    'title': '旅游',
    'price': 400,
    'date': '2020-05-05',
    'category': {
      'id': 2,
      'name': '旅行',
      'type': 'outcome',
      'iconName': 'ios-plane'
    }
  }
]

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        </header>
        <MonthPicker year={2018} month={5} onChange={(year, month) => {
          console.log(year)
          console.log(month)
        }}/>
      </div>
    )
  }
}

export default App
