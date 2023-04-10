import toMainEvents from "../../IPCEvents/ipc-to-main-events";

const pickDirectory = (recieverEvent: string) => {
  window.api.request(toMainEvents.pickDirectory, {recieverEvent});
}

export default pickDirectory;