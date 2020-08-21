import React, { FC, MouseEvent } from "react"
import classNames from "classnames"
import { useCanvas } from "./App"
import styles from "./Point.module.scss"

interface Props extends Point {
  id?: string
  active?: boolean
  cursor?: boolean
}

const Point: FC<Props> = ({ id, position, color, children, ...props }) => {
  const { active, cursor } = props
  const { current, select, deselect, swap, remove } = useCanvas()

  /* 클릭 */
  const handleClick = () => id && select(id)

  /* 우클릭 */
  const handleContext = (e: MouseEvent) => {
    e.preventDefault()
    id && (current ? swap(current, id) : remove(id))
    deselect()
  }

  return (
    <div
      className={classNames(
        styles.point,
        active && styles.active,
        cursor && styles.cursor
      )}
      style={{ ...getStyle(position), color }}
      onClick={handleClick}
      onContextMenu={handleContext}
    >
      {children}
    </div>
  )
}

export default Point

/* styles */
const getStyle = ({ x, y }: Coordinate) => ({ left: x, top: y })
