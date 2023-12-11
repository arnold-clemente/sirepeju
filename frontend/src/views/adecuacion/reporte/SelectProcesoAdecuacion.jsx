import React from 'react'
import Modal from '../../../components/ModalPdf'
import { PDFViewer, Document, Page } from '@react-pdf/renderer'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const SelectProcesoAdecuacion = ({ registro, modal, close }) => {
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '10px',
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
                <Text style={styles.title}>Proceso de Adecuacion</Text>
              </View>
              <View style={styles.table}>
                <Text style={styles.table_head}>Entidad</Text>
                <Text style={styles.table_head}>Sigla</Text>
              </View>
              <View style={styles.table_body}>
                {registro.length > 0
                  ? registro.map((row, index) => {
                    return (
                      <View style={styles.table_tr} key={row.id}>
                        <Text style={styles.table_item}>{row.personalidad_juridica}</Text>
                        <Text style={styles.table_item}>{row.sigla}</Text>
                      </View>
                    )
                  })
                  : null
                }
              </View>
              <View>
                {/* <Image style={styles.logo} src={qr} /> */}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </Modal>
    </>
  )
}

export default SelectProcesoAdecuacion
