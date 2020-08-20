import { useState } from "react"
import { Dictionary, last, omit, clone } from "ramda"
import { v4 as uuidv4 } from "uuid"
import Colors from "../constants/Colors.json"

type Points = Dictionary<Point>

export default () => {
  const init = () => {
    try {
      const points = localStorage.getItem("points")
      return points ? JSON.parse(points) : {}
    } catch (error) {
      return {}
    }
  }

  const [current, setCurrent] = useState<string>()
  const [points, setPoints] = useState<Points>(init)

  /* 추가, 편집, 삭제 */
  const save = (points: Points) => {
    setPoints(points)
    localStorage.setItem("points", JSON.stringify(points))
  }

  const create = (position: Coordinate) => {
    const id = uuidv4()
    update(id, { position, value: "", color: last(Colors)!.code })
    setCurrent(id)
  }

  const update: Canvas["update"] = (id, point) => {
    save({ ...points, [id]: point })
  }

  const move = (id: string, position: Coordinate) => {
    update(id, { ...points[id], position })
  }

  const swap = (a: string, b: string) => {
    const posA = clone(points[a].position)
    const posB = clone(points[b].position)

    save({
      ...points,
      [a]: { ...points[a], position: posB },
      [b]: { ...points[b], position: posA },
    })
  }

  const remove = (id: string) => {
    save(omit([id], points))
  }

  return {
    /* points */
    points,
    current,
    select: setCurrent,
    deselect: () => setCurrent(undefined),

    /* point */
    create,
    move,
    swap,
    update,
    remove,
  }
}
