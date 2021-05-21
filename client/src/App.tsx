import React from 'react'
import { Anchor, Box, Grid, Header, Nav } from 'grommet'
import './App.scss'
import GlobalTimeline from './components/GlobalTimeline';
import Bodyweight from './components/Bodyweight';
import BloodPressure from './components/Bloodpressure';
import Bloodsugar from './components/Bloodsugar';
import Excercise from './components/Excercise';
import Memo from './components/Memo';
import { dummy, gummy } from './dummy';

import { ObgyState, ItemEntry } from './redux/state/root-state';


/*
  특정 patientId 가지는 한 명의 환자에 대한 데이터 대시보드
  여러 환자 보는 오버뷰는 나중에 추가 예정
*/
function App() {
    console.log(dummy)
    return (
        <div className="App" style={{ height: '100%' }}>
            <Grid fill={true} rows={['auto', '1fr']}>
                <Header background="dark-1" pad="medium">
                    <Nav direction="row">
                      대충대충 만들어본 타임라인
                        <Anchor
                            href="#"
                            label="CRP 데이터 탐색"
                            color="white"
                        />
                        <Anchor
                            href="#"
                            label="혈압 데이터 탐색"
                            color="white"
                        />
                        <Anchor
                            href="#"
                            label="태아위치 데이터 탐색"
                            color="white"
                        />
                    </Nav>
                </Header>
                <Box direction="column" fill={true}> 
                  <GlobalTimeline entries={gummy}></GlobalTimeline>
                  <Bodyweight></Bodyweight>
                  <BloodPressure></BloodPressure>
                  <Bloodsugar></Bloodsugar>
                  <Excercise></Excercise>
                  <Memo></Memo>

                </Box>
            </Grid>
        </div>
    )
}

export default App
