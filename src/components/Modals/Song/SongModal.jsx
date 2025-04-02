import { useSelector } from 'react-redux';
import css from './SongModal.module.css';

import { selectModalContent } from '../../../redux/modal/selectors.js';

export const SongModal = () => {
    const song = useSelector(selectModalContent);
    console.log(song);

    return (
        <div className={css.modalOverlay}>
            {' '}
            HELLO
            <div className={css.modalDescription}>
                <p>
                    {song.songName} - {song.author}
                </p>
                {/* <audio controls className={css.modalAudio}>
                    <source src={song.songMp3} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio> */}
                <p className={css.modalPrice}>{song.price}$</p>
            </div>
        </div>
    );
};
