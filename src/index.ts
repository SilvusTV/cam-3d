import {getObs} from "./obs";
import OBSWebSocket from "obs-websocket-js";


let connected = false
function setConnected(value: boolean) {
  connected = value
}
let obs: any
function setObs(value: OBSWebSocket) {
  obs = value
}
let errorMessage : string
function setErrorMessage (value: string)  {
  errorMessage = value
}
async function connect() {
  const password = document.getElementById('password').innerHTML
  const address = document.getElementById('password').innerHTML
  console.log('Connecting to:', address, '- using password:', password)
  await disconnect()
  try {
    async function connect() {
      setObs(await getObs(address, password))
      setConnected(true);
      console.log(obs)
    }
    console.log(
      `Connected to obs-websocket version ${obs.obsWebSocketVersion} (using RPC ${obs.negotiatedRpcVersion})`
    )
  } catch (e) {
    console.log(e)
    setErrorMessage(e.message)
    console.log('Error connecting to OBS:', errorMessage)
  }
}

async function disconnect() {
  await obs.disconnect()
  setErrorMessage('Disconnected')
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
