import React, { MouseEvent } from "react"
import createContext from "../hooks/createContext"
import useCanvasState from "../hooks/useCanvasState"
import Point from "./Point"
import Form from "./Form"
import styles from "./App.module.scss"

const App = () => {
  const canvas = useCanvasState()
  const { points, current, deselect, create, move } = canvas

  /* 클릭 */
  const handleClick = (e: MouseEvent) => {
    current ? deselect() : create(getPosition(e))
  }

  /* 우클릭 */
  const handleContext = (e: MouseEvent) => {
    e.preventDefault()
    current && move(current, getPosition(e))
    deselect()
  }

  return (
    <CanvasProvider value={canvas}>
      <div
        className={styles.container}
        onClick={(e) => e.target === e.currentTarget && handleClick(e)}
        onContextMenu={(e) => e.target === e.currentTarget && handleContext(e)}
      >
        {Object.entries(points).map(([id, point]) => {
          const active = id === current
          return (
            <Point id={id} point={point} active={active} key={id}>
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
