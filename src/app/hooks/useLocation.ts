import { useEffect, useState } from 'react'

interface Coordinates {
    latitude: number
    longitude: number
}

function useLocation(settings: any = {}): Coordinates {
    const [state, setState] = useState<Coordinates>()

    const onSuccess = ({ coords }): void => {
        setState(coords)
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, null, settings)
        }
    }, [])
    return state
}

export default useLocation
