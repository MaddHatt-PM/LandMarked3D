import windowEvents from "./window-events"

export interface SetLocationNameProps {
  name: string
}

const setLocationName = (props: SetLocationNameProps) => {
  const event = new CustomEvent<SetLocationNameProps>(
    windowEvents.SetLocationName.valueOf(), {
      detail: { name: props.name}
    }
  )

  window.dispatchEvent(event);
}

export default setLocationName;