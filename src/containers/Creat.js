import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Tabs, Tab } from '../components/Tabs'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import withContext from '../WithContext'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

class Create extends Component {
  constructor (props) {
    super(props)
    const { id } = props.match.params
    const { categories, items } = props.data
    this.state = {
      selectedTab: (id && items) ? categories[items[id].cid].type : TYPE_OUTCOME,
      selectedCategory: (id && items) ? categories[items[id].cid] : null,
      validationPassed: true,
    }
  }

  render () {
    const { data } = this.props
    const { items, categories } = data
    const { selectedTab, selectedCategory } = this.state
    const { id } = this.props.match.params
    const editItem = (id && items[id]) ? items[id] : {}
    const filterCategories = Object.keys(categories)
      .filter(id => categories[id].type === selectedTab)
      .map(id => categories[id])
    const tabIndex = tabsText.findIndex(text => text === selectedTab)
    return (
      <div className="create-page py-3 px-3 rounded mt-3" style={{ background: '#fff' }}>
        <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelect categories={filterCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={this.selectCategory}
        />
        <PriceForm item={editItem}
                   onFormSubmit={this.submitForm}
                   onCancelSubmit={this.cancelSubmit}
        />
      </div>
    )
  }

  tabChange = index => {
    this.setState({
      selectedTab: tabsText[index]
    })
  }

  selectCategory = category => {
    this.setState({
      selectedCategory: category
    })
  }

  submitForm = (data, isEditMode) => {
    // 未选择 category 类型
    if (!this.state.selectedCategory) {
      this.setState({
        validationPassed: false
      })
      return
    }
    if (!isEditMode) {
      // 新建
      this.props.actions.createItem(data, this.state.selectedCategory.id)
    } else {
      // 编辑
      this.props.actions.updateItem(data, this.state.selectedCategory.id)
    }
    this.props.history.push('/')
  }

  cancelSubmit = () => {
    this.props.history.push('/')
  }
}

export default withRouter(withContext(Create))
