import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppContext } from './AppContext'
import Home from './containers/Home'
import Create from './containers/Creat'
import { flatterArr } from './utility'
import { testCategories, testItems } from './testData'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: flatterArr(testItems),
      categories: flatterArr(testCategories),
    }
  }

  render () {
    return (
      <AppContext.Provider value={{
        state: this.state
      }}>
        <Router>
          <div className="App">
            <div className="container pb-5">
              <Route path="/" exact component={Home}/>
              <Route path="/create" component={Create}/>
              <Route path="/edit/:id" component={Create}/>
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    )
  }
}

export default App
