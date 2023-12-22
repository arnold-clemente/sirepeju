import React from 'react'
import Modal from '../../../components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import logo from '../../../images/logovic.jpg'

const RepReservados = ({ registro, modal, close }) => {
    let fecha_esp = ''

    if (registro.fecha_reg) {
        const date = new Date(registro.fecha_reg);
        var dia = date.getDate();
        var mes = date.getMonth();
        var yyy = date.getFullYear();
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
        fecha_esp = dia + ' de ' + meses[mes] + ' del ' + yyy;
    }

    // estilos del pdf 
    const styles = StyleSheet.create({
        main: {
            width: "100%",
            height: "76vh",
            boxSizing: "border-box",
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
        fecha: {
            fontSize: '14px',
            fontWeight: 700,
            paddingBottom: '20px'
        },
        logo: {
            width: '200px',
            marginBottom: '20px',
        },
        title: {
            textAlign: 'center',
            fontSize: '16px',
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
            fontSize: '12px',
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
                            <View style={styles.contenedor_fecha}>
                                <Text style={styles.fecha}>{fecha_esp}</Text>
                            </View>
                            <View style={styles.contenedor}>
                                <Text style={styles.title}>{registro.entidad}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>Sigla:</Text>
                                <Text style={styles.dato}>{registro.sigla}</Text>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default RepReservados
