import toMainEvents from "../../IPCEvents/ipc-to-main-events";

interface CloneProjectProps {
  sourcePath: string;
  destinationPath: string;
}

const cloneProject = (props: CloneProjectProps) => {
  window.api.request(toMainEvents.cloneLocation, {
    sourcePath: props.sourcePath,
    destinationPath: props.destinationPath,
  })
}

export default cloneProject;