var socket = io.connect(myDomain);

socket.on('refreshPriceTablePage', function(data) {
  console.log('Upade gold price successful!');
  location.reload();
});