import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const PayForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.error(error);
        } else {
            console.log(paymentMethod);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={cardElementOptions} />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};
