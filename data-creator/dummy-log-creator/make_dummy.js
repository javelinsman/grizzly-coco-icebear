const parse = require("csv-parse/lib/sync");
const fs = require('fs');
const d3 = require('d3-random');


const COUNT = {
    Dialogue: 10,
    BP: 10,
    BW: 10,
    Exercise: 10,
    Glucose: 10
}
const patientId = "MSC000002";
const startDate = new Date('2021-03-10T00:00:00');
const endDate = new Date('2021-05-20T00:00:00'); // 12주 사용 가정


let randNum = [];
let randDate = [];

let dummyDialogue = [];
let dummyBPData = [];
let dummyBWData = [];
let dummyExerciseData = [];
let dummyGlucoseData = [];

const dateTimeToStr = date => date.toISOString().substr(0, 19).concat("+09:00");


const freeformSentence = [
    "아파요", "모르겠어요", "괜찮아요", "설명이 더 필요해요", "별로", null
];

const randomDate = (i) => new Date(startDate.getTime() + i * (endDate.getTime() - startDate.getTime()));

const makeRandomNumber = cnt => {
    randNum = [];
    randDate = [];
    for (let i = 0 ; i < cnt ; i++){
        randNum.push(Math.random());
    };
    randNum.sort();
    randDate = randNum.map(i => randomDate(i));
}

const randomInt = len => Math.floor(Math.random() * len);


