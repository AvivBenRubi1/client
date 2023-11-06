import { useReducer, createContext, useCallback, useContext } from "react"
import MarkerData from "../interfaces/markerData"
import Telemetry from "../dtos/telemetry"


type Action = {
    type: string,
    payload: any
}

type Marker = {
    metadata: MarkerData,
    mapData: L.Marker
}

type State = {
    markers: {
        [key: string]: Marker
    },
    droneData: {
        [key: string]: Telemetry
    }
}

type ReturnedState = {
    setMarker: (marker:Marker) => void,
    setDroneData: (telemetry: Telemetry) => void
} & State

const initialState : State = {
    markers: {},
    droneData: {}
}

const context = createContext<ReturnedState>({
    ...initialState,
    setMarker: (marker: Marker) => {},
    setDroneData: (telemetry: Telemetry) => {},
})

context.displayName = 'mapContext'
const Provider = context.Provider


const reducerFunc = (state: State, action: Action) : State => {
    switch (action.type) {
        case 'setMarkers':
            return {...state, markers: {...state.markers, [`${action.payload.metadata.serial_number}_${action.payload.metadata.type}`]: action.payload }}
        case 'setDroneData':
            return {...state, droneData: {...state.droneData, [action.payload.serial_number]: action.payload }}
        default:
            return state
    }
}

type StateProps = {
    children: JSX.Element[] |  JSX.Element
}


export const AppContext = ({children}: StateProps) => {
    const [state, dispatch] = useReducer(reducerFunc, initialState)

    const setMarker = useCallback((marker: Marker) => {
        dispatch({
            type: 'setMarkers',
            payload: marker
        })
    }, [state])


    const setDroneData = useCallback((telemetry: Telemetry) => {
        dispatch({
            type: 'setDroneData',
            payload: telemetry
        })
    }, [state])


    const value : ReturnedState = {...state, setMarker, setDroneData}

    return <Provider value={value}>
        {children}
    </Provider>
}

export const useAppContext = () => useContext(context)