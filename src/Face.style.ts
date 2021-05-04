import { CSSProperties } from 'react';

const FaceStyle: { [key: string]: CSSProperties } = {
  WRAPPER: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    textAlign: 'center'
  },
  VIDEO: {
    position: 'relative',
    visibility: 'hidden',
    width: '100%',
    height: '100%',
    opacity: 0
  },
  CANVAS: {
    position: 'absolute',
    objectFit: 'cover',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  LOADER: {
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  TEXT: {
    fontFamily: 'monospace',
    letterSpacing: '1px',
  }
}

export default FaceStyle;
