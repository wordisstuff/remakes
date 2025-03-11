import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../redux/song/operation';
import { useEffect } from 'react';
import { selectSongs } from '../../redux/song/selectors';
import CSS from './Song.module.css';
import WaveformPlayer from '../../utils/WaveformPlayer';
// import AudioVisualizer from '../../utils/AudioVisualizer';

const Song = () => {
    const songs = useSelector(selectSongs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);
    console.log(songs);
    return (
        <section className={CSS.section}>
            <WaveformPlayer audioUrl="/music/Remake.mp3" />
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
