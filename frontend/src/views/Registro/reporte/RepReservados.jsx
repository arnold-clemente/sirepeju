import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../../components/ModalPdf'

import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Font } from '@react-pdf/renderer'
// import QRCode from "react-qr-code";
import { QRCode } from 'react-qrcode-logo';
import { Text, View, StyleSheet, Image, Svg } from '@react-pdf/renderer'

import qr_logo from '../../../images/qr_logo.png'

import { fuentes } from '../../../estilos/Fonts';



const RepReservados = ({ registro, modal, close }) => {
    
    
    Font.register(fuentes);
    const qrUrl = useRef({})
    const [imageqr, setImageqr] = useState('')
  
    useEffect(() => {
      if (qrUrl.current) {
        generarQr();
      }
    }, [qrUrl.current]);
  
    //para el rectangulo 
   
      

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
            paddingRight: "1.5cm",
            paddingLeft: "2.5cm",
        },

        container: {
            width: '500px',
            border: '1.5px solid #1A5276',
            padding: '4px',
            whiteSpace: 'nowrap',
            backgroundColor: '#CBD6E2'
            
          },
          text: {
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
          },


        title: {

            textAlign: 'center',
            fontSize: '20px',
            marginBottom: '5px',
            marginTop: '70px',
            fontStyle: 'italic',
            fontWeight: 1255500,
        
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
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',

        },
        rectangle: {
            width: 500,
            height: 30,
            backgroundColor: '#F5F5F5',
            border: '1px solid #0000000',
            justifyContent: 'center',
            alignItems: 'center',
        },
    
        customFont: {
            fontFamily: 'Arial, sans-serif', // Puedes cambiar "Arial" al tipo de letra que desees
            fontSize: 16,
        },
        parrafo: {

            fontSize: '15px',
            marginBottom: '10px',
            marginTop: '15px',
            textAlign: 'justify',
            

        },
        certificado: {
            textAlign: 'center',
            fontSize: '18px',
            marginBottom: '5px',


        },
        letra: {
            textAlign: 'justify',
            fontSize: '10px',
            marginBottom:'7px',
            marginTop: '15px',

        },
        correlativo: {
            textAlign: 'rigth',
            fontSize: '9px',
            fontWeight: 'bold'

        },
        
        fecha:
        {
            
            fontSize: '12px',
            marginBottom: '2px',
            marginTop: '25px',
            textAlign: 'justify',
            marginright:'100px',

        },
        logo: {
            marginTop: '10px',
            width: '75px',
           
            
        },
        date: {
            fontSize: 15,
            textAlign: 'right',
            marginBottom:'70px',
          },
        
    });

      // Obtener la fecha actual y formatearla
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

    
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
                {/* <QRCode value='pamela_paola' size={90}/> */}
                <PDFViewer style={styles.main}>

                    <Document>

                        <Page size="letter" style={styles.body}>



                            <View style={styles.contenedor}>
                                <Text style={styles.title}>MINISTERIO DE LA PRESIDENCIA {"\n"}VICEMINISTERIO DE AUTONOMÍAS</Text>
                            </View>

                            <Text style={styles.parrafo}>El Viceministerio de Autonomías del Ministerio de la Presidencia con las atribuciones conferidas
                                por el Artículo 25 de Decreto Supremo Nº 4857, de 06 de enero de 2023 otorga el presente,</Text>
                            <View style={styles.contenedor}>
                                <Text style={styles.certificado}>CERTIFICADO DE RESERVA DE NOMBRE{"\n"} a favor de: </Text>
                            </View>
                            <View style={styles.section}>
                                
                            <View style={styles.container}>
                            <Text style={styles.text}>{registro.entidad} - ({registro.sigla})</Text>
                            </View>
                                
                                
                            </View>
                            <Text style={styles.parrafo}>Al haberse verificado la inexistencia de duplicidad de nombre en la Base de Datos del Viceministerio de Autonomías y las remitidas por las entidades competentes, otorgándole prelación respecto a solicitudes posteriores, excepto de terceros que aleguen o justifiquen mejor derecho.</Text>
                            <View style={styles.lista}>
                                <Text style={styles.letra}>Consiguientemente,la {registro.entidad} - ({registro.sigla}) cuya naturaleza es {registro.naturaleza} tiene el plazo de SESENTA (60) dìas habiles para iniciar
                                    el trámite de otorgación de personalidad jurídica,computables desde la fecha de emisión
                                    del presente certificado, caso contrario, este documento carecerá de validez legal
                                    procedíendose a la eliminación de la reserva de nombre del sistema, conforme lo dispuesto por
                                    el artìculo 9 del Decreto Supremo N° 1597, vigente a través del Decreto Supremo N°4635 de 08
                                    de diciembre de 2021.</Text>                     
                            </View>
                            <Text style={styles.date}>{formattedDate}</Text>
                            <View>
                             <View style={styles.contenedor_logo_qr}>
                            {imageqr != ''
                             ? <Image style={styles.logo} src={imageqr} />
                             : null
                             }
                            </View>
                                <Text style={styles.correlativo}>Número correlativo: {registro.nro_certificado}</Text>
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
