import React from 'react'

import Modal from 'components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import logo from 'assets/images/logovic.jpg'


const Alfanumerico = ({ registro, modal, close }) => {

    const styles = StyleSheet.create({
        main: {
            width: "100%",
            height: "90vh",
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
        logo: {
            width: '500px',
            marginBottom: '2px',
        },
        contenedor: {
            width: '100%',
            marginBottom: '1cm'
        },
        title: {
            textAlign: 'center',
            fontSize: '16px',
        },
        content: {
            flexGrow: 1,
          },
        lista: {
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '10px',
        },
        tipo: {
            fontSize: '12px',
            
            marginBottom: '8px',
            fontWeight: 'bold',
            textDecoration: 'underline',
            backgroundColor: '#FFB6C1',
        },
        dato: {
            fontSize: '10px',
            marginBottom: '8px',
        },

        estilos_h1: {
            fontSize: '8px',
            textAlign: 'center',

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
            top:500,
            left:180,
            opacity: 0.3, // Ajusta la opacidad según tus preferencias
            transform: 'rotate(-30deg)', // Rotación de la marca de agua
            fontSize: 60,
            color: 'gray', // Color de la marca de agua
          }
    });
    const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        return currentDateTime.toLocaleString();
      };
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
                                <Text style={styles.title}>T Codigo</Text>
                                <Text style={styles.title}>Alfa[100]</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>Id: </Text>
                                <Text style={styles.dato}>{registro.alfanumerico}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>Número Registro: </Text>
                                <Text style={styles.dato}>{registro.codigo_otorgacion}</Text>
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
                                <Text style={styles.tipo}>NOTA INTERNA: </Text>
                                <Text style={styles.dato}>{registro.nota_interna_final}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>INFORME FINAL: </Text>
                                <Text style={styles.dato}>{registro.numero_informe_final}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>FECHA DE ENVIO: </Text>
                                <Text style={styles.dato}>{registro.fecha_envio}</Text>
                            </View>
                            <View style={styles.watermark}>
                            <Text>SIREPEJU</Text>
                            </View>
                            <Text style={styles.dato}>{"\n"}{"\n"}{"\n"}Fecha y Hora de Impresión: {"\n"}{getCurrentDateTime()}</Text>
                            <View style={styles.footer}>
                            {/* Línea en el pie de página */}
                            <View style={styles.line}></View>
                            <Text>Casa Grande del Pueblo,calle Ayacucho - esq.Potosí,Tel:(591-2)2184178 {"\n"}La Paz -Bolivia {"\n"}{"\n"}Pagína{1}</Text>
        </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default Alfanumerico
