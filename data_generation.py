import csv
import random
import json
from datetime import datetime

def generate_patient() :
    patients = []
    years = ["88", "89", "90", "91", "92"]
    months = [f"{m:02d}" for m in range(1, 13)]
    days = [f"{d:02d}" for d in range(1, 28)]
    
    for p in range(0, 50) :
        pid = random.choice(years)+random.choice(months)+random.choice(days)
        gender = 'female'
        age = str(122 - int(pid[0:2]))
        preg_data = datetime(2020, random.randrange(1, 13), random.randrange(1, 28)).strftime("%Y-%m-%d")
        height = str(random.randrange(155, 175))
        weight = str(random.randrange(50, 70))
        patients.append({'patient_id': pid, 'gender': gender, 'age': age, 'preg_date': preg_data, 'weight': weight, 'height': height})
    return patients
# 88 ~ 92
# 01 ~ 12
# 01 ~ 30

def generate_bp(type) :
    # blood pressure
    # sbp  under 90, dbp over 140
    # sbp  95~100 +- 5~10
    # dbp 130~135 +- 5~10
    # type1: 95 +- 5, 130 +- 5
    # type2: 95 +- 10 130  +- 10
    # type3: 100 +- 5 135 +- 5
    # type4: 100 +- 10 135 +- 10
    sbp_base = 95
    dbp_base = 130
    bp_range = 5
    if type == 1 :
        bp_range = 10
    elif type == 2 :
        sbp_base += 5
        dbp_base += 5
    elif type == 3 :
        sbp_base += 5
        dbp_base += 5
        bp_range = 10
    
    return [] 

def generate_bs(type) :
    # blood sugar
    # empty blood sugar 75~85 +- 15 ~ 25
    # after blood sugar 100 ~ 110 +- 15~25 
    # type1: 75 +- 15   100 +- 15
    # type2: 75 +- 25   100 +- 25
    # type3: 85 +- 15   110 +- 15
    # type4: 85 +- 25   110 +- 25

    return []

def generate_bw(type) :
    # body weight 
    # ~ week 20 0.32kg / week
    # ~ week 40 0.45kg / week
    # type1 : 0.32 +- -0.03~0.03 0.45 +- -0.04~0.04
    # type2 : 0.32 +-  -0.015~0.045 +- -0.02~0.06

    return 
def generate_data(patient) :
    # blood pressure: pid, timetamp, sbp, dbp   3 / day
    # body weight:  pid, timetamp, value 1 / week
    # blood sugar: pid, timetamp, type, value   3 / day
    print(patient)
    begin_date = datetime.strptime(patient['preg_date'], "%Y-%m-%d")

    bp_type = random.randrange(0, 4)
    bs_type = random.randrange(0, 4)
    bp_type = random.randrange(0, 2)
   
    
   

   
    return []
def run() :
    #patients = generate_patient()
    #print(patients)
    #with open('patient.json', 'w') as pfile:
    #    json.dump(patients, pfile)

    with open('patient.json', 'r') as  json_file :
        patient_data = json.load(json_file)
        for p in patient_data :
            generate_data(p)

if __name__ == "__main__" :
    run()