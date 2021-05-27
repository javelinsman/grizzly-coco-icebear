import React from 'react'
import { Anchor, Box, Grid, Header, Nav } from 'grommet'
import * as d3 from 'd3'
import './App.scss'
import GlobalTimeline from './components/GlobalTimeline'
import Bodyweight from './components/Bodyweight'
import BloodPressure from './components/Bloodpressure'
import Bloodsugar from './components/Bloodsugar'
import Excercise from './components/Excercise'
import Dialogue from './components/Dialogue'
import gummy from './dummy_data/dummy_275.json'

import { ObgyState, ItemEntry } from './redux/state/root-state'
import { time } from 'node:console'
import FluidContext from './components/FluidContext'

/*
  특정 patientId 가지는 한 명의 환자에 대한 데이터 대시보드
  여러 환자 보는 오버뷰는 나중에 추가 예정
*/
function App() {
  // Dummy data 불러오기
  const dummy: Array<ItemEntry> = gummy
  const bpdata = dummy.filter((d) => d.mclass === '혈압')
  const dgdata = dummy.filter((d) => d.mclass === 'dialogue')
  const bwdata = dummy.filter((d) => d.mclass === '체중')
  const bsdata = dummy.filter((d) => d.mclass === '혈당')
  const exdata = dummy.filter((d) => d.mclass === '운동')

  // min max time range with seconds representation
  let timerange: [number, number] = d3.extent(
    dummy.map((d) => Date.parse(d.date))
  ) as [number, number]

  return (
    <div className="App" style={{ height: '100%' }}>
      <Grid fill={true} rows={['auto', '1fr']}>
        <Header background="dark-1" pad="medium">
          <Nav direction="row">
            대충대충 만들어본 타임라인
            <Anchor href="#" label="CRP 데이터 탐색" color="white" />
            <Anchor href="#" label="혈압 데이터 탐색" color="white" />
            <Anchor href="#" label="태아위치 데이터 탐색" color="white" />
          </Nav>
        </Header>
        <Box direction="column" fill={true}>
          <FluidContext>
            {({ width, height }) => (
              <GlobalTimeline entries={dummy} width={width}></GlobalTimeline>
            )}
          </FluidContext>
          <FluidContext>
            {({ width, height }) => (
              <BloodPressure
                entries={bpdata}
                timerange={timerange}
              ></BloodPressure>
            )}
          </FluidContext>
          <FluidContext>
            {({ width, height }) => (
              <Bloodsugar entries={bsdata} timerange={timerange}></Bloodsugar>
            )}
          </FluidContext>
          <FluidContext>
            {({ width, height }) => (
              <Bodyweight entries={bwdata} timerange={timerange}></Bodyweight>
            )}
          </FluidContext>

          <FluidContext>
            {({ width, height }) => (
              <Excercise entries={exdata} timerange={timerange}></Excercise>
            )}
          </FluidContext>
          <FluidContext>
            {({ width, height }) => (
              <Dialogue entries={dgdata} timerange={timerange}></Dialogue>
            )}
          </FluidContext>
        </Box>
      </Grid>
    </div>
  )
}

export default App

/*
                <GlobalTimeline entries={dummy}, timerange={}></GlobalTimeline>
                  <Bodyweight entries={bwdata}, timerange={}></Bodyweight>
                  <BloodPressure entries={bpdata, timerange={}></BloodPressure>
                  <Bloodsugar entries={bsdata}, time></Bloodsugar>
                  <Excercise entries={exdata}></Excercise>
                  <Dialogue entries={dgdata}></Dialogue>

            */
