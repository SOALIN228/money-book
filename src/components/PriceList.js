import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import { Colors } from '../utility'

const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="list-group list-group-flush">
      {
        items.map((item) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
            <span className="col-1 badge badge-primary">
              <Ionicon className="rounded-circle"
                       fontSize="30px"
                       style={{ backgroundColor: Colors.blue, padding: '5px' }}
                       color={'#fff'}
                       icon={item.category.iconName}
              />
            </span>
            <span className="col-5">{item.title}</span>
            <span className="col-2 font-weight-bold">
              {(item.category.type === 'income') ? '+' : '-'}
              {item.price}元
            </span>
            <span className="col-2">{item.date}</span>
            <a className="col-1"
               role="button"
               onClick={() => {
                 onModifyItem(item)
               }}
            >
              <Ionicon className="rounded-circle"
                       fontSize="30px"
                       style={{ backgroundColor: Colors.green, padding: '5px' }}
                       color={'#fff'}
                       icon='ios-create-outline'
              />
            </a>
            <a className="col-1"
               role="button"
               onClick={() => {
                 onDeleteItem(item)
               }}
            >
              <Ionicon className="rounded-circle"
                       fontSize="30px"
                       style={{ backgroundColor: Colors.red, padding: '5px' }}
                       color={'#fff'}
                       icon='ios-close'
              />
            </a>
          </li>
        ))
      }
    </ul>
  )
}

PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}

export default PriceList
