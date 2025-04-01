import Container from '../Container/Container';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/song/selectors.js';
import { resetCart } from '../../redux/song/slice.js';
import CSS from './Cart.module.css';
import AudioPlayer from '../AudioPlayer/AudioPlayer.jsx';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    const totalPrice = cart.reduce((ac, s) => ac + s.price, 0);
    console.log(totalPrice);
    return (
        <Container className={CSS.container}>
            <ul className={CSS.cart}>
                {cart &&
                    cart.map(
                        ({
                            _id,
                            songName,
                            author,
                            bpm,
                            price,
                            songPic,
                            songMp3,
                        }) => {
                            return (
                                <li key={_id} className={CSS.list}>
                                    <img
                                        src={songPic}
                                        alt="Avatar"
                                        className={CSS.img}
                                    />
                                    <div>
                                        <h2>
                                            {author} - {songName}
                                        </h2>
                                        <p>bpm: {bpm}</p>
                                        <span className={CSS.price}>
                                            {price} $
                                        </span>
                                        <AudioPlayer
                                            audio={songMp3}
                                            className={CSS.player}
                                        />
                                    </div>
                                </li>
                            );
                        },
                    )}
            </ul>
            <p>Total:{totalPrice} $ </p>
            <button type="button" onClick={() => dispatch(resetCart())}>
                reset cart
            </button>
        </Container>
    );
};

export default Cart;