const makeSymptomEntry = () => {

    let symptoms = [];
    let dx = null;
    
    let items = [
        {"id": "bleeding", "value": "질출혈"},
        {"id": "discharge", "value": "질분비물"},
        {"id": "movement", "value": "태동 감소"},
        {"id": "contraction", "value": "자궁수축 / 복통"},
        {"id": "morning", "value": "입덧"},
        {"id": "preeclampsia", "value": "시야장애, 두통, 어지러움, 열, 오한, 호흡곤란"},
        {"id": "etc", "value": "기타"},
    ]
    let weights = [0.3, 0.3, 0.1, 0.3, 0.2, 0.1, 0.1];
    let i;
    
    for (i = 0; i < weights.length; i++){
        weights[i] += weights[i - 1] || 0;
    }
    
    let random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++){
        if (weights[i] > random)
                break;
    }

    symptoms.push(items[i]);
    
    switch(items[i].id){
        case 'bleeding':
            symptoms.push(
                [ // BLEEDING_AMOUNT
                    {"id": "BA1", "value": "살짝 묻어나온 정도"},
                    {"id": "BA2", "value": "500원짜리 동전만큼"},
                    {"id": "BA3", "value": "손바닥만큼"},
                    {"id": "BA4", "value": "속옷이나 패드를 흠뻑 적실만큼"},
                    {"id": "BA5", "value": "계속 흐르는 질출혈"}
                ][randomInt(5)]
            );

            symptoms.push(
                [ // BLEEDING_COLOR
                    {"id": "BC1", "value": "옅은 갈색"},
                    {"id": "BC2", "value": "갈색"},
                    {"id": "BC3", "value": "핑크색"},
                    {"id": "BC4", "value": "빨간색"},
                ][randomInt(4)]
            );

            if (symptoms.some(e => e.id == "BA5")) {
                dx = "긴급한 상황일 수 있습니다. 분만장으로 빨리 내원해주세요."; // VISIT_DU_ASAP
            }
            else if (symptoms.some(e => ["BC4", "BA4", "BA3"].includes(e.id))) {
                dx = "분만장으로 내원해주세요."; // VISIT_DU
            }
            else if (symptoms.some(e => e.id == "BA2")) {
                dx = "잠시 안정을 취하고, 다시 반복되면 분만장에 문의해보세요.";
            }
            else dx = "안정을 취하고 좀 더 지켜봐주세요.";

            break;
        case 'discharge':
            symptoms.push(
                [ // DISCHARGE_STATUS
                    {"id": "DS1", "value": "왈칵 끈적끈적한 분비물이 나오고 멈췄다"},
                    {"id": "DS2", "value": "투명한 색의 콧물같은 분비물이 나왔다"},
                    {"id": "DS3", "value": "가려움증이 동반된다"},
                    {"id": "DS4", "value": "물처럼 계속 흐른다"},
                    {"id": "DS5", "value": "하얀 덩어리가 나온다"}
                ][randomInt(5)]
                );
            switch(symptoms[1].id){
                case "DS1":
                case "DS2":
                    dx = "임신 중 자연스러운 현상입니다. 좀 더 지켜봐주세요."; // NATURAL_WATCH
                    break;
                case "DS3":
                    dx = "세균성 질염 혹은 곰팡이균에 의한 질염 가능성이 있습니다. 산부인과 진료 예약을 당겨서 내원해주세요."; // TITIS_DU_EARLY
                    break;
                case "DS4":
                    dx = "양수일 수 있습니다. 분만장으로 내원해주세요."; // AMNIOTIC_VISIT_DU
                    break;
                case "DS5":
                    dx = "곰팡이균에 의한 질염 가능성이 있습니다. 산부인과 진료 예약을 당겨서 내원해주세요."; // TITIS_DU_EARLY2
                    break;
            }
            break;
        case 'movement':
            symptoms.push(
                [ // MOVEMENT_FIRST
                    {"id": "MF1", "value": "20분 동안 1회 이상의 작은 움직임이 감지되었다"},
                    {"id": "MF2", "value": "20분 동안 1회의 작은 움직임도 없었다"}
                ][randomInt(2)]
            );
            if (symptoms[1].id == "MF1"){
                dx = "정상입니다. 시간이 좀 더 흐른 뒤 태동을 다시 느껴보고 평가해주세요.";
            }
            else {
                symptoms.push(
                    [
                        {"id": "MS1", "value": "네, 느껴졌습니다."},
                        {"id": "MS2", "value": "아니요, 느껴지지 않았습니다."},
                    ][randomInt(2)]
                );
                if (symptoms[2].id == "MS1"){
                    dx = "정상입니다. 시간이 좀 더 흐른 뒤 태동을 다시 느껴보고 평가해주세요."; // NORMAL_FETAL_MOVEMENT
                }
                else {
                    dx = "분만장으로 내원해주세요."; // VISIT_DU
                }
            }
            break;
        case 'contraction':
            symptoms.push(
                [ // CONTRACTION_PART
                    {"id": "CPlower", "value": "아랫배"},
                    {"id": "CPleft", "value": "왼쪽배"},
                    {"id": "CPright", "value": "오른쪽배"},
                    {"id": "CPupper", "value": "윗배"}
                ][randomInt(4)]
            );
            if (symptoms[1].id == "CPleft"){
                symptoms.push(
                    [
                        {"id": "CCyes", "value": "변비가 있습니다."},
                        {"id": "CCno", "value": "변비가 아닙니다"},
                    ][randomInt(2)]
                );
            };
            if (symptoms.some(e => ["CCyes", "CPupper",].includes(e.id))) {
                dx = "체하거나 소화와 관련된 증상일 수 있습니다. 임신중독증에서는 간기능이상으로 인한 것이기도 합니다. 분만장에 문의해보세요."; 
                // CONTRACTION_OTHER_CAUSE
                break;
            }
            symptoms.push(
                [
                    {"id": "CI1", "value": "약간 뻐근한 정도"},
                    {"id": "CI2", "value": "콕콕 찌르는 양상"},
                    {"id": "CI3", "value": "생리통과 같은 정도"},
                    {"id": "CI4", "value": "쥐어짜듯이 아픔"},
                    {"id": "CI5", "value": "허리를 못 펼 정도의 아픔"},
                    {"id": "CI6", "value": "허리통증"}
                ][randomInt(6)]
            );
            if (symptoms.some(e => e.id == "CI3")){
                symptoms.push(
                    [
                        {"id": "CFF1", "value": "처음 30분: 4회 이하"},
                        {"id": "CFF2", "value": "처음 30분: 5회 이상"}
                    ][randomInt(2)]
                );
                if (symptoms.some(e => e.id == "CFF1")){
                    dx = "임신 중 자연스러운 현상입니다. 좀 더 지켜봐주세요.";
                }
                else if (symptoms.some(e => e.id == "CFF2")){
                    symptoms.push(
                        [
                            {"id": "CFS1", "value": "이후 30분에도 5회 이상 "},
                            {"id": "CFS2", "value": "이후 30분에는 4회 이하"}
                        ][randomInt(2)]
                    );
                    if (symptoms.some(e => e.id == "CFS1")){
                        dx = "분만장으로 내원해주세요."; // VISIT_DU   
                    }
                    else if (symptoms.some(e => e.id == "CFS2")){
                        dx = "임신 중 자연스러운 현상입니다. 좀 더 지켜봐주세요."; // NATURAL_WATCH
                    }
                }
                break;
            };
            if (symptoms.some(e => ["CI1", "CI2"].includes(e.id))){
                dx = "임신 중 자연스러운 현상입니다. 좀 더 지켜봐주세요."; // NATURAL_WATCH

            }
            else if (symptoms.some(e => ["CI4", "CI5", "CI6"].includes(e.id))){
                dx = "분만장으로 내원해주세요."; // VISIT_DU   
            }
            break;
        case 'morning':
            symptoms.push(
                [ // MORNING_STATUS
                    {"id": "MNS1", "value": "약간 메스껍다"},
                    {"id": "MNS2", "value": "구역질을 한다"},
                    {"id": "MNS3", "value": "계속 토한다"},
                    {"id": "MNS4", "value": "전혀 먹지 못한다"},
                    {"id": "MNS5", "value": "소변량이 줄었다"},
                    {"id": "MNS6", "value": "어지럽다"}
                ][randomInt(6)]
            );

            if (symptoms.some(e => ["MNS1", "MNS2"].includes(e.id))) {
                dx = "차가운 음료나 자극적이지 않은 음식 위주로 식사를 시도해보세요."; // MORNING_CARE
            }
            else {
                dx = "산부인과 진료 예약을 당겨서 내원해주세요."; // OPD_EARLY
            }
            break;
        case 'preeclampsia':
            dx = "분만장으로 내원해주세요.";
            break;
        case 'etc':
            break
    }
    
    let symptomsVal = symptoms.map(i => i.value)
    return {
        symptoms: symptomsVal,
        dx: dx
    }
}



