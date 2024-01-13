import { useState } from 'react'
import './rangeFilter.module.css'


const RangeFilter = () => {
  const [range, setRange] = useState(0)
  const items = [
    {
      name: 'Iphone',
      model: 'Pro max 15',
      price: 80,
    },
    {
      name: 'Samsung',
      model: 'Galaxy S22',
      price: 70,
    },
    {
      name: 'Xiaomi',
      model: '13T',
      price: 60,
    },
    {
      name: 'Motorola',
      model: 'Razr',
      price: 65,
    },
    {
      name: 'Nokia',
      model: '6600',
      price: 30,
    },
  ]
  const handleChangeRange = (e) => {
    const {
      target: { value },
    } = e
    setRange(value)
  }
  const filtered = items.filter((item) => item.price >= range)
  return (
    <>
      <p>{`Price: ${range} $`}</p>
      <input
        type="range"
        min={0}
        max={100}
        value={range}
        onChange={handleChangeRange}
      ></input>
      <div className="container">
        {filtered.map((item) => (
          <Item key={item.name} name={item.name} price={item.price} model={item.model}/>
        ))}
      </div>
    </>
  )
}

export default RangeFilter

// eslint-disable-next-line react/prop-types
const Item = ({ name, price, model }) => {
    return (
      <>
        <div className="card">
          <h3>Brand name {name}</h3>
          <p>Model : {model}</p>
          <p>Price: {price} $</p>
        </div>
      </>
    )
  }
