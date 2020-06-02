const styles = theme => ({
    root: {
        // backgroundColor: theme.palette.background.paper,
        height: 'calc(100% - 35px)',
        position: 'absolute',
        left: '0',
        width: '300px',
        boxShadow: '0px 0px 2px black'
    },
    listItem: {
        cursor: 'pointer'
    },
    newChatBtn: {
        borderRadius: '0px'
    },
    unreadMessage: {
        color: 'red',
        position: 'absolute',
        top: '0',
        right: '5px'
    },

    content: {
        // height: 'calc(100vh - 100px)',
        overflow: 'auto',
        padding: '25px',
        marginLeft: '300px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: '135px',
        bottom:"75px",
        width: 'calc(100% - 300px)',
        position: 'absolute'
    },

    userSent: {
        float: 'left',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
    },

    friendSent: {
        float: 'right',
        clear: 'both',
        padding: '20px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '300px',
        borderRadius: '10px'
    },

    chatHeader: {
        width: 'calc(100% - 301px)',
        height: '50px',
        backgroundColor: '#344195',
        // position: 'fixed',
        marginLeft: '301px',
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '10px',
        boxSizing: 'border-box'
    },

    sendBtn: {
        color: 'blue',
        cursor: 'pointer',
        '&:hover': {
            color: 'gray'
        }
    },

    chatTextBoxContainer: {
        position: 'absolute',
        bottom: '15px',
        left: '315px',
        boxSizing: 'border-box',
        overflow: 'auto',
        width: 'calc(100% - 300px - 50px)'
    },

    chatTextBox: {
        width: 'calc(100% - 25px)'
    },

    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing() * 3,
        marginRight: theme.spacing() * 3,
        [theme.breakpoints.up(400 + theme.spacing() * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        padding: `${theme.spacing() * 2}px ${theme.spacing() * 3}px ${theme.spacing() * 3}px`,
        position: 'absolute',
        width: '350px',
        top: '150px',
        left: 'calc(50% + 150px - 175px)'
    },
    input: {
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(),
    },
    submit: {
        marginTop: theme.spacing() * 3
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    }

});

export default styles;