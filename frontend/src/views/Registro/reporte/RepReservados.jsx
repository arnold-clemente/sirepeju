import React from 'react'
import Modal from '../../../components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import logo from '../../../images/qr.png'
//generador de qr

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
            height: "90vh",
            boxSizing: "border-box",
        },
        body: {
            width: "100%",
            height: "100%",
            paddingTop: "2cm",
            paddingBottom: "2cm",
            paddingRight: "2cm",
            paddingLeft: "2cm",
        },



        title: {

            textAlign: 'center',
            fontSize: '20px',
            marginBottom: '30px',
            marginTop: '70px',
            fontStyle: 'italic',
            fontWeight: 700,
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
            fontSize: '14px',
        },
        rectangle: {
            width: 500,
            height: 30,
            backgroundColor: '#F5F5F5',
            border: '1px solid #0000000',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: 'blue',
            fontSize: 11,
        },
        customFont: {
            fontFamily: 'Arial, sans-serif', // Puedes cambiar "Arial" al tipo de letra que desees
            fontSize: 16,
        },
        parrafo: {

            fontSize: '14px',
            marginBottom: '30px',
            marginTop: '10px',
            textAlign: 'justify',

        },
        certificado: {
            textAlign: 'center',
            fontSize: '18px',
            marginBottom: '20px',


        },
        letra: {
            textAlign: 'justify',
            fontSize: '9px',
            marginBottom: '30px',
            marginTop: '10px',

        },
        correlativo: {
            textAlign: 'rigth',
            fontSize: '9px',

        },
        fecha_impre:
        {
            textAlign: 'center',
            fontSize: '9px',
            marginBottom: '30px',
            marginTop: '10px',

        },
        logo: {
            width: '60px',
            marginBottom: '2px',
            marginTop: '10px',
        },

    });
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    return (
        <>

            <Modal isOpen={modal} closeModal={close}>
                {/* <QRCode value='pamela_paola' size={90}/> */}
                <PDFViewer style={styles.main}>

                    <Document>

                        <Page size="letter" style={styles.body}>



                            <View style={styles.contenedor}>
                                <Text style={styles.title}>MINISTERIO DE LA PRESIDENCIA {"\n"}VICEMINISTERIO DE AUTONOMÍAS</Text>
                            </View>

                            <Text style={styles.parrafo}>El Viceministerio de Autonomìas del Ministerio de la Presidencia con las atribuciones conferidas
                                por el Artìculo 25 de Decreto Supremo Nº 4857 de 06 de enero de 2023 Otorga el Presente,</Text>
                            <View style={styles.contenedor}>
                                <Text style={styles.certificado}>CERTIFICADO DE RESERVA DE NOMBRE{"\n"} a favor de la </Text>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.rectangle}>
                                    <Text style={styles.dato}>{registro.entidad}</Text>
                                </View>
                            </View>
                            <Text style={styles.parrafo}>Al haberse verificado la inexistecia de la duplicidad de nombre en la Base de Datos del Viceministerio de Autonomìas y las remitidas por las entidades competentes, otorgàndole prelaciòn respecto a solicitudes posteriores, excepto de terceros que aleguen o justifiquen mejor derecho.</Text>
                            <View style={styles.lista}>
                                <Text style={styles.letra}>Consiguientemente, el (la){registro.entidad} ENTIDAD SIN FINES DE
                                    LUCRO tiene el plazo de SESENTA (60) dìas habiles para iniciar
                                    el tràmite de otorgación de personalidad jurídica,computables desde la fecha de emision
                                    del presente certificado, caso contrario, este documento carecerá de validez legal
                                    procedìendose a la eliminación de la reserva de nombre del sistema, conforme lo dispuesto por
                                    el artìculo 9 del decreto supremo N°1597, vigente a travès del Decreto Supremo N°4635 de 08
                                    de diciembre de 2021.</Text>
                            </View>
                            <View>
                                <View style={styles.contenedor_logo}>
                                    <Image style={styles.logo} src={logo} />
                                </View>
                                <Text style={styles.correlativo}>Número Correlativo{registro.nro_certificado}</Text>
                                <Text style={styles.correlativo}>AHRG/rif</Text>
                            </View>


                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default RepReservados
