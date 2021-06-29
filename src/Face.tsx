import React, { FC, useEffect, useRef, useCallback, useState } from 'react';
import * as faceapi from 'face-api.js';

import * as Detect from './utils/faceDetection';
import * as Draw from './utils/draw';

import Styles from './Face.style';

const FRAME_RATE = 500;
enum State {
  INITIALIZING_CANVAS,
  LOADING_MODELS,
  INITIALIZING_CAMERA,
  INITIALIZING_VIDEO,
  DETECTING_LANDMARKS,
  ACTIVE
}

const Loader: FC<{ text: string }> = ({ text }) => (
  <div style={Styles.LOADER}>
    <span style={Styles.TEXT}>{text}</span>
  </div>
);

const Face: FC = () => {
  const [state, setState] = useState<State>(State.INITIALIZING_CANVAS);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const $video = useRef<HTMLVideoElement | null>(null);
  const $canvas = useRef<HTMLCanvasElement | null>(null);

  const onPlay = useCallback(function() {
    const _onPlay = async function() {
      if (!Detect.isFaceDetectionModelLoaded()) {
        return setTimeout(() => onPlay(), FRAME_RATE);
      }
      
      if (!$video.current || !$canvas.current) return;
  
      setState(State.DETECTING_LANDMARKS);
      const options = Detect.getFaceDetectorOptions();
      const result = await faceapi.detectSingleFace($video.current, options).withFaceLandmarks();
  
      if (result) {
        const dims = faceapi.matchDimensions($canvas.current, $video.current, true)

        if (!!dims.width && !!dims.height) {
          if (state !== State.ACTIVE) setState(State.ACTIVE);
          const resizedResult = faceapi.resizeResults(result, dims);
          const mouth = resizedResult.landmarks.getMouth();
          Draw.drawBackground(
            resizedResult.landmarks.getLeftEye()[0],
            $canvas.current,
            $video.current
          );

          resizedResult.landmarks.positions.forEach(
            position => {
              if (!$canvas.current || !$video.current) return;
              Draw.drawPointBackground(position, $canvas.current, $video.current);
            }
          );
          resizedResult.landmarks.positions.forEach(
            position => {
              if (!$canvas.current) return;
              Draw.drawPoint2(position, $canvas.current);
            }
          );
          resizedResult.landmarks.positions.forEach(
            position => {
              if (!$canvas.current) return;
              Draw.drawPoint(position, $canvas.current);
            }
          );
          mouth.forEach(
            position => {
              if (!$canvas.current) return;
              Draw.drawPoint3(position, $canvas.current);
            }
          );
        }
      }
  
      setTimeout(() => onPlay(), FRAME_RATE);
    }

    _onPlay();
  }, [$video, $canvas, state]);

  const run = useCallback(function() {
    const _run = async function() {
      if (!$video.current) return;
      try {
        await faceapi.loadFaceLandmarkModel('./../weights');
        if (!Detect.isFaceDetectionModelLoaded()) {
          setState(State.LOADING_MODELS);
          await Detect.getCurrentFaceDetectionNet().load('./../weights');
          setState(State.INITIALIZING_CAMERA);
        }
      } catch (error) {
        console.log('err', error);
      }

      const isPortrait = window.outerHeight > window.outerWidth;
      const stream = await navigator?.mediaDevices?.getUserMedia({
        'audio': false,
        'video': {
          facingMode: 'user',
          width: isPortrait ? 480 : 640,
          height: isPortrait ? 640 : 480,
        }
      });
      setStream(stream);
      setState(State.INITIALIZING_VIDEO);
      if ('srcObject' in $video.current) {
		    $video.current.srcObject = stream;
		  } else {
        // @ts-ignore -- old browser fallback :(
		    $video.current.src = window.URL.createObjectURL(stream);
		  }
      $video.current.play();  
    }

    _run();
  }, [])

  useEffect(() => {
    run();

    return () => {
      if (!stream) return;

      stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
  }, [run]);

  return (
    <div style={Styles.WRAPPER}>
      {state === State.INITIALIZING_CANVAS && <Loader text="Initializing canvas..." />}
      {state === State.LOADING_MODELS && <Loader text="Loading models..." />}
      {state === State.INITIALIZING_CAMERA && <Loader text="Initializing camera..." />}
      {state === State.INITIALIZING_VIDEO && <Loader text="Initializing video..." />}
      {state === State.DETECTING_LANDMARKS && <Loader text="Detecting landmarks..." />}
      <video
        style={Styles.VIDEO}
        ref={$video}
        onLoadedMetadata={onPlay}
        autoPlay={true}
        playsInline={true}
        muted={true}
      ></video>
      <canvas ref={$canvas} style={Styles.CANVAS} />
    </div>
  );
}

export default Face;
