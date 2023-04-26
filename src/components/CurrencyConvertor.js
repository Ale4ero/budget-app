
import React, { useEffect, useState } from 'react';
import '../App.css';
import CurrencyRow from './CurrencyRow'



export default function CurrencyConvertor() {

    const usdRates = {
        EUR: 0.90, 
        CAD: 1.36
    }

    const eurRates = {
        USD: 1.11, 
        CAD: 1.51
    }

    const canRates = {
        USD: 0.73, 
        EUR: 0.66
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

    
    // useEffect(() => {
    //     setFromCurrency(currencyOptions[0])
    //     setToCurrency(currencyOptions[1])
    //     setExchangeRate(currencyOptions[0].rates.EUR)
    //     //eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    useEffect(() => {
        
        
        if(fromCurrency.base === "USD"){
            console.log("from usd")
            if(toCurrency.base === "EUR"){
                setExchangeRate(0.90)
            }else if(toCurrency.base === "CAD"){
                setExchangeRate(1.36)
            }else{
                setExchangeRate(1)
            }
        }else if(fromCurrency.base === "EUR"){
            if(toCurrency.base === "USD"){
                setExchangeRate(1.11)
            }else if(toCurrency.base === "CAD"){
                setExchangeRate(1.51)
            }else{
                setExchangeRate(1)
            }
        }else{
            if(toCurrency.base === "USD"){
                setExchangeRate(0.73)
            }else if(toCurrency.base === "EUR"){
                setExchangeRate(0.66)
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
