import React from 'react'
import { mount } from 'enzyme'
import Home, { newItem } from '../Home'
import { parseToYearAndMonth, LIST_VIEW, CHART_VIEW } from '../../utility'
import ViewTab from '../../components/ViewTab'
import PriceList from '../../components/PriceList'
import MonthPicker from '../../components/MonthPicker'
import CreateBtn from '../../components/CreateBtn'

let wrapper

describe('test Home container component', () => {
  beforeEach(() => {
    wrapper = mount(<Home/>)
  })
  it('should render the default layout', () => {
    let currentDate = parseToYearAndMonth('2020/05/05')
    expect(wrapper.find(PriceList).length).toEqual(1)
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW)
    expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year)
    expect(wrapper.find(MonthPicker).props().month).toEqual(currentDate.month)
    expect(wrapper.find(PriceList).props().items.length).toEqual(1)
  })
  it('click the another view tab, should change the default view', () => {
    wrapper.find('.nav-item a').last().simulate('click')
    expect(wrapper.find(PriceList).length).toEqual(0)
    expect(wrapper.find('.chart-title').length).toEqual(1)
    expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW)
  })
  it('click the new month item, should switch to the correct items', () => {
    // 打开 MonthPicker 点击6月
    wrapper.find('.dropdown-toggle').simulate('click')
    wrapper.find('.months-range .dropdown-item').at(5).simulate('click')
    expect(wrapper.find(MonthPicker).props().month).toEqual(6)
    expect(wrapper.find(PriceList).props().items.length).toEqual(1)
  })
  it('click the create button, should create the new item', () => {
    wrapper.find(CreateBtn).simulate('click')
    expect(wrapper.find(PriceList).props().items.length).toEqual(2)
    expect(wrapper.state('items')[0]).toEqual(newItem)
  })
})
