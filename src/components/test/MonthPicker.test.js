import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import MonthPicker from '../MonthPicker'

let props = {
  year: 2020,
  month: 5,
  onChange: jest.fn()
}

let wrapper

describe('test MonthPicker component', () => {
  beforeEach(() => {
    wrapper = mount(<MonthPicker {...props} />)
  })
  it('should render the component to match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('render the correct year and month, show correct dropdown status', () => {
    const text = wrapper.find('.dropdown-toggle').first().text()
    expect(text).toEqual('2020年 05月')
    expect(wrapper.find('.dropdown-menu').length).toEqual(0)
    expect(wrapper.state('isOpen')).toEqual(false)
    expect(wrapper.state('selectedYear')).toEqual(props.year)
  })
  it('after click the button, dropdown should show, year list&month list should have the correct items', () => {
    wrapper.find('.dropdown-toggle').simulate('click')
    expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper.find('.dropdown-menu').length).toEqual(1)
    expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9)
    expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12)
    expect(wrapper.find('.years-range .dropdown-item.active').text())
      .toEqual('2020 年')
    expect(wrapper.find('.months-range .dropdown-item.active').text())
      .toEqual('05 月')
    // the first year should be the current year minus 4
    expect(wrapper.find('.years-range .dropdown-item').first().text())
      .toEqual(`${props.year - 4} 年`)
    expect(wrapper.find('.months-range .dropdown-item').first().text())
      .toEqual('01 月')
  })
  it('click the year&month item, should trigger the right status change', () => {
    wrapper.find('.dropdown-toggle').simulate('click')
    wrapper.find('.years-range .dropdown-item').first().simulate('click')
    expect(wrapper.find('.years-range .dropdown-item').first().hasClass('active'))
      .toEqual(true)
    expect(wrapper.state('selectedYear')).toEqual(2016)
    wrapper.find('.months-range .dropdown-item').first().simulate('click')
    expect(wrapper.state('isOpen')).toEqual(false)
    expect(props.onChange).toHaveBeenCalledWith(2016, 1)
  })
  it('after the dropdown is shown, click the document should close the dropdown', () => {
    let eventMap = {}
    // 添加监听器需要再次 wrapper
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })
    const wrapper = mount(<MonthPicker {...props} />)
    wrapper.find('.dropdown-toggle').simulate('click')
    expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper.find('.dropdown-menu').length).toEqual(1)
    // 点击为实例对象时 MonthPicker 不关闭
    eventMap.click({
      target: ReactDOM.findDOMNode(wrapper.instance())
    })
    expect(wrapper.state('isOpen')).toEqual(true)
    // 点击为其它位置时 MonthPicker 关闭
    eventMap.click({
      target: document,
    })
    expect(wrapper.state('isOpen')).toEqual(false)
  })
})
