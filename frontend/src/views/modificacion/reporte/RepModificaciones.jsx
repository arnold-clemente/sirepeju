import React from 'react'

import Modal from '../../../components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const RepModificaciones = ({ registro, modal, close }) => {
    let fecha_esp = ''

    if (registro.fecha_ingreso_tramite) {
        const date = new Date(registro.fecha_ingreso_tramite);
        var dia = date.getDate();
        var mes = date.getMonth();
        var yyy = date.getFullYear();
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
        fecha_esp = dia + ' de ' + meses[mes] + ' del ' + yyy;
    }

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
            justifyContent: 'flex-start',
            marginBottom: '10px',
        },
        tipo: {
            fontSize: '14px',
            fontWeight: 700,
            marginBottom: '5px',
        },
        dato: {
            fontSize: '14px',
        },

        estilos_h1: {
            fontSize: '8px',
            textAlign: 'center',

        },
        table: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-between',
        },
        table_head: {
            border: '1px',
            borderColor: '#000',
            borderStyle: 'solid',
            fontSize: '14px',
            padding: '5px'
        },
        table_body: {
            with: '100%',
        },
        table_tr: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        table_item: {
            border: '1px',
            borderColor: '#000',
            borderStyle: 'solid',
            fontSize: '12px',
            padding: '5px'
        }

    });

    return (
        <>
            <Modal isOpen={modal} closeModal={close}>
                <PDFViewer style={styles.main}>
                    <Document>
                        <Page size="letter" style={styles.body}>
                            <View style={styles.contenedor}>
                                <Text style={styles.title}>Modificacion</Text>
                                <Text style={styles.title}>Proceso de Modificacion</Text>
                                <Text style={styles.title}>{fecha_esp}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>Número Registro: </Text>
                                <Text style={styles.dato}>{registro.codigo_modificacion}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>NOMBRE: </Text>
                                <Text style={styles.dato}>{registro.personalidad_juridica}</Text>
                            </View>
                                                    
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default RepModificaciones
