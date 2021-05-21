import React from 'react'
import { Anchor, Box, Grid, Header, Nav } from 'grommet'
import Timeline from './components/Timeline';
import './App.scss'
import Bodyweight from './components/Bodyweight';
import BloodPressure from './components/Bloodpressure';
import Bloodsugar from './components/Bloodsugar';
import Memo from './components/Memo';
function App() {
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
                  <Timeline></Timeline>
                  <Bodyweight></Bodyweight>
                  <BloodPressure></BloodPressure>
                  <Bloodsugar></Bloodsugar>
                  <Memo></Memo>

                </Box>
            </Grid>
        </div>
    )
}

export default App
