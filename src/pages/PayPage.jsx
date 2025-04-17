import { loadStripe } from '@stripe/stripe-js';
import { PayForm } from '../components/PayForm/PayForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key');
const PayPage = ({ price }) => {
    const taxProc = 16;
    const priceTax = (price / 100) * taxProc;
    const priceWithTax = (price / 100) * taxProc + price;

    return (
        <div
        // style={{ width: 600, height: 600 }}
        >
            <p> Price: {price} $</p>
            <p>
                Tax {taxProc}%: {priceTax} $
            </p>
            <p> Total: {priceWithTax} $</p>
            <Elements stripe={stripePromise}>
                <PayForm />
            </Elements>
        </div>
    );
};

export default PayPage;
