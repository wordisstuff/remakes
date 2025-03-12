import { useDispatch, useSelector } from 'react-redux';
import { getMp3 } from '../../redux/song/operation';
import { useEffect } from 'react';
import { selectMp3 } from '../../redux/song/selectors';
import CSS from './Song.module.css';
import WaveformPlayer from '../../utils/WaveformPlayer';
// import AudioVisualizer from '../../utils/AudioVisualizer';

const Song = () => {
    const dispatch = useDispatch();

    const songName = 'Royksopp_Impossible_Remake.mp3';

    useEffect(() => {
        dispatch(getMp3(songName));
    }, [dispatch]);

    const mp3Link = useSelector(selectMp3);
    console.log(mp3Link);

    return (
        <section className={CSS.section}>
            <WaveformPlayer audioUrl={mp3Link} />
            <ul className={CSS.homebox}>
                {/* <AudioVisualizer /> */}
                {/* {songs !== null &&
                    songs.map(({ _id, title, author, price }) => {
                        return (
                            <li key={_id}>
                                <div className={CSS.ava}>
                                    <img src={123} alt="Avatar" />
                                    <AudioVisualizer />
                                </div>
                                <div
                                    className={CSS.home}
                                    onClick={() => console.log('123')}
                                >
                                    <p>{title}</p>
                                    <p>{author}</p>
                                    <p>{price}</p>
                                </div>
                            </li>
                        );
                    })} */}
            </ul>
        </section>
    );
};

export default Song;
