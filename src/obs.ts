import OBSWebSocket from "obs-websocket-js";

export async function getObs(address: string, password: string) {
  const obs = new OBSWebSocket();
  await obs.disconnect()
  await obs.connect(address, password)
  return obs;
}
