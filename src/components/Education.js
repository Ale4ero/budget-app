import React from 'react'
import { Container } from 'react-bootstrap'
import '../App.css'

export default function Education() {
  return (
    <div className='background'>
        
        <div className="pageContent">
        <div className="pageTitle display-6"><h1 className='display-inline fw-bold me-2'>Education</h1>  |Credit</div>
            <Container className='eduContainer'>
                <div className="eduContent">
                    <div className='mx-3'>
                    <img src="https://consumer.ftc.gov/sites/www.consumer.ftc.gov/files/ftc-creditquestions-illustrations_f-01.png" className='w-25 creditImg' alt="growCredit"/>
                        
                        <div className='undCredit'>
                            <h2 className="fw-bold">Understanding Credit</h2>        
                                <p>Credit is the ability to borrow money or access goods or services with the understanding 
                                that you'll pay later. Most of the time there is a charge for borrowing the money that 
                                comes in the form of fees and/or interest.</p>
            
                                <p>Your ability to gain credit relies on your credit score and/or credit history. A credit 
                                score is a numerical value that represents your credit behavior. This number ranges from 
                                300 to 850. Your score is based on your payment history, ration of debt to available credit, 
                                length of credit history, types of credit used and recent credit searches.</p>
                        </div>
                        

                        <h2 className="fw-bold">Credit Cards</h2>
                            <p>Credit Cards are a common and easy way to start establishing credit but if used wrong can also 
                            be an easy way to destroy your credit. That’s why it’s important to understand how to properly 
                            use a credit card. Follow these credit card tips to help avoid common problems:</p>
                           
                            <div className='textContainer'>
                                <div className='textBox'>
                                    <h4 className='fw-bold mx-2 my-3'>1. Pay off your bill every month.</h4>
                                    <p>You should try to only buy things with a credit card that you can afford to pay 
                                    for in full. This helps to avoid paying interest on the things you buy with a credit 
                                    card. </p><p>If there’s an emergency and you have to buy something you can’t afford you 
                                    should at least try to pay more than the minimum amount owed.</p>

                                </div>
                                <div className='textBox'>
                                    <h4 className='fw-bold mx-2 my-3'>2. Know when your payment is due.</h4>
                                    <p>You should always know when your credit card payment 
                                    is due. Having consistent on time payments can help increase your credit score over 
                                    time while late payments can decrease your score.</p><p> Having a late payment could also 
                                    result in a late fee or penalty interest rate.</p>

                                </div>
                                <div className='textBox'>
                                    <h4 className='fw-bold mx-2 my-3'>3. Stay under 30% of your total credit limit.</h4>
                                    <p>A big factor of your credit score is your 
                                    credit utilization rate, the percentage of total available 
                                    credit that you’re using.</p><p> Banks want to know that you're responsible with money and don’t 
                                    overspend. Keeping your balance under 30% is a safe way to do this. Having a high credit utilization rate is one of the fastest ways to drop your 
                                    credit score.</p>

                                </div>
                                <div className='textBox'>
                                    <h4 className='fw-bold mx-2 my-3'>4. Don’t close out old credit cards.</h4>
                                    <p>Part of your credit score is calculated by your “credit age”. 
                                    This is how long you’ve had a history of credit. Closing out an old account would lower your credit 
                                    history therefore lowering your credit score. </p><p>A closed card means you're lowering your 
                                    available credit limit, you risk increasing your credit 
                                    utilization ratio.</p>

                                </div>
                            </div>
                    </div>
                    
                    
                </div>
                

            </Container>
            
        </div>
      
    </div>
  )
}