const makeDialogueEntry = date => {
    let symptoms = makeSymptomEntry();
    
    let result = {
        symptoms: symptoms.symptoms,
        freeform: freeformSentence[randomInt(freeformSentence.length)],
        dx: symptoms.dx
    }

    
    if (result.symptoms.includes("기타") && result.freeform == null){
        result.freeform = ["아파요", "모르겠어요", "괜찮아요", "설명이 더 필요해요", "별로"][randomInt(5)]
    }

    
    return {
        date: dateTimeToStr(date),
        mclass: "dialogue",
        record : result,
        patientId: patientId

    }
}

const makeDummyDialogue = () => {
    makeRandomNumber(COUNT.Dialogue);
    randDate.forEach(i => {
        dummyDialogue.push(makeDialogueEntry(i));
    });
}





const loadBPCSV = filename => {
    let rawData = parse(fs.readFileSync(filename).toString());
    let idx = rawData.map((_,i) => i);
    for (let i = idx.length - 1 ; i > 0 ; i--){
        let j = Math.floor(Math.random() * (i+1));
        [idx[i], idx[j]] = [idx[j], idx[i]];
    };
    idx = idx.slice(0, COUNT.BP);
    idx.sort((a, b) => (a - b));
    
    return idx.map(i => rawData[i]); // [systolic, diastolic]

};

