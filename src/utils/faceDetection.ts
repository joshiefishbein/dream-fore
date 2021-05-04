import * as faceapi from 'face-api.js';

export const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
export const TINY_FACE_DETECTOR = 'tiny_face_detector'

export const selectedFaceDetector = TINY_FACE_DETECTOR;

// ssd_mobilenetv1 options
// const minConfidence = 0.5

// tiny_face_detector options
const inputSize = 512
const scoreThreshold = 0.5

export function getFaceDetectorOptions() {
  return new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

export function getCurrentFaceDetectionNet() {
  return faceapi.nets.tinyFaceDetector;
}

export function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}
