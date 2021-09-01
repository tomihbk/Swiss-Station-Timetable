import { } from 'react-router-dom'
import {useEffect, useState} from 'react'

const Result = (props: any): React.ReactElement => {
    const [data, setData] = useState<[]>()
   
    useEffect(() => {
        setData(props.location?.state)
        console.log(data)
    }, [data])
    
    return (
        <div className="dark:text-gray-200 font-secondary">
            {data ? data.map(data => data) : "No data to show"}
        </div>
    )
}

export default Result