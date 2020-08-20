/// <reference types="react-scripts" />

interface Canvas {
  current?: string
  select: (id: string) => void
  deselect: () => void
  update: (id: string, point: Point) => void
  swap: (id: string, id: string) => void
  remove: (id: string) => void
}

interface Point {
  position: Coordinate
  value: string
  color: string
}

interface Coordinate {
  x: number
  y: number
}
