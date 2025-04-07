import { useSelector } from 'react-redux';
import CSS from './SongModal.module.css';

import { selectModalContent } from '../../../redux/modal/selectors.js';
import AudioPlayer from '../../AudioPlayer/AudioPlayer.jsx';

export const SongModal = () => {
    const song = useSelector(selectModalContent);
    console.log(song);

    return (
        <div className={CSS.modalOverlay}>
            <div className={CSS.ava}>
                {/* <img src={song.songPic} alt="Avatar" className={CSS.img} /> */}
            </div>{' '}
            <div className={CSS.modalDescription}>
                <div className={CSS.modalNameAuthor}>
                    <h3 className={CSS.modalSongName}>{song.songName}</h3>
                    <h3 className={CSS.modalSongAuthor}>{song.author}</h3>
                </div>
                <div className={CSS.audioBuy}>
                    <AudioPlayer
                        audio={song.songMp3}
                        className={CSS.modalPlayer}
                    />
                    <button className={CSS.btnModalBuy}>
                        Buy
                        <span className={CSS.modalPrice}> {song.price}$</span>
                    </button>
                </div>

                {/* <p className={CSS.modalPrice}>{song.price}$</p> */}
            </div>
        </div>
    );
};
