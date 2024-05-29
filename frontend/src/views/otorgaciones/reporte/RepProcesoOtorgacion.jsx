import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../../components/ModalPdf'

import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Font } from '@react-pdf/renderer'
// import QRCode from "react-qr-code";
import { QRCode } from 'react-qrcode-logo';
import { Text, View, StyleSheet, Image, Svg } from '@react-pdf/renderer'
import logo from '../../../images/logovic.jpg'
import qr_logo from '../../../images/qr_logo.png'

import { fuentes } from '../../../estilos/Fonts';


const RepProcesoOtorgacion = ({ otorgacion, fundadores, personalidad, modal, close }) => {
  Font.register(fuentes);
  const qrUrl = useRef({})
  const [imageqr, setImageqr] = useState('')

  useEffect(() => {
    if (qrUrl.current) {
      generarQr();
    }
  }, [qrUrl.current]);


    let fecha_esp = ''

    if (otorgacion.fecha_ingreso_tramite) {
        const date = new Date(otorgacion.fecha_ingreso_tramite);
        var dia = date.getDate();
        var mes = date.getMonth();
        var yyy = date.getFullYear();
        const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
        fecha_esp = dia + ' DE ' + meses[mes] + ' DEL ' + yyy;
    }
   
  
    const styles = StyleSheet.create({
        contenedor_logo_qr: {
            width: '100px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          },
          prueba: {
            fontFamily: 'Oswald',
            fontSize: '10px',
            fontWeight: 'bold',
            paddingRight: '5px',
          },
          prueba2: {
            fontFamily: 'Oswald',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center'
          },
      
          // fin prueba 
          main: {
            width: "100%",
            height: "90vh",
            boxSizing: "border-box",
          },
          page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
            margin: 5
          },
          section: {
            margin: 100,
            padding: 100,
            flexGrow: 1,
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
          contenedor_remitente: {
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
            fontSize: '12px',
            marginBottom: '5px'
          },
          lista: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: '10px',
          },
          tipo: {
            fontSize: '10px',
            fontWeight: 700,
            paddingRight: '5px',
            marginBottom: '10px',
          },
          dato: {
            fontSize: '9px',
          },
          celdaColorida: { backgroundColor: '#44556f' }, // Puedes cambiar el color aquí
          textoBlanco: { color: '#ffffff', fontSize: '11px', }, // Color blanco
      
          boldText: {
            fontWeight: 'bold',
            fontSize: '9px',
            justifyContent: 'center',
          },
           table: {
              display: "table",
              width: "auto",
              borderStyle: "solid",
              borderWidth: 1,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              //borderRadius: "10px"
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
            fontSize: '9px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
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
    const getCurrentDateTime = () => {
        const currentDateTime = new Date();
        return currentDateTime.toLocaleString();
      };
      const generarQr = () => {
        const serializer = new XMLSerializer();
        // console.log(qrUrl.current.canvas.current)
        const svgStr = serializer.serializeToString(qrUrl.current.canvas.current);
        const prueba = qrUrl.current.canvas.current;
        // prueba.toDataURL("image/jpeg");
        // const img_src = 'data:image/canvas;base64,' + window.btoa(svgStr);
        // const img_src = 'data:image/svg+xml;base64,' + window.btoa(svgStr);
        setImageqr(prueba.toDataURL("image/jpeg"));
      };
    
    return (
        <>
        <div className='d-none'>
        {/* esto configura el qr  */}
        <QRCode value="https://va.presidencia.gob.bo/index.php/institucion/personalidades-juridicas"
          logoImage={qr_logo}
          logoWidth={120}
          logoHeight={120}
          logoPadding={1}
          fgColor="#01273D"
          removeQrCodeBehindLogo={false}
          size={500}
          // bgColor="#000"
          logoOpacity={1}
          qrStyle={'dots'}
          logoPaddingStyle={'circle'}
          eyeColor={[
            {
              outer: '#0277BD',
              inner: '#0273B6'
            },
            {
              outer: '#0277BD',
              inner: '#0275B9'
            },
            {
              outer: '#000B11',
              inner: '#000203'
            },

          ]}
          ref={qrUrl}
          id='prueba_image'

        />
      </div>
            <Modal isOpen={modal} closeModal={close}>
                <PDFViewer style={styles.main}>
                    <Document>
                        <Page size="letter" style={styles.body}>
                            
                            <View style={styles.contenedor_logo}>
                                <Image style={styles.logo} src={logo} />
                            </View>
                            <Text style={styles.prueba2}>ESTADO DE TRÁMITE DE OTORGACIÓN</Text>
                                
                            <View style={styles.contenedor}>
                                
                                <Text style={styles.prueba}>TIPO DE TRÁMITE:</Text>
                                <Text style={styles.tipo}>TRÁMITE DE SOLICITUD DE OTORGACÍON DE PERSONALIDAD JURÍDICA{'\n'}</Text>
                                <Text style={styles.prueba}>FECHA DE INICIO DE TRÁMITE: </Text>
                                <Text style={styles.tipo}>{fecha_esp}{'\n'}</Text>
                                <Text style={styles.prueba}>REPRESENTANTE LEGAL:</Text> 
                                <Text style={styles.tipo}>{otorgacion.representante}</Text>
                            </View>
                             {/* la tabla desde este lugar */}
                             
        <View style={styles.table}>
    {/* fila 1 */}
    <View style={styles.tableRow}> 
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>CODÍGO</Text> 
        </View>
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>NATURALEZA</Text> 
        </View>
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>ENTIDAD</Text> 
        </View>
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>SIGLA</Text> 
        </View> 
        </View> 
        {/* fila 2 */}
        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{otorgacion.codigo_otorgacion}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{otorgacion.naturaleza}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{otorgacion.personalidad_juridica}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{otorgacion.sigla}</Text> 
        </View> 
        </View>
      
    {/* fila 1 */}
   
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>ESTADO DE TRÁMITE</Text> 
        </View>
        
        
        
    
        {/* fila 2 */}
        
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>EN TRÁMITE</Text> 
        </View> 
        
        
       
      </View>
       {/* final de la tabla */}
      
 

      <View style={styles.content}>
        {/* Contenido de tu documento */}
        <Text style={styles.dato}>{'\n'}El contenido de este documento esta extraido del sistema SIREPEJU(Sistema de Registro de Personalidades Juridícas).</Text>
        <View style={styles.contenedor_logo_qr}>
                {imageqr != ''
                  ? <Image style={styles.logo} src={imageqr} />
                  : null
                }
              </View>

        <Text style={styles.dato}>Fecha y Hora de Impresión: {"\n"}{getCurrentDateTime()}</Text>
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

export default RepProcesoOtorgacion
