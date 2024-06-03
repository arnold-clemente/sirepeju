import React from 'react'
import Modal from 'components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import logo from 'assets/images/logovic.jpg'
// estilos 
import { watermark, image } from 'assets/estilos/MarcaAgua';
import styles from 'assets/estilos/Estilos'

const RepAdm = ({ registro, modal, close }) => {
      
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
                                <Text style={styles.title}>DATOS REGISTRADOS DEL PERSONAL EN LA UNIDAD DE PERSONALIDADES JURÍDICAS </Text>
                            </View>
                            
                           {/* la tabla desde este lugar */}

                            <View style={styles.table}>
                                {/* fila 1 */}
                                <View style={styles.tableRow}>
                                    <View style={{ ...styles.tableCol, ...styles.celdaColorida }}>
                                        <Text style={{ ...styles.tableCell, ...styles.textoBlanco }}>NOMBRE</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol, ...styles.celdaColorida }}>
                                        <Text style={{ ...styles.tableCell, ...styles.textoBlanco }}>CARGO</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol, ...styles.celdaColorida }}>
                                        <Text style={{ ...styles.tableCell, ...styles.textoBlanco }}>CI</Text>
                                    </View>
                                    <View style={{ ...styles.tableCol, ...styles.celdaColorida }}>
                                        <Text style={{ ...styles.tableCell, ...styles.textoBlanco }}>NIVEL DE ACCESO</Text>
                                    </View>
                                </View>
                                {/* fila 2 */}
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{registro.nombres + ' ' + registro.paterno + ' ' + registro.materno}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{registro.cargo}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{registro.ci + ' ' + registro.ext_ci}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{registro.usuario}</Text>
                                    </View>
                                </View>
                                {/* final de la tabla */}
                            </View>

                            <View style={styles.content}>
                                {/* Contenido de tu documento */}
                                <Text style={styles.dato}>{"\n"}El contenido de este documento esta extraido del sistema SIREPEJU(Sistema de Registro de Personalidades Juridícas).</Text>

                                <Text style={styles.dato}>{"\n"}{"\n"}{"\n"}Fecha y Hora de Impresión: {"\n"}{getCurrentDateTime()}</Text>
                            </View>
                            <View style={watermark}>
                                <Text>SIREPEJU</Text>
                            </View>
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

export default RepAdm
