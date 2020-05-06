import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { padLeft, range } from '../utility'

class MonthPicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedYear: this.props.year,
    }
  }

  render () {
    const { year, month } = this.props
    const { isOpen, selectedYear } = this.state
    const monthRange = range(12, 1)
    const yearRange = range(9, -4).map(number => number + year)
    return (
      <div className="dropdown month-picker-component" ref={ref => {
        this.node = ref
      }}>
        <p>选择月份</p>
        <button className="btn btn-lg btn-secondary dropdown-toggle" onClick={this.toggleDropdown}>
          {`${year}年 ${padLeft(month)}月`}
        </button>
        {
          isOpen &&
          <div className="dropdown-menu" style={{ display: 'block' }}>
            <div className="row">
              <div className="col border-right years-range">
                {yearRange.map((yearNumber, index) =>
                  <a key={index}
                     role="button"
                     className={(yearNumber === selectedYear) ? 'dropdown-item active text-white' : 'dropdown-item'}
                     onClick={event => {
                       this.selectYear(event, yearNumber)
                     }}
                  >
                    {yearNumber} 年
                  </a>
                )}
              </div>
              <div className="col months-range">
                {monthRange.map((monthNumber, index) =>
                  <a key={index}
                     role="button"
                     className={(monthNumber === month) ? 'dropdown-item active text-white' : 'dropdown-item'}
                     onClick={event => {
                       this.selectMonth(event, monthNumber)
                     }}
                  >
                    {padLeft(monthNumber)} 月
                  </a>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount () {
    document.addEventListener('click', this.handleClick, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClick, false)
  }

  toggleDropdown = event => {
    event.preventDefault()
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  selectYear = (event, yearNumber) => {
    event.preventDefault()
    this.setState({
      selectedYear: yearNumber
    })
  }

  selectMonth = (event, monthNumber) => {
    event.preventDefault()
    this.setState({
      isOpen: false
    })
    this.props.onChange(this.state.selectedYear, monthNumber)
  }

  handleClick = (event) => {
    if (this.node.contains(event.target)) {
      return
    }
    this.setState({
      isOpen: false
    })
  }
}

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MonthPicker
