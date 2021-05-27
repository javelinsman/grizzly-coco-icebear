import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react'

interface Props {
  children: (context: { width: number; height: number }) => ReactNode
}

const FluidContext: React.FC<Props> = ({ children }) => {
  const container = useRef<HTMLDivElement>(null)
  const [bbox, setBbox] =
    useState<{ width: number; height: number } | null>(null)
  useLayoutEffect(() => {
    if (container.current && !bbox) {
      const { width, height } = container.current.getBoundingClientRect()
      setBbox({ width, height })
    }
  })

  return <div ref={container}>{bbox && children(bbox)}</div>
}

export default FluidContext
