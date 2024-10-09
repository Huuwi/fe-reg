import { useState, useRef, useEffect } from "react"


function TextRunning(props) {

    let textCss = props?.textCss || { fontSize: "25px" }
    let text = props?.text || "123456789"
    let [curtext, setCurText] = useState('')
    let index = useRef(-1)

    useEffect(() => {

        if (index.current < text.length - 1) {
            let timer = setTimeout(() => {
                index.current += 1
                setCurText(pre => pre + text[index.current])
            }, props?.ms || 100)
            return () => {
                clearTimeout(timer)
            }

        }
    }, [curtext])


    return (
        <>
            <span style={{ ...textCss }} >{curtext}</span>
        </>
    )

}

export default TextRunning