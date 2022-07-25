import { ReactElement } from "react";
import { ReactComponent as BusSVG } from "../images/bus.svg";
import { ReactComponent as ShipSVG } from "../images/ship.svg";
import { ReactComponent as TelecabinSVG } from "../images/telecabin.svg";
import { ReactComponent as MetroSVG } from "../images/subway-alt.svg";
import { ReactComponent as TrainSVG } from "../images/train.svg";

interface TransportIconType {
    type : string,
    className:string
}

const TransportIcon = ({ type,className }: TransportIconType) : ReactElement => {
    let iconType = <></>
    switch (type) {
        case "rail":
            iconType = <div><TrainSVG className={className}/></div>
            break;
        case "bus":
            iconType = <BusSVG className={className}/>
            break;
        case "telecabin":
            iconType = <TelecabinSVG className={className}/>
            break;
        case "tram":
        case "metro":
            iconType = <MetroSVG className={className}/>
            break;
        case "water":
            iconType = <ShipSVG className={className}/>
            break;
    }
    return iconType
}

export default TransportIcon;