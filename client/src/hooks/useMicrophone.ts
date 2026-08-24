/**
 * Style reminder — a subtle, accessible interaction for the reference cake scene.
 * Microphone access is opt-in; the slider in the UI remains an equally capable fallback.
 */
import { useCallback, useEffect, useRef, useState } from "react";

type MicrophoneOptions = {
  onBlow: () => void;
  threshold?: number;
};

export function useMicrophone({ onBlow, threshold = 18 }: MicrophoneOptions) {
  const [isListening, setIsListening] = useState(false);
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);
  const onBlowRef = useRef(onBlow);

  useEffect(() => {
    onBlowRef.current = onBlow;
  }, [onBlow]);

  const stop = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    contextRef.current?.close().catch(() => undefined);
    contextRef.current = null;
    analyserRef.current = null;
    setIsListening(false);
    setLevel(0);
  }, []);

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) {
      setError("Microphone controls are unavailable here. Use the blow slider instead.");
      return;
    }

    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      streamRef.current = stream;
      contextRef.current = audioContext;
      analyserRef.current = analyser;
      setIsListening(true);

      const samples = new Uint8Array(analyser.fftSize);
      const measure = (time: number) => {
        analyser.getByteTimeDomainData(samples);
        const average = samples.reduce((sum, sample) => sum + Math.abs(sample - 128), 0) / samples.length;
        const nextLevel = Math.min(100, Math.round(average * 4.8));

        if (time - lastUpdateRef.current > 90) {
          lastUpdateRef.current = time;
          setLevel(nextLevel);
        }

        if (average > threshold) {
          onBlowRef.current();
          stop();
          return;
        }

        frameRef.current = requestAnimationFrame(measure);
      };

      frameRef.current = requestAnimationFrame(measure);
    } catch {
      setError("Microphone permission was not granted. The blow slider still works.");
      stop();
    }
  }, [stop, threshold]);

  useEffect(() => stop, [stop]);

  return { error, isListening, level, start, stop };
}
