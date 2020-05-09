import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppContext } from './AppContext'
import Home from './containers/Home'
import Create from './containers/Creat'
import { flatterArr, ID, parseToYearAndMonth } from './utility'
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
    this.actions = {
      deleteItem: item => {
        delete this.state.items[item.id]
        console.log(this.state.items)
        this.setState({
          items: this.state.items
        })
      },
      createItem: (data, categoryId) => {
        console.log(data)
        console.log(categoryId)
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id: newId, cid: categoryId }
        this.setState({
          items: { ...this.state.items, [newId]: newItem }
        })
      },
      updateItem: (item, updateCategoryId) => {
        const modifiedItem = {
          ...item,
          cid: updateCategoryId,
          timestamp: new Date(item.date).getTime()
        }
        this.setState({
          items: { ...this.state.items, [modifiedItem.id]: modifiedItem },
        })
      }
    }
  }

  render () {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
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
