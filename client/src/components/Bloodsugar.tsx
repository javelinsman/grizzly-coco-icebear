import * as d3 from "d3";
import React from "react";
import { ItemEntry } from '../redux/state/root-state';

interface Props {
    entries: ItemEntry[],
    timerange: number[]
};


const Bloodsugar: React.FC<Props> = () =>{
    return (
        <h1> Bloodsugar </h1>
    )
}

export default Bloodsugar;