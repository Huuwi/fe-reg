import FullScreenGif from "../componet/FullScreenGif"
import { useEffect, useState } from "react"

function HomePage() {

    let [urlGif, setUrlGif] = useState("")



    return (<>
        <FullScreenGif gifUrl="../assets/transform/tranformationlv11.gif" ms={5000} />

    </>)


}


export default HomePage