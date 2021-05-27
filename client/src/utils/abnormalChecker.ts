/*
    Abnormal state checkers
*/

import { ItemEntry } from "../redux/state/root-state";


function bpchecker(bpdata: ItemEntry) {
    //TODO: later...
    return Math.random() > 0.9

}

function bwchecker(bwdata: ItemEntry) {
    //TODO: later...
    return Math.random() > 0.9
}

function bscheker(bsdata: ItemEntry) {
    //TODO: later...
    return Math.random() > 0.9
}

function exchecker(exdata: ItemEntry ) {
    //TODO: later...
    return Math.random() > 0.9
}

export default function abnormalChecker(data: ItemEntry) {
    switch (data.mclass) {
        case "혈압" :
            return bpchecker(data);
        case "혈당" :
            return bscheker(data);
        case "체중" :
            return bwchecker(data);
        case "운동" :
            return exchecker(data);
        case "dialogue" :
            // dialogue
            return true;
        default: // Unknown type
            return true;
    }
}