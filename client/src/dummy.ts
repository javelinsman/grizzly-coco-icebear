import { ObgyState, ItemEntry } from './redux/state/root-state';

export let dummy: ObgyState = {
    "혈압": [
        {
            "date": "2021-05-06T05:59:49+09:00",
            "mclass": "혈압",
            "record": [
                {
                    "diastolic": 78,
                    "heartrate": 107,
                    "systolic": 118
                }
            ],
            "patientId": "MSC000001"
        },
        {
            "date": "2021-05-06T04:47:41+09:00",
            "mclass": "혈압",
            "record": [
                {
                    "diastolic": 78,
                    "heartrate": 107,
                    "systolic": 118
                }
            ],
            "patientId": "MSC000001"
        },
        {
            "date": "2021-05-06T04:47:11+09:00",
            "mclass": "혈압",
            "record": [
                {
                    "diastolic": 78,
                    "heartrate": 107,
                    "systolic": 116
                }
            ],
            "patientId": "MSC000001"
        },
        {
            "date": "2021-05-05T11:38:48+09:00",
            "mclass": "혈압",
            "record": [
                {
                    "diastolic": 76,
                    "heartrate": 107,
                    "systolic": 120
                }
            ],
            "patientId": "MSC000001"
        }
    ],
    "혈당": [
        {
            "date": "2021-05-06T04:49:36+09:00",
            "mclass": "혈당",
            "record": {
                "beforeOrAfter": "after",
                "bloodSurgar": 100
            },
            "patientId": "MSC000001"
        },
        {
            "date": "2021-05-06T04:48:45+09:00",
            "mclass": "혈당",
            "record": {
                "beforeOrAfter": "before",
                "bloodSurgar": 60
            },
            "patientId": "MSC000001"
        },
        {
            "date": "2021-05-05T11:51:33+09:00",
            "mclass": "혈당",
            "record": {
                "beforeOrAfter": "after",
                "bloodSurgar": 62
            },
            "patientId": "MSC000001"
        }
    ],
    "Dialogue":[
        {
            "date": "2021-05-06T05:59:49+09:00",
            "mclass":"dialogue",
            "record":{
                "symptoms":["입덧","계속 토한다"],
                "freeform":null,
                "dx":""
            },
            "patientId":"MSC000001"
        },
        {
            "date": "2021-05-06T05:59:49+09:00",
            "mclass":"dialogue",
            "record":{
                "symptoms":["입덧","계속 토한다"],
                "freeform":"좀 더 자세히",
                "dx":""
            },
            "patientId":"MSC000001"
        },
        {
            "date": "2021-05-06T05:59:49+09:00",
            "mclass":"dialogue",
            "record":{},
            "patientId":"MSC000001"
        },
        {
            "date": "2021-05-06T05:59:49+09:00",
            "mclass":"dialogue",
            "record":{},
            "patientId":"MSC000001"
        }
    ]
}

export let gummy: ItemEntry[] = [
    {
        "date": "2021-05-06T05:59:49+09:00",
        "mclass": "혈압",
        "record": [
            {
                "diastolic": 78,
                "heartrate": 107,
                "systolic": 118
            }
        ],
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-06T04:47:41+09:00",
        "mclass": "혈압",
        "record": [
            {
                "diastolic": 78,
                "heartrate": 107,
                "systolic": 118
            }
        ],
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-06T04:47:11+09:00",
        "mclass": "혈압",
        "record": [
            {
                "diastolic": 78,
                "heartrate": 107,
                "systolic": 116
            }
        ],
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-05T11:38:48+09:00",
        "mclass": "혈압",
        "record": [
            {
                "diastolic": 76,
                "heartrate": 107,
                "systolic": 120
            }
        ],
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-06T04:49:36+09:00",
        "mclass": "혈당",
        "record": {
            "beforeOrAfter": "after",
            "bloodSurgar": 100
        },
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-06T04:48:45+09:00",
        "mclass": "혈당",
        "record": {
            "beforeOrAfter": "before",
            "bloodSurgar": 60
        },
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-05T11:51:33+09:00",
        "mclass": "혈당",
        "record": {
            "beforeOrAfter": "after",
            "bloodSurgar": 62
        },
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-06T05:59:49+09:00",
        "mclass": "dialogue",
        "record": {
            "symptoms": ["입덧", "계속 토한다"],
            "freeform": null,
            "dx": ""
        },
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-06T05:59:49+09:00",
        "mclass": "dialogue",
        "record": {
            "symptoms": ["입덧", "계속 토한다"],
            "freeform": "좀 더 자세히",
            "dx": ""
        },
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-06T05:59:49+09:00",
        "mclass": "dialogue",
        "record": {},
        "patientId": "MSC000001"
    },
    {
        "date": "2021-05-06T05:59:49+09:00",
        "mclass": "dialogue",
        "record": {},
        "patientId": "MSC000001"
    }
]
