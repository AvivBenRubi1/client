import { useReducer, createContext, useCallback, useContext } from "react"
import MarkerData from "../interfaces/markerData"


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
    }
}

type ReturnedState = {
    setMarker: (marker:Marker) => void,
} & State

const initialState : State = {
    markers: {}
}

const context = createContext<ReturnedState>({
    ...initialState,
    setMarker: (marker: Marker) => {},
})

context.displayName = 'mapContext'
const Provider = context.Provider


const reducerFunc = (state: State, action: Action) : State => {
    switch (action.type) {
        case 'setMarkers':
            return {...state, markers: {...state.markers, [`${action.payload.metadata.serial_number}_${action.payload.metadata.type}`]: action.payload }}
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


    const value : ReturnedState = {...state, setMarker}

    return <Provider value={value}>
        {children}
    </Provider>
}

export const useAppContext = () => useContext(context)