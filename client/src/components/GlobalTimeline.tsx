import * as d3 from "d3";
import React, { useEffect, useState, useRef } from "react";
import { ItemEntry } from "../redux/state/root-state";

interface Props {
    entries: ItemEntry[]
};

/*
    길재에 data 요청할 때 데이터 카테고리를 지정하지 않고 카테고리 구분 없이 입력된 모든 데이터 받아옴
*/

const GlobalTimeline: React.FC<Props> = ({entries}) =>{

    console.log(entries)

    
    return (
        <svg>

        </svg>
    )
}

export default GlobalTimeline;