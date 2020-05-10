import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import withContext from '../WithContext'
import PropTypes from 'prop-types'
import { Tabs, Tab } from '../components/Tabs'
import CategorySelect from '../components/CategorySelect'
import PriceForm from '../components/PriceForm'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]

class Create extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: TYPE_OUTCOME,
      selectedCategory: null,
      validationPassed: true
    }
  }

  render () {
    const { data } = this.props
    const { items, categories } = data
    const { id } = this.props.match.params
    const { selectedTab, selectedCategory, validationPassed } = this.state
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
        {!validationPassed &&
        <div className="alert alert-danger mt-5" role="alert">
          请选择分类信息
        </div>
        }
      </div>
    )
  }

  componentDidMount () {
    const { id } = this.props.match.params
    this.props.actions.getEditData(id).then(data => {
      const { editItem, categories } = data
      this.setState({
        selectedTab: (id && editItem) ? categories[editItem.cid].type : TYPE_OUTCOME,
        selectedCategory: (id && editItem) ? categories[editItem.cid] : null
      })
    })
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

Create.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object
}

export default withRouter(withContext(Create))
