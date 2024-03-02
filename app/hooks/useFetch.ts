import { useEffect, useState } from "react"
import { json } from "stream/consumers"

export const useFetch = (url: any, file: FormData) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('error')


    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await fetch(url, {
                    method: 'POST',
                    body: file,
                })
                const data = await res.json()
                setData(data)
            }
            fetchData()
        } catch (error) {
            setError(`${error}`)
        } finally {
            setIsLoading(false)
        }


    })

    return {data, isLoading, error}
} 