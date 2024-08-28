import {obs, sendCommand} from "./obs";

let heartbeat = {}
let errorMessage = ''
let heartbeatInterval = setInterval(async () => {
  const stats = await sendCommand('GetStats')
  const streaming = await sendCommand('GetStreamStatus')
  const recording = await sendCommand('GetRecordStatus')
  heartbeat = {stats, streaming, recording}
  // console.log(heartbeat);
}, 1000) // Heartbeat
async function connect() {
  const password = document.getElementById('password').innerHTML
  const address = 'ws://localhost:4455'
  console.log('Connecting to:', address, '- using password:', password)
  await disconnect()
  try {
    const {obsWebSocketVersion, negotiatedRpcVersion} = await obs.connect(
      address,
      password
    )
    console.log(
      `Connected to obs-websocket version ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`
    )
  } catch (e) {
    console.log(e)
    errorMessage = e.message
    console.log('Error connecting to OBS:', errorMessage)
  }
}

async function disconnect() {
  await obs.disconnect()
  clearInterval(heartbeatInterval)
  errorMessage = 'Disconnected'
}

var connectButton: HTMLElement
window.addEventListener("load", () => {
  connectButton = document.getElementById('connect')
  connectButton.addEventListener('click', async () => {
    console.log('Connecting...')
    connectButton.className += 'disabled'
    await connect()
    connectButton.className = 'false'
  })
});
