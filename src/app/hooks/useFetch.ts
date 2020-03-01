import ky from 'ky-universal'
import { useCallback, useReducer } from 'react'
import { v4 as uuid } from 'uuid'

const api = ky.create({
    prefixUrl: 'http://localhost:5000',
    retry: 0,
    timeout: false,
    hooks: {
        beforeRequest: [
            (request): Request => {
                request.headers.set('x-request-id', uuid())
                request.headers.set('Accept', 'application/json')
                return request
            }
        ]
    }
})

enum ActionType {
    FetchInit,
    FetchSuccess,
    FetchError,
    FetchReset
}

interface State<T> {
    isLoading: boolean
    isError: boolean
    url: URL
    data?: T | Error | undefined
}

interface Action<T> {
    type: ActionType
    payload?: T | Error | undefined
}

const initialState: State<unknown> = {
    isLoading: false,
    isError: false,
    url: undefined,
    data: undefined
}

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case ActionType.FetchInit:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case ActionType.FetchSuccess:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case ActionType.FetchError:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: action.payload
            }
        case ActionType.FetchReset:
            return {
                ...(initialState as State<T>),
                url: state.url
            }
    }
}

type FetchData = () => Promise<void>
type FetchReset = () => void
interface UseFetchResult<T> {
    state: State<T>
    fetchData: FetchData
    fetchReset: FetchReset
}

export function useFetch<T>(path, initialData?: T | undefined): UseFetchResult<T> {
    const [state, dispatch] = useReducer((state, action) => reducer<T>(state, action), {
        ...initialState,
        url: path,
        data: initialData
    })

    const fetchData = useCallback(async () => {
        dispatch({ type: ActionType.FetchInit })

        try {
            const result = (await api.get(path).json()) as T

            return dispatch({ type: ActionType.FetchSuccess, payload: result })
        } catch (ex) {
            const st = dispatch({ type: ActionType.FetchError, payload: ex })
            console.log(st)
            return st
        }
    }, [dispatch])

    const fetchReset = useCallback(() => dispatch({ type: ActionType.FetchReset }), [dispatch])

    return { state, fetchData, fetchReset }
}
