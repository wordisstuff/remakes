import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../redux/song/operation';
import { useEffect } from 'react';
import { selectSongs } from '../../redux/song/selectors';
import CSS from './Song.module.css';

const Song = () => {
    const songs = useSelector(selectSongs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);
    console.log(songs);
    return (
        <section className={CSS.section}>
            <ul className={CSS.homebox}>
                {songs !== null &&
                    songs.map(({ _id, title, author, price }) => {
                        return (
                            <li key={_id}>
                                <img
                                    className={CSS.ava}
                                    src={123}
                                    alt="Avatar"
                                />
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
                    })}
            </ul>
        </section>
    );
};

export default Song;
