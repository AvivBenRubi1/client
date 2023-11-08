import { useReducer, createContext, useCallback, useContext } from "react"
import { Marker } from "../models/marker"
import { Polygon } from "../models/polygon"
import { Antenna } from "../models/antenna"


type Action = {
    type: string,
    payload: any
}

type State = {
    markers: {
        [key: string]: Marker
    },
    polygons: {
        [key: string]: Polygon
    }
    antennas: {
        [key: string]: Antenna
    }
}

type ReturnedState = {
    setMarker: (marker: Marker) => void,
    setPolygons: (polygon: Polygon) => void,
    setAntennas: (antenna: Antenna) => void
} & State

const initialState: State = {
    markers: {},
    polygons: {},
    antennas: {}
}

const context = createContext<ReturnedState>({
    ...initialState,
    setMarker: (marker: Marker) => { },
    setPolygons: (polygon: Polygon) => { },
    setAntennas: (antenna: Antenna) => { }
})

context.displayName = 'mapContext'
const Provider = context.Provider


const reducerFunc = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setMarkers':
            return { ...state, markers: { ...state.markers, [action.payload.telemetryData.packet_uuid]: action.payload } }

        case 'setPolygons':
            return { ...state, polygons: { ...state.markers, [action.payload.uuid]: action.payload } }
        case 'setAntennas':
            return { ...state, antennas: { ...state.antennas, [action.payload.antenna_name]: action.payload } }
        default:
            return state
    }
}

type StateProps = {
    children: JSX.Element[] | JSX.Element
}


export const AppContext = ({ children }: StateProps) => {
    const [state, dispatch] = useReducer(reducerFunc, initialState)

    const setMarker = useCallback((marker: Marker) => {
        dispatch({
            type: 'setMarkers',
            payload: marker
        })
    }, [state])

    const setPolygons = useCallback((polygon: Polygon) => {
        dispatch({
            type: 'setPolygons',
            payload: polygon
        })
    }, [state])

    const setAntennas = useCallback((antenna: Antenna) => {
        dispatch({
            type: 'setAntennas',
            payload: antenna
        })
    }, [state])


    const value: ReturnedState = { ...state, setMarker, setPolygons, setAntennas }

    return <Provider value={value}>
        {children}
    </Provider>
}

export const useAppContext = () => useContext(context)