import { useReducer, createContext, useCallback, useContext } from "react"
import { Marker } from "../models/marker"
import { Polygon } from "../models/polygon"


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
}

type ReturnedState = {
    setMarker: (marker:Marker) => void,
    setPolygons: (polygon:Polygon) => void,
} & State

const initialState : State = {
    markers: {},
    polygons: {}
}

const context = createContext<ReturnedState>({
    ...initialState,
    setMarker: (marker: Marker) => {},
    setPolygons: (polygon:Polygon) => {}
})

context.displayName = 'mapContext'
const Provider = context.Provider


const reducerFunc = (state: State, action: Action) : State => {
    switch (action.type) {
        case 'setMarkers':
            return {...state, markers: {...state.markers, [action.payload.telemetryData.serial_number]: action.payload }}

        case 'setPolygons':
            return {...state, polygons: {...state.markers, [action.payload.uuid]: action.payload }}
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

    const setPolygons = useCallback((polygon: Polygon) => {
        dispatch({
            type: 'setPolygons',
            payload: polygon
        })
    }, [state])

    const value : ReturnedState = {...state, setMarker, setPolygons}

    return <Provider value={value}>
        {children}
    </Provider>
}

export const useAppContext = () => useContext(context)