import React from 'react'

import Modal from '../../../components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const AdecuacionAlfanumerico = ({ registro, modal, close }) => {
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

        }

    });

    return (
        <>
            <Modal isOpen={modal} closeModal={close}>
                <PDFViewer style={styles.main}>
                    <Document>
                        <Page size="letter" style={styles.body}>
                            <View style={styles.contenedor}>
                                <Text style={styles.title}>T Codigo</Text>
                                <Text style={styles.title}>Alfa[100]</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>Id: </Text>
                                <Text style={styles.dato}>{registro.alfanumerico}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>Número Registro: </Text>
                                <Text style={styles.dato}>{registro.codigo_adecuacion}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>NOMBRE: </Text>
                                <Text style={styles.dato}>{registro.personalidad_juridica}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>NATURALEZA: </Text>
                                <Text style={styles.dato}>{registro.naturaleza}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>NOTA: </Text>
                                <Text style={styles.tipo}>NOTA INTERNA: </Text>
                                <Text style={styles.dato}>{registro.nota_interna_final}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>INFORME: </Text>
                                <Text style={styles.tipo}>INFORME FINAL: </Text>
                                <Text style={styles.dato}>{registro.numero_informe_final}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>FECHA DE ENVIO: </Text>
                                <Text style={styles.dato}>{registro.fecha_envio}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>CÓDIGO ALFANÚMERICO: </Text>
                                <Text style={styles.estilos_h1}>{registro.alfanumerico}</Text>
                                <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png'}></Image>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default AdecuacionAlfanumerico
