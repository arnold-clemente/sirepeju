import React from 'react'

import Modal from '../../../components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const RepArchivadoOtorgacion = ({ otorgacion, fundadores, personalidad, modal, close }) => {
    let fecha_esp = ''

    if (otorgacion.fecha_ingreso_tramite) {
        const date = new Date(otorgacion.fecha_ingreso_tramite);
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
                                <Text style={styles.title}>Otorgacion</Text>
                                <Text style={styles.title}>Archivado de Otorgacion</Text>
                                <Text style={styles.title}>{fecha_esp}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>Número Registro: </Text>
                                <Text style={styles.dato}>{otorgacion.codigo_otorgacion}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>NOMBRE: </Text>
                                <Text style={styles.dato}>{otorgacion.personalidad_juridica}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>NATURALEZA: </Text>
                                <Text style={styles.dato}>{otorgacion.naturaleza}</Text>
                            </View>
                            {/* <View style={styles.lista}>
                                <Text style={styles.tipo}>RESOLUCION: </Text>
                                <Text style={styles.dato}>{personalidad.resolucion_ministerial}</Text>
                            </View> */}
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>FUNDADORES</Text>
                            </View>  
                            <View style={styles.table}>
                                <Text style={styles.table_head}>NOMBRE</Text>
                                <Text style={styles.table_head}>CEDULA</Text>
                            </View>
                            <View style={styles.table_body}>
                                {fundadores.length > 0
                                    ? fundadores.map((row, index) => {
                                        return (
                                            <View style={styles.table_tr} key={row.id}>
                                                <Text style={styles.table_item}>{row.nombre_completo}</Text>
                                                <Text style={styles.table_item}>{row.ci}</Text>
                                            </View>
                                        )
                                    })
                                    : null
                                }
                            </View>                         
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default RepArchivadoOtorgacion
