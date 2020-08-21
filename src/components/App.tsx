import React, { MouseEvent, useState } from "react"
import createContext from "../hooks/createContext"
import useCanvasState from "../hooks/useCanvasState"
import Point from "./Point"
import Form from "./Form"
import styles from "./App.module.scss"

const App = () => {
  const canvas = useCanvasState()
  const { points, current, deselect, create, move } = canvas

  /* 마우스 */
  const [cursor, setCursor] = useState<Coordinate>()

  /* 컨테이너 */
  const handleWith = (
    callback: (position: Coordinate) => void,
    onCurrent: boolean = true
  ) => {
    return (e: MouseEvent) => {
      if (!onCurrent || e.target === e.currentTarget) {
        e.preventDefault()
        callback(getPosition(e))
      }
    }
  }

  /* 클릭 */
  const handleClick = (position: Coordinate) => {
    current ? deselect() : create(position)
  }

  /* 우클릭 */
  const handleContext = (position: Coordinate) => {
    current && move(current, position)
    deselect()
  }

  return (
    <CanvasProvider value={canvas}>
      <div
        className={styles.container}
        onMouseMove={handleWith(setCursor, false)}
        onClick={handleWith(handleClick)}
        onContextMenu={handleWith(handleContext)}
      >
        {cursor && <Point position={cursor} cursor />}
        {Object.entries(points).map(([id, point]) => {
          const active = id === current
          return (
            <Point id={id} {...point} active={active} key={id}>
              {active ? <Form id={id} point={point} /> : point.value}
            </Point>
          )
        })}
      </div>
    </CanvasProvider>
  )
}

export default App

/* context */
export const [useCanvas, CanvasProvider] = createContext<Canvas>()

/* utils */
const getPosition = (e: MouseEvent) => ({ x: e.pageX, y: e.pageY })
