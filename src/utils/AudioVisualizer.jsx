import { useState, useRef } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';

export const AudioVisualizer = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [waveformData, setWaveformData] = useState([]);
    const [spectrumData, setSpectrumData] = useState([]);
    const audioRef = useRef(null);
    const analyserRef = useRef(null);

    const handleFileUpload = event => {
        const file = event.target.files[0];
        if (file) {
            setAudioFile(URL.createObjectURL(file));
            processAudio(file);
        }
    };

    const processAudio = file => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
            const audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            const audioBuffer = await audioContext.decodeAudioData(
                reader.result,
            );
            const channelData = audioBuffer.getChannelData(0);
            const sampleRate = 1000; // Кількість точок для графіка
            const reducedData = [];
            for (
                let i = 0;
                i < channelData.length;
                i += Math.floor(channelData.length / sampleRate)
            ) {
                reducedData.push({ x: i, y: channelData[i] });
            }
            setWaveformData(reducedData);

            // Аналіз спектру
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyserRef.current = analyser;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateSpectrum = () => {
                analyser.getByteFrequencyData(dataArray);
                const spectrumArray = Array.from(dataArray).map(
                    (value, index) => ({
                        x: index,
                        y: value,
                    }),
                );
                setSpectrumData(spectrumArray);
            };
            setInterval(updateSpectrum, 100);
        };
    };

    return (
        <div className="flex flex-col items-center p-4">
            <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="mb-4"
            />
            {audioFile && (
                <audio
                    ref={audioRef}
                    controls
                    src={audioFile}
                    className="mb-4"
                />
            )}

            <div className="w-full h-64 mb-6">
                <h2 className="text-xl font-semibold mb-2">Амплітуда звуку</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waveformData}>
                        <XAxis dataKey="x" hide />
                        <YAxis domain={[-1, 1]} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="y"
                            stroke="#8884d8"
                            dot={false}
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="w-full h-64">
                <h2 className="text-xl font-semibold mb-2">Спектр частот</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={spectrumData}>
                        <XAxis dataKey="x" hide />
                        <YAxis hide />
                        <Tooltip />
                        <defs>
                            <linearGradient
                                id="colorSpectrum"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#82ca9d"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#82ca9d"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="y"
                            stroke="#82ca9d"
                            fill="url(#colorSpectrum)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AudioVisualizer;
