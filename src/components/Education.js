import React from 'react'
import { Container } from 'react-bootstrap'
import '../App.css'

export default function Education() {
  return (
    <div className='background'>
        
        <div className="pageContent">
        <h1 className="pageTitle fw-bold">Education</h1>
            <Container className='eduContainer'>
                <div className="eduContent">
                    <h1>Credit Card</h1>
                    <div className='mx-3 my-4'>
                    <img src="https://consumer.ftc.gov/sites/www.consumer.ftc.gov/files/ftc-creditquestions-illustrations_f-01.png" className='w-25 creditImg' alt="growCredit"/>
                        <h4>Understanding Credit</h4>        
                            <p>Credit is the ability to borrow money or access goods or services with the understanding 
                            that you'll pay later. Most of the time there is a charge for borrowing the money that 
                            comes in the form of fees and/or interest.</p>
           
                            <p>Your ability to gain credit relies on your credit score and/or credit history. A credit 
                            score is a numerical value that represents your credit behavior. This number ranges from 
                            300 to 850. Your score is based on your payment history, ration of debt to available credit, 
                            length of credit history, types of credit used and recent credit searches.</p>

                    </div>
                    
                    <h4>Credit Cards</h4>
                    <p>Credit Cards are a common and easy way to start establishing credit but if used wrong can also 
                        be an easy way to destroy your credit. That’s why it’s important to understand how to properly 
                        use a credit card. Follow these credit card tips to help avoid common problems:</p>
                    <ol>
                        <li>Pay off your bill every month. You should try to only buy things with a credit 
                            card that you can afford to pay for in full. This helps to avoid paying interest 
                            on the things you buy with a credit card. If there’s an emergency and you have to 
                            buy something you can’t afford you should at least try to pay more than the minimum 
                            amount owed.</li>
                        <li>Know when your payment is due. You should always know when your credit card payment 
                            is due. Having consistent on time payments can help increase your credit score over 
                            time while late payments can decrease your score. Having a late payment could also 
                            result in a late fee or penalty interest rate.</li>
                        <li>Stay under 30% of your total credit limit. A big factor of your credit score is your 
                            credit utilization rate. Your credit utilization rate is the percentage of total available 
                            credit that you’re using. Banks want to know that you're responsible with money and don’t 
                            overspend. Keeping your balance under 30% is a safe way to do this and is also recommended 
                            by most banks. Having a high credit utilization rate is one of the fastest ways to drop your 
                            credit score.</li>
                        <li>Don’t close out old credit cards. Part of your credit score is calculated by your “credit age”. 
                            This is how long you’ve had a history of credit. Closing out an old account would lower your credit 
                            history therefore lowering your credit score. Moreover, a closed card means you're lowering your 
                            available credit limit. Even if you keep your spending the same, you risk increasing your credit 
                            utilization ratio.</li>
                    </ol>
                </div>
                

            </Container>
            
        </div>
      
    </div>
  )
}
