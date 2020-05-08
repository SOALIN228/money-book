import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PriceList from '../PriceList'
import { items, categories } from '../../containers/Home'
import Ionicon from 'react-ionicons'

const itemsWithCategory = items.map(item => {
  item.category = categories[item.cid]
  return item
})

const props = {
  items: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn(),
}

let wrapper
describe('test PriceList component', () => {
  // 每次都会执行的生命周期
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props}/>)
  })
  it('should render the component to match snapshot', () => {
    // 生成快照，每次改变进行比较
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  it('should render correct price items length', () => {
    expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategory.length)
  })
  it('should render correct icon and price for each item', () => {
    // 获取数组的一个的元素中的 Ionicon
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
    expect(iconList.length).toEqual(3)
    expect(iconList.first().props().icon)
      .toEqual(itemsWithCategory[0].category.iconName)
  })
  it('should trigger the correct function callbacks', () => {
    const firstItem = wrapper.find('.list-group-item').first()
    // 模拟点击事件的执行
    firstItem.find('a').first().simulate('click')
    // 方法调用时的参数为 itemsWithCategory[0]
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0])
    firstItem.find('a').last().simulate('click')
    expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0])
  })
})

