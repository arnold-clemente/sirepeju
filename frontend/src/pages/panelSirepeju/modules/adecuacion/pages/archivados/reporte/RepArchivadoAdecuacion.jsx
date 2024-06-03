import React from 'react'

import Modal from 'components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import logo from 'assets/images/logovic.jpg'

const RepArchivadoAdecuacion = ({ adecuacion, fundadores, modal, close }) => {
    let fecha_esp = ''

    if (adecuacion.fecha_ingreso_tramite) {
        const date = new Date(adecuacion.fecha_ingreso_tramite);
        var dia = date.getDate();
        var mes = date.getMonth();
        var yyy = date.getFullYear();
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
        fecha_esp = dia + ' de ' + meses[mes] + ' del ' + yyy;
    }

    const styles = StyleSheet.create({
        main: {
            width: "100%",
            height: "90vh",
            boxSizing: "border-box",
        },
        page:{
            flexDirection:'row',
            backgroundColor:'#E4E4E4',
            margin:100
        },
        section:{
            margin:10,
            padding:10,
            flexGrow:1,
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
        contenedor_remitente:{
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
        textoBlanco: { color: '#ffffff',fontSize: '12px', }, // Color blanco
        
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
            top:500,
            left:180,
            opacity: 0.3, // Ajusta la opacidad según tus preferencias
            transform: 'rotate(-30deg)', // Rotación de la marca de agua
            fontSize: 60,
            color: 'gray', // Color de la marca de agua
          },
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
                                <Text style={styles.title}>TRAMÍTES DE  ADECUACIÓN ARCHIVADAS </Text>
                            </View>  
                            {/* la tabla desde este lugar */}
        
        <View style={styles.table}>
    {/* fila 1 */}
    <View style={styles.tableRow}> 
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>CÓDIGO</Text> 
        </View>
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>NATURALEZA</Text> 
        </View>
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>NOMBRE DE PERSONA COLECTIVA</Text> 
        </View>
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>SIGLA</Text> 
        </View> 
        </View> 
        {/* fila 2 */}
        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{adecuacion.codigo_adecuacion}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{adecuacion.naturaleza}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{adecuacion.personalidad_juridica}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{adecuacion.sigla}</Text> 
        </View> 
        </View>
      </View>
       {/* final de la tabla */}
    {/* Contenido de tu documento */}
        <View style={styles.content}>
        <Text style={styles.dato}>{"\n"}El contenido de este documento esta extraido del sistema SIREPEJU (Sistema de Registro de Personalidades Juridícas).</Text>
       
        <Text style={styles.dato}>{"\n"}{"\n"}{"\n"}Fecha y Hora de Impresión: {"\n"}{getCurrentDateTime()}</Text>
      </View>
      <View style={styles.watermark}>
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

export default RepArchivadoAdecuacion
