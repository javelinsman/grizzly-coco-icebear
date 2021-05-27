import * as d3 from "d3";
import React from "react";
import { ItemEntry } from '../redux/state/root-state';

interface Props {
    entries: ItemEntry[],
    timerange: number[]
};

const BloodPressure: React.FC<Props> = () =>{
    return (
        <h1> Blood Pressure </h1>
    )
}

export default BloodPressure;