const returnHeartRate = (date) => {
    // const randNorm = d3.randomNormal(83, 3); // 28주 시작 가정. 
    const randNorm = d3.randomNormal(85, 3); // 32주 시작 가정. 
    let rate = parseInt(randNorm());
    
    // 1주에 0.5% -> 12주 5%
    rate *= Math.pow(1.005, (date.getTime() - startDate.getTime())/(1000*3600*24*7));
    return parseInt(rate);

}

const makeBPEntry = (date, bp) => {
    
    let result = {
        "diastolic": parseInt(bp[1]),
        "heartrate": returnHeartRate(date),
        "systolic": parseInt(bp[0])
    };

    return {
        date: dateTimeToStr(date),
        mclass: "혈압",
        record: [result],
        patientId: patientId
    }
}

const makeDummyBP = () => {
    makeRandomNumber(COUNT.BP);
    let rawData = loadBPCSV('bp_data03.csv');
    randDate.forEach((date, idx) => {
        dummyBPData.push(makeBPEntry(date, rawData[idx]));
    });
}

const initialBW = 75;


const makeDummyBW = () => {
    makeRandomNumber(COUNT.BW);
    dummyBWData.push(
        {
            date: dateTimeToStr(randDate[0]),
            mclass: "체중",
            record: {
                "unit": "kg",
                "weight": initialBW
            },
            patientId:patientId
        }
    );
    // const randDiff = d3.randomUniform(0.4, 0.8); // 29주 이후 가정
    const randDiff = d3.randomUniform(0.5, 0.8); // 32주 이후 가정
    for (let i = 1 ; i < COUNT.BW ; i++){
        let beforeWeight = dummyBWData[i-1].record.weight;
        let timeDiff = (randDate[i].getTime() - randDate[i-1].getTime())/(1000*3600*24*7);
        let weightDiff = randDiff();
        let nextWeight = parseFloat(beforeWeight + timeDiff * weightDiff).toFixed(2);
        
        
        let bwData = {
            date: dateTimeToStr(randDate[i]),
            mclass: "체중",
            record: {
                "unit": "kg",
                "weight": parseFloat(nextWeight)
            },
            patientId:patientId
        };
        dummyBWData.push(bwData);
    };
}


const exerciseType = ["자전거", "요가", "걷기", "조깅", "수영"]

const makeDummyExercise = () => {
    makeRandomNumber(COUNT.Exercise);
    randDate.forEach(date => {
        dummyExerciseData.push({
            date: dateTimeToStr(date),
            mclass: "운동",
            record: {
                name: exerciseType[randomInt(exerciseType.length)],
                time: randomInt(19) * 5 + 30 
            },
            patientId:patientId
        })
    })

}


const makeGlucoseEntry = () => {
    const beforeSuger = d3.randomNormal(75,10);
    const afterSuger = d3.randomNormal(110, 15);
    if (Math.random() < 0.5){  // 공복혈당 -> 65에
        return {
            beforeOrAfter: "before",
            bloodSugar: parseInt(beforeSuger())
        }
    }
    else return { // 식후
            beforeOrAfter: "after",
            bloodSugar: parseInt(afterSuger())
        }
}

const makeDummyGlucose = () => {
    makeRandomNumber(COUNT.Glucose);
    randDate.forEach(date => {
        dummyGlucoseData.push({
            date: dateTimeToStr(date),
            mclass: "혈당",
            record: makeGlucoseEntry(),
            patientId: patientId
        }
        )
    })
};

makeDummyDialogue();
makeDummyBP();
makeDummyBW();
makeDummyExercise();
makeDummyGlucose();

(function(){
    let dummyData = dummyDialogue.concat(dummyBPData, dummyBWData, dummyExerciseData, dummyGlucoseData);
    // console.log(dummyData);
    fs.writeFileSync('data.json', JSON.stringify(dummyData));
})();