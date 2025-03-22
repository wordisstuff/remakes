// import ReactAudioPlayer from 'react-audio-player';
import clsx from 'clsx';
import CSS from './AudioPlayer.module.css';

const AudioPlayer = ({ audio, className }) => {
    console.log(audio);
    return (
        <audio controls className={clsx(CSS.audio, className && className)}>
            <source src={audio} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioPlayer;

// return <ReactAudioPlayer src={audio} controls autoPlay={false} />;
