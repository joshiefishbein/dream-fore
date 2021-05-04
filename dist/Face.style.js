var FaceStyle = {
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
        top: 0,
        left: 0
    },
    TEXT: {
        fontFamily: 'monospace',
        letterSpacing: '1px',
        marginTop: '2rem'
    }
};
export default FaceStyle;
