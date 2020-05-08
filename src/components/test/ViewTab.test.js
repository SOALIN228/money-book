import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { LIST_VIEW, CHART_VIEW } from '../../utility'
import ViewTab from '../ViewTab'

const props = {
  activeTab: LIST_VIEW,
  onTabChange: jest.fn(),
}

let wrapper
describe('test ViewTab component', () => {
  // 每次都会执行的生命周期
  beforeEach(() => {
    wrapper = shallow(<ViewTab {...props}/>)
  })
  it('should render the component to match snapshot', () => {
    // 生成快照，每次改变进行比较
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('should render correct activeTab', () => {
    expect(wrapper.find('.nav-link').first().hasClass('active')).toEqual(true)
  })
  it('should trigger the correct function callbacks', () => {
    wrapper.find('.nav-link').last().simulate('click', {
      preventDefault: () => {
      }
    })
    expect(props.onTabChange).toHaveBeenCalledWith(CHART_VIEW)
  })
})
