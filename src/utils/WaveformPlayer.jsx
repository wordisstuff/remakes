import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformPlayer = ({ audioUrl }) => {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);

    useEffect(() => {
        if (!waveformRef.current) return;

        wavesurferRef.current = WaveSurfer.create({
            // container: waveformRef.current,
            // waveColor: '#ceddf5',
            // progressColor: '#ff622d',
            // responsive: true,
            // barWidth: 1,
            // barGap: 2,
            height: 220,
            // barHeight: 0,
            // cursorWidth: 3,
            // cursorColor: '#cbf6d0',

            container: waveformRef.current,
            waveColor: '#007bff',
            progressColor: '#ff5733',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            cursorColor: 'black',
            // height: 150,
            barWidth: 4,
            barGap: 2,
            // scrollParent: true,
            minPxPerSec: 50,
            // autoScroll: true,
        });
        wavesurferRef.current.load(audioUrl);

        return () => wavesurferRef.current.destroy();
    }, [audioUrl]);

    const handlePlayPause = () => {
        wavesurferRef.current.playPause();
    };

    return (
        <div>
            <div
                ref={waveformRef}
                style={{
                    width: '100%',
                    height: '220px',
                    // background: '#3f3f3d',
                }}
            />
            <button onClick={handlePlayPause}>Play/Pause</button>
        </div>
    );
};

export default WaveformPlayer;
