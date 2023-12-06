export const estilos = {
    table: {
        style: {
            minHeight: '300px',
            borderWidth: '1px 0 1px 1px',
            borderStyle: 'solid',
            borderColor: '#A4A4A4',
            marginTop: '5px',
            borderRadius: '5px'
        },
    },
    tableWrapper: {
        style: {
            display: "table",
        },
    },
    responsiveWrapper: {
        style: {},
    },
    header: {
        style: {
            fontSize: "16px",
            backgroundColor: '#00042F',
            textTransform: 'uppercase',
            color: '#fff',
            fontWeight: 700,
            transform: 'translate(1.5, 1.5)',
            textAlign: 'center',
            fontColor: '#2b2b2b',
            minHeight: "30px",
            paddingLeft: "0px",
            paddingRight: "0px",
        },
    },
    subHeader: {
        style: {
            minHeight: "52px",
        },
    },
    head: {
        style: {
            fontSize: "10px",
            fontWeight: 500,
            minWidth: "0px",
            textAlign: "center",
        },
    },
    headRow: {
        style: {
            textTransform: 'uppercase',
            fontSize: '12px',
            marginTop: '0px',            
            textAlign: 'center',
            minHeight: "40px",
        },
        denseStyle: {
            minHeight: "32px",
        },
    },
    headCells: {
        style: {
            textAlign: 'center',
            paddingLeft: "5px",
            paddingRight: "0px",
            fontWeight: 700,
            borderWidth: '0px 0 1px 0px',
            borderStyle: 'solid',
            borderColor: '#9E9E9E',
        },
        draggingStyle: {
            cursor: "move",
        },
    },
    // contextMenu: {
    //     style: {
    //         fontSize: "12px",
    //         fontWeight: 400,
    //         paddingLeft: "16px",
    //         paddingRight: "8px",
    //         transform: 'translate3d(0, -100%, 0)',
    //         transitionDuration: '125ms',
    //         transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    //         willChange: 'transform',
    //     },
    //     activeStyle: {
    //         transform: 'translate3d(0, 0, 0)',
    //     },
    // },
    // cells: {
    //     style: {
    //         paddingLeft: '0px',
    //         paddingRight: '0px',
    //         // wordBreak: 'break-word',
    //     },
    //     draggingStyle: {},
    // },
    // rows: {
    //     style: {
    //         fontFamily: 'arial',
    //         fontSize: '12px',
    //         fontWeight: 0,
    //         minHeight: '35px',
    //         '&:not(:last-of-type)': {
    //             borderBottomStyle: 'solid',
    //             borderBottomWidth: '1px',
    //         },
    //     },
    //     denseStyle: {
    //         minHeight: "32px",
    //     },
    //     selectedHighlightStyle: {
    //         // use nth-of-type(n) to override other nth selectors
    //         '&:nth-of-type(n)': {
    //         },
    //     },
    //     highlightOnHoverStyle: {
    //         transitionDuration: '0.15s',
    //         transitionProperty: 'background-color',
    //         outlineStyle: 'solid',
    //         outlineWidth: '1px',
    //     },
    //     stripedStyle: {
    //     },
    // },
    expanderRow: {
        style: {
        },
    },
    expanderCell: {
        style: {
            flex: '0 0 48px',
        },
    },
    expanderButton: {
        style: {
            backgroundColor: 'transparent',
            borderRadius: '2px',
            transition: '0.25s',
            height: '100%',
            width: '100%',
            '&:hover:enabled': {
                cursor: 'pointer',
            },
            '&:disabled': {
            },
            '&:hover:not(:disabled)': {
                cursor: 'pointer',
            },
            '&:focus': {
                outline: 'none',
            },
            svg: {
                margin: 'auto',
            },
        },
    },
};