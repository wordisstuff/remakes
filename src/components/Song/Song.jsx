import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../redux/song/operation';
import { useEffect } from 'react';
import { selectCart, selectSongs } from '../../redux/song/selectors';
import CSS from './Song.module.css';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { icons } from '../../icons/index.js';
import { addToCart } from '../../redux/song/slice.js';
import clsx from 'clsx';
import { openModal } from '../../redux/modal/slice.js';
// import WaveformPlayer from '../../utils/WaveformPlayer';
// import AudioVisualizer from '../../utils/AudioVisualizer';
const Song = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);

    const songs = useSelector(selectSongs);

    return (
        <section className={CSS.section}>
            {/* <WaveformPlayer audioUrl={mp3Link[0].mp3Link} /> */}
            <ul className={CSS.homebox}>
                {songs !== null &&
                    songs.map(i => {
                        const {
                            _id,
                            songName,
                            author,
                            // bpm,
                            price,
                            songPic,
                            songMp3,
                        } = i;
                        return (
                            <li
                                key={_id}
                                onClick={() => {
                                    dispatch(
                                        openModal({
                                            type: 'song',
                                            content: i,
                                        }),
                                    );
                                }}
                                className={CSS.song}
                            >
                                <div className={CSS.ava}>
                                    <img
                                        src={songPic}
                                        alt="Avatar"
                                        className={CSS.img}
                                    />
                                </div>
                                <AudioPlayer
                                    audio={songMp3}
                                    className={CSS.player}
                                />
                                <div
                                    className={CSS.info}
                                    onClick={() => console.log('123')}
                                >
                                    <h3 className={CSS.title}>
                                        {author} - {songName}
                                    </h3>
                                    <div className={CSS.infoText}>
                                        {/* <p>bpm: {bpm}</p> */}
                                        <span className={CSS.price}>
                                            {price} $
                                        </span>
                                        <a
                                            // style={{
                                            //     cursor: 'url(/click32.png),auto',
                                            // }}
                                            className={clsx(CSS.addCartLink)}
                                            onClick={e => {
                                                e.stopPropagation();
                                                dispatch(
                                                    addToCart({ songId: _id }),
                                                );
                                            }}
                                        >
                                            <svg className={CSS.iconCart}>
                                                <use
                                                    xlinkHref={
                                                        !cart.some(
                                                            i => i._id === _id,
                                                        )
                                                            ? `${icons}#scart`
                                                            : `${icons}#sfcart`
                                                    }
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </section>
    );
};

export default Song;
