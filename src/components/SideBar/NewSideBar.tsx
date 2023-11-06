import { useAppContext } from "../../context"

export default () => {
    const {droneData} = useAppContext()

    return <div>
        {Object.keys(droneData).map(key => <div>
            
        </div>)}
    </div>
}