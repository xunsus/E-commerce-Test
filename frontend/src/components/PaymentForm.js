import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from 'react'
import {Button, Row,Col,Form, List } from "antd";


export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

          return;
        }

        const cardElement = elements.getElement(CardElement);
    
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
    
        if (error) {
          console.log('[error]', error);
        } else {
          console.log('[PaymentMethod]', paymentMethod);
          setSuccess(true)
        }
      };

    return (
        <>
        {!success ?
        
        <Row>
           <Col span={4}></Col>
           <Col span={12}>
        <Form onFinish={handleSubmit}>
        <CardElement  options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}/>
        <Button type="primary" htmlType="submit" style={{ background: "#ffdc73", borderColor: "#ffdc73" , color:'black'}} disabled={!stripe}>
          Confirm Payment
        </Button>
      </Form>
      </Col>
      <Col span={4}></Col>
      </Row>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
            
        </>
    )
}
