const QrCodeComponent = () => {
    const qrCodeData = 'https://tu-url-o-datos-para-el-codigo-qr';
  
    return (
      <View>
        <QRCode value={qrCodeData} />
      </View>
    );
  };