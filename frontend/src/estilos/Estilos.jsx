const styles = {
    main: {
        width: "100%",
        height: "76vh",
        boxSizing: "border-box",
    },
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        margin: 100
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    h2:{
        fontSize: '5px',
    },
    body: {
        width: "100%",
        height: "100%",
        paddingTop: "2.5cm",
        paddingBottom: "2.5cm",
        paddingRight: "2.5cm",
        paddingLeft: "3cm",

    },
    contenedor: {
        width: '100%',
        marginBottom: '1cm'
    },
    contenedor_logo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    contenedor_fecha: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    contenedor_remitente: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },

    fecha: {
        fontSize: '14px',
        fontWeight: 700,
        paddingBottom: '20px'
    },
    remitente: {
        fontSize: '12px',
        textAlign: 'justify',
        fontWeight: 'BoldSpan',

        paddingRight: '5px',
    },
    logo: {
        width: '500px',
        marginBottom: '2px',
    },
    title: {
        textAlign: 'center',
        fontSize: '16px',
        marginBottom: '20px'
    },
    lista: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '10px',
    },
    tipo: {
        fontSize: '14px',
        fontWeight: 700,
        paddingRight: '5px',
    },
    dato: {
        fontSize: '11px',
    },
    celdaColorida: { backgroundColor: '#44556f' }, // Puedes cambiar el color aquí
    textoBlanco: { color: '#ffffff', fontSize: '12px', }, // Color blanco

    boldText: {
        fontWeight: 'bold',
        fontSize: '12px',
        justifyContent: 'center',
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {

        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {

        margin: "auto",
        marginTop: 5,
        fontSize: 10,
        fontWeight: 'bold'
    },
    content: {
        flexGrow: 1,
    },
    footer: {
        textAlign: 'center',
        fontSize: 10,
        marginTop: 10,
    },
    line: {
        borderBottom: '1px solid black',
        width: '100%',
    },
    

};

export default styles;