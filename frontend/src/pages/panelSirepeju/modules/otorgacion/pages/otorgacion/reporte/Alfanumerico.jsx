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


const Alfanumerico = ({ registro, modal, close }) => {
    Font.register(fuentes);
    const qrUrl = useRef({})
    const [imageqr, setImageqr] = useState('')
  
    useEffect(() => {
      if (qrUrl.current) {
        generarQr();
      }
    }, [qrUrl.current]);
  
  
    const styles = StyleSheet.create({
        contenedor_logo_qr: {
            width: '70px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          },
        main: {
            width: "100%",
            height: "90vh",
            boxSizing: "border-box",
        },
        prueba: {
            fontFamily: 'Oswald',
            fontSize: '12px',
            fontWeight: 'bold',
            paddingRight: '10px',
            textAlign: 'center',
            marginBottom: '10px'
            
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
            backgroundColor: '#DFE9F5',
        },
        dato: {
            fontSize: '12px',
            marginBottom: '5px',
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
                           
                                <Text style={styles.prueba}>UNIDAD DE PERSONALIDADES JURÍDICAS {"\n"} CÓDIGO ÚNICO</Text>
                                
                            
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>ALFANÚMERICO: </Text>
                                <Text style={styles.dato}>{registro.alfanumerico}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>CÓDIGO DE ORIGEN: </Text>
                                <Text style={styles.dato}>{registro.codigo_otorgacion}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>NOMBRE: </Text>
                                <Text style={styles.dato}>{registro.personalidad_juridica} - {registro.sigla}</Text>
                            </View>
                            <View style={styles.lista}>
                                <Text style={styles.tipo}>NATURALEZA: </Text>
                                <Text style={styles.dato}>{registro.naturaleza}</Text>
                            </View>
                           
                            
                            <View style={styles.watermark}>
                            <Text>SIREPEJU</Text>
                            </View>
                            <View style={styles.contenedor_logo_qr}>
                {imageqr != ''
                  ? <Image style={styles.logo} src={imageqr} />
                  : null
                }
              </View>
                            <Text style={styles.dato}>Fecha y Hora de Impresión: {"\n"}{getCurrentDateTime()}</Text>
                            <View style={styles.footer}>
                            {/* Línea en el pie de página */}
                            <View style={styles.line}></View>
                            <Text>Casa Grande del Pueblo,calle Ayacucho - esq.Potosí,Tel:(591-2)2184178 {"\n"}La Paz -Bolivia {"\n"}Pagína{1}</Text>
        </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </Modal>
        </>
    )
}

export default Alfanumerico
