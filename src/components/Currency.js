import React from 'react'
import { Container } from 'react-bootstrap'
import '../App.css'
import CurrencyConvertor from './CurrencyConvertor'

export default function Currency() {
  return (
    <div>
      <div className="background">
        <div className="pageContent">
        <h1 className='pageTitle fw-bold'>Currency Convertor</h1>
        <div className="flexBreak"></div>
        <p className='pageText'>Here is a currency widget to convert between USD, EUR and CAD.</p>
            <Container className='currencyContainer'>
              <div className='widgetContainer'>
                <CurrencyConvertor></CurrencyConvertor>
              </div>
                

            </Container>
        </div>
      </div>
      
    </div>
  )
}
