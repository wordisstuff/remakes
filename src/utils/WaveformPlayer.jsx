import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveformPlayer = ({ audioUrl }) => {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);

    useEffect(() => {
        if (!waveformRef.current) return;

        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#80acf3e9',
            progressColor: '#ff622d',
            responsive: true,
            barWidth: 1,
            barGap: 2,
            height: 220,
            barHeight: 0,
            cursorWidth: 3,
            cursorColor: '#cbf6d0',
        });
        wavesurferRef.current.load(audioUrl);
        wavesurferRef.current.on('error', error => {
            console.error('WaveSurfer error:', error);
        });

        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.stop();
                wavesurferRef.current.destroy();
                wavesurferRef.current = null;
            }
        };
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
