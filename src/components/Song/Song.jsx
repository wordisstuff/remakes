import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../redux/song/operation';
import { useEffect, useState } from 'react';
import { selectSongs } from '../../redux/song/selectors';
import CSS from './Song.module.css';
// import AudioVisualizer from '../../utils/AudioVisualizer';

const Song = () => {
    const songs = useSelector(selectSongs);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);
    console.log(songs);

    const handleOpenModal = song => {
        setSelectedSong(song);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    return (
        <section className={CSS.section}>
            {' '}
            <ul className={CSS.homebox}>
                {' '}
                {songs !== null &&
                    songs.map(song => (
                        <li
                            key={song._id}
                            onClick={() => handleOpenModal(song)}
                        >
                            <div className={CSS.ava}>
                                <img src={123} alt="Avatar" />
                            </div>
                            <div className={CSS.home}>
                                <p>{song.title}</p>
                                <p>{song.author}</p>
                                <p>{song.price}</p>
                            </div>
                        </li>
                    ))}
            </ul>
            {isModalOpen && selectedSong && (
                <div className={CSS.modalOverlay} onClick={handleCloseModal}>
                    <div
                        className={CSS.modal}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className={CSS.closeButton}
                            onClick={handleCloseModal}
                        >
                            X
                        </button>
                        <div className={CSS.modalDescription}>
                            <p className={CSS.modalName}>
                                {selectedSong.songName}
                            </p>
                            <p className={CSS.modalAuthor}>
                                {selectedSong.author}
                            </p>
                            <audio controls className={CSS.modalAudio}>
                                <source
                                    src={selectedSong.songMp3}
                                    type="audio/mpeg"
                                />
                                Your browser does not support the audio element.
                            </audio>
                            {/* <p className={CSS.modalMp3}>
                                {selectedSong.songMp3}
                            </p> */}
                            <p className={CSS.modalPrice}>
                                {selectedSong.price}$
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Song;
