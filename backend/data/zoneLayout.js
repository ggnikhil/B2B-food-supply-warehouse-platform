
const zoneLayout = [
    {
        zone:"FROZEN",
        lines:["FRA","FRB","FRC","FRD"],
        racks:["A","B","C","D"],
        floors:["S1","S2","S3","S4"],
        positions:[1,2,3,4,5,6],
        bigBinPrefix:"FR",
        bigBinCount:20
    },
    {
        zone:"AMBIENT",
        lines:["AMA","AMB","AMC","AMD"],
        racks:["A","B","C","D","E","F"],
        floors:["S1","S2","S3","S4"],
        positions:[1,2,3,4,5,6],
        bigBinPrefix:"AM",
        bigBinCount:30
    },
    {
        zone:"HIGHVALUE",
        lines:["HVA","HVB",],
        racks:["A","B"],
        floors:["S1","S2","S3","S4"],
        positions:[1,2,3,4,5,6],
        bigBinPrefix:"HV",
        bigBinCount:5
    },
    {
        zone:"POULTRY",
        lines:["PYA","PYB",],
        racks:["A","B",],
        floors:["S1","S2","S3","S4"],
        positions:[1,2,3,4,5,6],
        bigBinPrefix:"PY",
        bigBinCount:10
    },
    {
        zone:"DAIRY",
        lines:["DRA","DRB","DRC"],
        racks:["A","B","C","D"],
        floors:["S1","S2","S3","S4"],
        positions:[1,2,3,4,5,6],
        bigBinPrefix:"DR",
        bigBinCount:25
    },
    {
        zone:"RTS",
        lines:["RTSA","RTSB","RTSC"],
        racks:["A","B","C","D"],
        floors:["S1","S2","S3","S4"],
        positions:[1,2,3,4,5,6],
        bigBinPrefix:"RTS",
        bigBinCount:20
    },
    {
        zone:"FNV",
        lines:["FVA","FVB","FVC"],
        racks:["A","B","C"],
        floors:["S1","S2","S3","S4"],
        positions:[1,2,3,4,5,6],
        bigBinPrefix:"FV",
        bigBinCount:24
    },
    {
        zone:"BULK",
        bigBinPrefix: "BK",
        bigBinCount: 40
    },
    {
        zone:"EGG",
        bigBinPrefix: "EGG",
        bigBinCount: 5
    },
    {
        zone:"ONION_POTATO",
        bigBinPrefix: "ONPOT",
        bigBinCount: 7
    }

]

export default zoneLayout