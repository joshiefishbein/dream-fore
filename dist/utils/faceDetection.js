import * as faceapi from 'face-api.js';
export var SSD_MOBILENETV1 = 'ssd_mobilenetv1';
export var TINY_FACE_DETECTOR = 'tiny_face_detector';
export var selectedFaceDetector = TINY_FACE_DETECTOR;
// ssd_mobilenetv1 options
// const minConfidence = 0.5
// tiny_face_detector options
var inputSize = 512;
var scoreThreshold = 0.5;
export function getFaceDetectorOptions() {
    return new faceapi.TinyFaceDetectorOptions({ inputSize: inputSize, scoreThreshold: scoreThreshold });
}
export function getCurrentFaceDetectionNet() {
    return faceapi.nets.tinyFaceDetector;
}
export function isFaceDetectionModelLoaded() {
    return !!getCurrentFaceDetectionNet().params;
}
