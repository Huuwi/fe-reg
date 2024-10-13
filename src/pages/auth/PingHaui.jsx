import { useEffect, useState } from "react"
import HeaderDashBoard from "../../componet/HeaderDashBoard"
import SkeletonLoader from "../../componet/SkeletonLoader"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function PingHaui() {

    let navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {


            try {

                await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/pingHaui", {}, { withCredentials: true })
                navigate("/loggedHaui")

            } catch (error) {
                navigate("/loginHaui")
            }

        }

        fetchData()


    }, [])




    return (
        <>
            <SkeletonLoader />
        </>
    )
}


export default PingHaui