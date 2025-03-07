import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../redux/song/operation';
import { useEffect } from 'react';
import { selectSongs } from '../../redux/song/selectors';
import CSS from './List.module.css';

const List = () => {
    const songs = useSelector(selectSongs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);
    console.log(songs);
    return (
        <>
            <section className={CSS.section}>
                <ul className={CSS.homebox}>
                    {songs !== null &&
                        songs.map(({ _id, name, avatar }) => {
                            return (
                                <li key={_id}>
                                    <div
                                        className={CSS.home}
                                        onClick={() => console.log('123')}
                                    >
                                        <p>{name}</p>
                                        <img src={avatar} alt="Avatar" />
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </section>
        </>
    );
};

export default List;
