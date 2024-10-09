import HeaderDashBoard from "../../componet/HeaderDashBoard"
import CostTable from "../../componet/CostTable"

function DashBoardRecharge(props) {

    let costTable = [
        { id: 0, amount: 10, salesReferral: 0 },
        { id: 1, amount: 20, salesReferral: 0.1 },
        { id: 2, amount: 30, salesReferral: .15 },
        { id: 3, amount: 40, salesReferral: .2 },
        { id: 4, amount: 50, salesReferral: .25 },
        { id: 5, amount: 100, salesReferral: .35 },
    ]



    return (
        <>
            <HeaderDashBoard userData={props.userData} />
            <CostTable costTable={costTable} />
        </>
    )

}


export default DashBoardRecharge