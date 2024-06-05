import React, { useEffect, useRef, useState } from 'react'
import Modal from 'components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Font } from '@react-pdf/renderer'
// import QRCode from "react-qr-code";
import { QRCode } from 'react-qrcode-logo';
import { Text, View, StyleSheet, Image, Svg } from '@react-pdf/renderer'
import logo from 'assets/images/logovic.jpg'
import qr_logo from 'assets/images/qr_logo.png'

import { fuentes } from 'assets/estilos/Fonts'
const RepRegCaducados = ({ registro, modal, close }) => {
    Font.register(fuentes);
    const qrUrl = useRef({})
    const [imageqr, setImageqr] = useState('')
  
    useEffect(() => {
      if (qrUrl.current) {
        generarQr();
      }
    }, [qrUrl.current]);
  
  
      // estilos del pdf 
    const styles = StyleSheet.create({
      // empiezo  prueba 
      contenedor_logo_qr: {
        width: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      prueba: {
        fontFamily: 'Oswald',
        fontSize: '14px',
        fontWeight: 'bold',
        paddingRight: '5px',
        marginBottom: '5px'
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
        marginBottom: '10px'
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
      logo2: {
          width: '100px',
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
        fontSize: '14px',
        fontWeight: 700,
        paddingRight: '5px',
      },
      dato: {
        fontSize: '9px',
        marginBottom: '5px'
      },
      celdaColorida: { backgroundColor: '#44556f' }, // Puedes cambiar el color aquí
      textoBlanco: { color: '#ffffff', fontSize: '10px', }, // Color blanco
  
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
                            <View style={styles.contenedor}>
                                <Text style={styles.prueba}>SOLICITUD DE RESERVA DE NOMBRE DADA DE BAJA POR FUERA DE PLAZO</Text>
                            </View>
                            <Text style={styles.prueba}>ESTADO:</Text>
                            <Text >CADUCADO</Text>

                      
        {/* la tabla desde este lugar */}
        
        <View style={styles.table}>
    {/* fila 1 */}
    <View style={styles.tableRow}> 
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>ENTIDAD</Text> 
        </View>
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>SIGLA</Text> 
        </View>
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>NATURALEZA</Text> 
        </View> 
        <View style={{ ...styles.tableCol, ...styles.celdaColorida}}> 
        <Text style={{...styles.tableCell, ...styles.textoBlanco}}>SOLICITANTE</Text> 
        </View>
        
        </View> 
        {/* fila 2 */}
        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{registro.entidad}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{registro.sigla}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{registro.naturaleza}</Text> 
        </View> 
        <View style={styles.tableCol}> 
        <Text style={styles.tableCell}>{registro.representante}</Text> 
        </View> 
        
        </View>
        
        
        {/* final de la tabla */}
      </View>
      

      <View style={styles.content}>
        {/* Contenido de tu documento */}
        <Text style={styles.dato}>{"\n"}La persona colectiva solicitante no presento su trámite de otorgación en el plazo de 60 días razón por lo cual se procedió a su eliminación de sistema de registro de personalidades juridícas (SIREPEJU) conforme al Art.9 del D.S. Nº 1597</Text>
        <Text style={styles.dato}>{"\n"}El contenido de este documento esta extraido del sistema SIREPEJU(Sistema de Registro de Personalidades Juridícas).</Text>
        <View style={styles.contenedor_logo_qr}>
                                  {imageqr != ''
                                  ? <Image style={styles.logo2} src={imageqr} />
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

export default RepRegCaducados
