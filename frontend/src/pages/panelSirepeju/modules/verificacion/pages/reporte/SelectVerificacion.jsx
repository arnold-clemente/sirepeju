import React from 'react'
import Modal from 'components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import logo from 'assets/images/logovic.jpg'
// estilos 
import { watermark, image } from 'assets/estilos/MarcaAgua';
import styles from 'assets/estilos/Estilos'
const SelectVerificacion = ({ registro, modal, close }) => {
    const styles = StyleSheet.create({
        main: {
            width: "100%",
            height: "90vh",
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
        body: {
            width: "100%",
            height: "100%",
            paddingTop: "25px",
            paddingBottom: "25px",
            paddingRight: "25px",
            paddingLeft: "35px",

        },
        contenedor: {
            width: '100%',

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
            fontSize: '8px',
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
            marginBottom: '6px',
        },
        tipo: {
            fontSize: '14px',
            fontWeight: 700,
            paddingRight: '2px',
        },
        dato: {
            fontSize: '8px',
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
        watermark: {
            position: 'absolute',
            top: 500,
            left: 180,
            opacity: 0.3, // Ajusta la opacidad según tus preferencias
            transform: 'rotate(-30deg)', // Rotación de la marca de agua
            fontSize: 60,
            color: 'gray', // Color de la marca de agua
        },


    });
    return (
        <>
            <Modal isOpen={modal} closeModal={close}>

                <PDFViewer style={styles.main}>
                    <Document>
                        <Page size="letter" style={styles.body}>
                            <View style={styles.contenedor_logo}>
                                <Image style={styles.logo} src={logo} />
                            </View>
                            <View style={styles.contenedor}>
                                <Text style={styles.title}>VERIFICACIÓN DE NOMBRE </Text>
                            </View>
                            {/* la tabla desde este lugar */}
                            <View style={styles.table}>
                                {/* fila 1 */}
                                <View style={styles.tableRow}>
                                    <View style={{ ...styles.tableCol, ...styles.celdaColorida }}>
                                        <Text style={{ ...styles.tableCell, ...styles.textoBlanco }}>NATURALEZA</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol, ...styles.celdaColorida }}>
                                        <Text style={{ ...styles.tableCell, ...styles.textoBlanco }}>NOMBRE</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol, ...styles.celdaColorida }}>
                                        <Text style={{ ...styles.tableCell, ...styles.textoBlanco }}>SIGLA</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol, ...styles.celdaColorida }}>
                                        <Text style={{ ...styles.tableCell, ...styles.textoBlanco }}>UBICACIÓN</Text>
                                    </View>
                                </View>
                                {/* fila 2 */}
                                {registro.length > 0
                                    ? registro.map((row, index) => {
                                        return (
                                            <View style={styles.tableRow} key={index}>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCell}>{row.naturaleza}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCell}>{row.entidad}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCell}>{row.sigla}</Text>
                                                </View>
                                                <View style={styles.tableCol}>
                                                    <Text style={styles.tableCell}>REGISTRADO EN S.I.R.E.P.E.J.U.</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                    : null
                                }

                                {/* final de la tabla */}
                            </View>
                            <View>
                                {/* <Image style={styles.logo} src={qr} /> */}
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default SelectVerificacion
