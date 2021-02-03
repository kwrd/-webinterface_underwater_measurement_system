// 情報元： https://shimz.me/blog/microbit/5456
var bluetoothDevice;
var characteristic;
//micro:bit BLE UUID
var SERVICE_UUID                        = 0xec00;
var TEXT_CHARACTERISTIC_UUID            = 0xEC0F;

//ボタンイベントリスナー
document.getElementById('connect').addEventListener("click", connect);
document.getElementById('disconnect').addEventListener("click", disconnect);
document.getElementById('send').addEventListener("click", sendMessage);

//micro:bitに接続する
function connect() {
  let options = {};

  //options.acceptAllDevices = true;
  options.filters = [
    {services: [0xec00]},
    //{namePrefix: "raspberrypi"}
  ];
  navigator.bluetooth.requestDevice({
      filters: [{ services: [0xec00] }]
  })
  .then(device => {
    bluetoothDevice = device;
    console.log("device", device);
    return device.gatt.connect();
  })
  .then(server =>{
    console.log("server", server)
    return server.getPrimaryService(SERVICE_UUID);
  })
  .then(service => {
    console.log("service", service)
    return service.getCharacteristic(TEXT_CHARACTERISTIC_UUID)
  })
  .then(chara => {
    console.log("characteristic", chara)
    alert("BLE接続が完了しました。");
    characteristic = chara;
  })
  .catch(error => {
    console.log("message: ",error.message);
  });
}

//LEDに表示するメッセージを送信
function sendMessage() {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected || !characteristic) return ;
  var text = document.querySelector("#message").value;
  var arrayBuffe = new TextEncoder().encode(text);
  characteristic.writeValue(arrayBuffe);
}

//BLE切断処理
function disconnect() {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected) return ;
  bluetoothDevice.gatt.disconnect();
  alert("BLE接続を切断しました。")
}