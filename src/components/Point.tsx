import React, { FC, MouseEvent } from "react"
import classNames from "classnames"
import { useCanvas } from "./App"
import styles from "./Point.module.scss"

interface Props {
  id: string
  point: Point
  active: boolean
}

const Point: FC<Props> = ({ id, point, active, children }) => {
  const { current, select, deselect, swap, remove } = useCanvas()

  /* 클릭 */
  const handleClick = () => select(id)

  /* 우클릭 */
  const handleContext = (e: MouseEvent) => {
    e.preventDefault()
    current ? swap(current, id) : remove(id)
    deselect()
  }

  return (
    <div
      className={classNames(styles.point, active && styles.active)}
      style={getStyle(point)}
      onClick={handleClick}
      onContextMenu={handleContext}
    >
      {children}
    </div>
  )
}

export default Point

const getStyle = ({ position: { x, y }, color }: Point) => ({
  left: x,
  top: y,
  color,
})
