import React, { Component } from 'react'
import MonthPicker from '../components/MonthPicker'
import logo from '../logo.svg'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from '../utility'
import TotalPrice from '../components/TotalPrice'
import ViewTab from '../components/ViewTab'
import CreateBtn from '../components/CreateBtn'
import PriceList from '../components/PriceList'
import { Tabs, Tab } from '../components/Tabs'
import Ionicon from 'react-ionicons'

const tabsText = [LIST_VIEW, CHART_VIEW]

export const categories = {
  '1': {
    'id': 1,
    'name': '旅行',
    'type': 'outcome',
    'iconName': 'ios-plane'
  },
  '2': {
    'id': 2,
    'name': '理财',
    'type': 'income',
    'iconName': 'logo-yen'
  }
}

export const items = [
  {
    'id': 1,
    'title': '旅游',
    'price': 200,
    'date': '2020-05-05',
    'cid': 1
  },
  {
    'id': 2,
    'title': '理财',
    'price': 400,
    'date': '2020-06-05',
    'cid': 2
  }
]

export const newItem = {
  'id': 3,
  'title': '旅游',
  'price': 300,
  'date': '2020-05-05',
  'cid': 1
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: tabsText[0]
    }
  }

  render () {
    const { items, currentDate, tabView } = this.state
    const tabIndex = tabsText.findIndex(tabText => tabText === tabView)
    let totalIncome = 0, totalOutcome = 0
    const itemsWithCategory = items.map(item => {
      item.category = categories[item.cid]
      return item
    }).filter(item => {
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    })
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      } else if (item.category.type === TYPE_INCOME) {
        totalIncome += item.price
      }
    })
    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row mb-5 justify-content-center">
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <div className="row">
            <div className="col">
              <MonthPicker year={currentDate.year} month={currentDate.month} onChange={this.changeDate}/>
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome}/>
            </div>
          </div>
        </header>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
            <Tab>
              <Ionicon className="rounded-circle mr-2"
                       fontSize="25px"
                       color={'#007bff'}
                       icon='ios-paper'
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon className="rounded-circle mr-2"
                       fontSize="25px"
                       color={'#007bff'}
                       icon='ios-pie'
              />
              图表模式
            </Tab>
          </Tabs>
          <CreateBtn onClick={this.createItem}/>
          {
            tabView === LIST_VIEW &&
            <PriceList items={itemsWithCategory}
                       onModifyItem={this.modifyItem}
                       onDeleteItem={this.deleteItem}
            />
          }
          {
            tabView === CHART_VIEW &&
            <h1 className="chart-title">图表区域</h1>
          }
        </div>
      </React.Fragment>
    )
  }

  changeView = index => {
    this.setState({
      tabView: tabsText[index]
    })
  }

  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month }
    })
  }

  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items]
    })
  }

  modifyItem = modifyItem => {
    const modifyItems = this.state.items.map(item => {
      if (item.id === modifyItem.id) {
        return {
          ...item, title: 'new title'
        }
      } else {
        return item
      }
    })
    this.setState({
      items: modifyItems
    })
  }

  deleteItem = deleteItem => {
    const filteredItems = this.state.items.filter(item => item.id !== deleteItem.id)
    this.setState({
      items: filteredItems
    })
  }
}

export default Home
