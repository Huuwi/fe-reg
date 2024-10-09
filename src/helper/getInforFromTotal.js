

function getInforFromTotal(toTal, arrValue0) {
    let arrValue = arrValue0.map((e) => { return e.toTal })
    if (Number(toTal) == NaN || toTal < 0) {
        return {
            curentLevel: "lv-1",
            nextLevel: "lv0",
            totalOfNextLv: 999999,
            curBonus: 0,
            text: arrValue0[0].text,
        }
    }
    for (let i = 0; i < arrValue.length - 1; i++) {
        if (toTal >= arrValue[i] && toTal < arrValue[i + 1]) {
            return {
                curentLevel: `lv${i}`,
                nextLevel: `lv${i + 1}`,
                totalOfNextLv: arrValue[i + 1],
                curBonus: arrValue0[i].curBonus,
                text: arrValue0[i].text,
            }
        }
    }
    return {
        curentLevel: `lv${arrValue.length}`,
        nextLevel: `lv${arrValue.length}`,
        totalOfNextLv: 0,

    }

}



export default getInforFromTotal