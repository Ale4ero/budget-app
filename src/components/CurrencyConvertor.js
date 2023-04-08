
import React, { useEffect, useState } from 'react';
import '../App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

export default function CurrencyConvertor() {

    const usdRates = {
        EUR: 0.92, 
        CAD: 1.35
    }

    const eurRates = {
        USD: 1.09, 
        CAD: 1.47
    }

    const canRates = {
        USD: 0.74, 
        EUR: 0.68
    }
    
    const currencyOptions = [
        { base: "USD", rates: usdRates, index: 0},
        { base: "EUR", rates: eurRates, index: 1},
        { base: "CAD", rates: canRates, index: 2}
    ]
    

    const [fromCurrency, setFromCurrency] = useState(currencyOptions[0])
    const [toCurrency, setToCurrency] = useState(currencyOptions[1])
    const [exchangeRate, setExchangeRate] = useState(0.92)
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    useEffect(() => {
        setFromCurrency(currencyOptions[0])
        setToCurrency(currencyOptions[1])
        setExchangeRate(currencyOptions[0].rates.EUR)
    
    }, [])

    useEffect(() => {
        
        
        if(fromCurrency.base == "USD"){
            console.log("from usd")
            if(toCurrency.base == "EUR"){
                setExchangeRate(0.92)
            }else if(toCurrency.base == "CAD"){
                setExchangeRate(1.35)
            }else{
                setExchangeRate(1)
            }
        }else if(fromCurrency.base == "EUR"){
            if(toCurrency.base == "USD"){
                setExchangeRate(1.09)
            }else if(toCurrency.base == "CAD"){
                setExchangeRate(1.47)
            }else{
                setExchangeRate(1)
            }
        }else{
            if(toCurrency.base == "USD"){
                setExchangeRate(0.74)
            }else if(toCurrency.base == "EUR"){
                setExchangeRate(0.68)
            }else{
                setExchangeRate(1)
            }
        }
        
    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }
    console.log(fromCurrency);
  return (
    <>
      <h1 className='fw-bold mb-4' >Convert</h1>
      {console.log("pizza")}
      {console.log(fromCurrency)}
      <CurrencyRow
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(currencyOptions[e.target.value])}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals fw-normal display-5">=</div>
      <CurrencyRow
        selectedCurrency={toCurrency}
        onChangeCurrency={e => {
            console.log("change currency")
            console.log(e.target)
            setToCurrency(currencyOptions[e.target.value])
        }}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  )
}
