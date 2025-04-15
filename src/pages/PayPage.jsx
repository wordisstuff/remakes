import { loadStripe } from '@stripe/stripe-js';
import { PayForm } from '../components/PayForm/PayForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key');
const PayPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <PayForm />
        </Elements>
    );
};

export default PayPage;
