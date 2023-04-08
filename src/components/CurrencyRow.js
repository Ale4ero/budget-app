import React from 'react'

export default function CurrencyRow(props) {
    const {
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
      } = props
  return (
    <div>
        <input type="number" className="input" value={amount} onChange={onChangeAmount} />
        <select value={selectedCurrency.index} onChange={onChangeCurrency} className="select">
        {/* {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
        ))} */}
        <option key="0" value="0">USD</option>
        <option key="1" value="1">EUR</option>
        <option key="2" value="2">CAD</option>
        </select>
  </div>
  )
}
