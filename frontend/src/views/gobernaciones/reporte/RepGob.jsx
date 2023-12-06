import React from 'react'
import Modal from '../../../components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const RepGob = ({ registro, modal, close }) => {
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
                            <View style={styles.contenedor}>
                                <Text style={styles.title}>Gobernacion</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>Nombre:</Text>
                                <Text style={styles.dato}>{registro.nombres + ' ' + registro.paterno + ' ' + registro.materno}</Text>
                            </View>


                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default RepGob
