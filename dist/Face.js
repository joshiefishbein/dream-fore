var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useCallback, useState } from 'react';
import * as faceapi from 'face-api.js';
import * as Detect from './utils/faceDetection';
import * as Draw from './utils/draw';
import Styles from './Face.style';
var FRAME_RATE = 250;
var State;
(function (State) {
    State[State["INITIALIZING_CANVAS"] = 0] = "INITIALIZING_CANVAS";
    State[State["LOADING_MODELS"] = 1] = "LOADING_MODELS";
    State[State["INITIALIZING_CAMERA"] = 2] = "INITIALIZING_CAMERA";
    State[State["INITIALIZING_VIDEO"] = 3] = "INITIALIZING_VIDEO";
    State[State["DETECTING_LANDMARKS"] = 4] = "DETECTING_LANDMARKS";
    State[State["ACTIVE"] = 5] = "ACTIVE";
})(State || (State = {}));
var Loader = function (_a) {
    var text = _a.text;
    return (_jsx("div", __assign({ style: Styles.LOADER }, { children: _jsx("span", __assign({ style: Styles.TEXT }, { children: text }), void 0) }), void 0));
};
var Face = function () {
    var _a = useState(State.INITIALIZING_CANVAS), state = _a[0], setState = _a[1];
    var $video = useRef(null);
    var $canvas = useRef(null);
    var onPlay = useCallback(function () {
        var _onPlay = function () {
            return __awaiter(this, void 0, void 0, function () {
                var options, result, dims, resizedResult, mouth;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!Detect.isFaceDetectionModelLoaded()) {
                                return [2 /*return*/, setTimeout(function () { return onPlay(); }, FRAME_RATE)];
                            }
                            if (!$video.current || !$canvas.current)
                                return [2 /*return*/];
                            setState(State.DETECTING_LANDMARKS);
                            options = Detect.getFaceDetectorOptions();
                            return [4 /*yield*/, faceapi.detectSingleFace($video.current, options).withFaceLandmarks()];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                dims = faceapi.matchDimensions($canvas.current, $video.current, true);
                                if (!!dims.width && !!dims.height) {
                                    if (state !== State.ACTIVE)
                                        setState(State.ACTIVE);
                                    resizedResult = faceapi.resizeResults(result, dims);
                                    mouth = resizedResult.landmarks.getMouth();
                                    Draw.drawBackground(resizedResult.landmarks.getLeftEye()[0], $canvas.current, $video.current);
                                    resizedResult.landmarks.positions.forEach(function (position) {
                                        if (!$canvas.current || !$video.current)
                                            return;
                                        Draw.drawPointBackground(position, $canvas.current, $video.current);
                                    });
                                    resizedResult.landmarks.positions.forEach(function (position) {
                                        if (!$canvas.current)
                                            return;
                                        Draw.drawPoint2(position, $canvas.current);
                                    });
                                    resizedResult.landmarks.positions.forEach(function (position) {
                                        if (!$canvas.current)
                                            return;
                                        Draw.drawPoint(position, $canvas.current);
                                    });
                                    mouth.forEach(function (position) {
                                        if (!$canvas.current)
                                            return;
                                        Draw.drawPoint3(position, $canvas.current);
                                    });
                                }
                            }
                            setTimeout(function () { return onPlay(); }, FRAME_RATE);
                            return [2 /*return*/];
                    }
                });
            });
        };
        _onPlay();
    }, [$video, $canvas, state]);
    var run = useCallback(function () {
        var _run = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var error_1, isPortrait, stream;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!$video.current)
                                return [2 /*return*/];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, faceapi.loadFaceLandmarkModel('./../weights')];
                        case 2:
                            _b.sent();
                            if (!!Detect.isFaceDetectionModelLoaded()) return [3 /*break*/, 4];
                            setState(State.LOADING_MODELS);
                            return [4 /*yield*/, Detect.getCurrentFaceDetectionNet().load('./../weights')];
                        case 3:
                            _b.sent();
                            setState(State.INITIALIZING_CAMERA);
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_1 = _b.sent();
                            console.log('err', error_1);
                            return [3 /*break*/, 6];
                        case 6:
                            isPortrait = window.outerHeight > window.outerWidth;
                            return [4 /*yield*/, ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia({
                                    'audio': false,
                                    'video': {
                                        facingMode: 'user',
                                        width: isPortrait ? 480 : 640,
                                        height: isPortrait ? 640 : 480,
                                    }
                                }))];
                        case 7:
                            stream = _b.sent();
                            setState(State.INITIALIZING_VIDEO);
                            if ('srcObject' in $video.current) {
                                $video.current.srcObject = stream;
                            }
                            else {
                                // @ts-ignore -- old browser fallback :(
                                $video.current.src = window.URL.createObjectURL(stream);
                            }
                            $video.current.play();
                            return [2 /*return*/];
                    }
                });
            });
        };
        _run();
    }, []);
    useEffect(function () {
        run();
    }, [run]);
    return (_jsxs("div", __assign({ style: Styles.WRAPPER }, { children: [state === State.INITIALIZING_CANVAS && _jsx(Loader, { text: "Initializing canvas..." }, void 0),
            state === State.LOADING_MODELS && _jsx(Loader, { text: "Loading models..." }, void 0),
            state === State.INITIALIZING_CAMERA && _jsx(Loader, { text: "Initializing camera..." }, void 0),
            state === State.INITIALIZING_VIDEO && _jsx(Loader, { text: "Initializing video..." }, void 0),
            state === State.DETECTING_LANDMARKS && _jsx(Loader, { text: "Detecting landmarks..." }, void 0),
            _jsx("video", { style: Styles.VIDEO, ref: $video, onLoadedMetadata: onPlay, autoPlay: true, playsInline: true, muted: true }, void 0),
            _jsx("canvas", { ref: $canvas, style: Styles.CANVAS }, void 0)] }), void 0));
};
export default Face;
