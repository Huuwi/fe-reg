import { useNavigate } from "react-router-dom"
import { useState } from "react"
import SkeletonLoader from "../../componet/SkeletonLoader"

function LoggedHaui() {

    let navigate = useNavigate()
    let [isLogged, setIsLogged] = useState(false)




    return (
        <>

            {!isLogged ? <SkeletonLoader /> : <SkeletonLoader />}

        </>
    )



}


export default LoggedHaui

