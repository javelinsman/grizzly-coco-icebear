import * as d3 from 'd3'
import { Dxc } from 'grommet-icons'
import React, { useLayoutEffect, useState, useRef, DOMElement } from 'react'
import { ItemEntry } from '../redux/state/root-state'
import abnormalChecker from '../utils/abnormalChecker';

interface Props {
  entries: ItemEntry[]
  width: number
}

/*
    길재에 data 요청할 때 데이터 카테고리를 지정하지 않고 카테고리 구분 없이 입력된 모든 데이터 받아옴
*/

const GlobalTimeline: React.FC<Props> = ({
  entries,
  width: containerWidth,
}) => {
  const svgHeight = 200
  const svgWidth = containerWidth * 0.98
  const padding = { left: 40, right: 10, top: 10, bottom: 40 }
  const width = svgWidth - padding.left - padding.right
  const height = svgHeight - padding.top - padding.left

  const boxWidth = 3;
  const boxHeight = 30

  const domains: string[] = ['혈압', '혈당', '체중', '운동', 'dialogue']

  const gXAxis = useRef<SVGGElement>(null)
  const gYAxis = useRef<SVGGElement>(null)

  const timerange: [number, number] = d3.extent(
    entries.map((d) => Date.parse(d.date))
  ) as [number, number]

  const color = (ie: ItemEntry) => {
    return d3.schemeTableau10[domains.indexOf(ie.mclass)]
  }

  const x = d3
    .scaleTime()
    .domain(timerange)
    .range([0, width])

  const y = d3.scaleBand().domain(domains).range([0, height])

  const xAxis = d3.axisBottom(x)
  const yAxis = d3.axisLeft(y)

  console.log(entries)

  useLayoutEffect(() => {
    if (gXAxis.current) {
      d3.select(gXAxis.current).call(xAxis);
    }
    if (gYAxis.current) {
      d3.select(gYAxis.current).call(yAxis);
    }
  })


  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      style={{ border: '1px solid gray' }}
    >
      <g id={'fig'} transform={`translate(${padding.left}, ${padding.top})`}>
        <g ref={gXAxis} transform={`translate(0,${height})`} />
        <g ref={gYAxis} />
        {domains.map((d, i) => {
          return (
            <line
              key={i}
              x1={0}
              y1={i * boxHeight}
              x2={width}
              y2={i * boxHeight}
              stroke={'black'}
              stroke-width={1}
            ></line>
          )
        })}
        {entries.map((d, i) => {
          return (
            <rect
              key={i}
              x={x(Date.parse(d.date))}
              y={y(d.mclass)}
              width={boxWidth}
              height={boxHeight}
              fill = {color(d)}
              opacity = {abnormalChecker(d)? 1: 0.2}
            ></rect>
          )
        })}
      </g>
    </svg>
  )
}

export default GlobalTimeline
