import React, { Fragment, useRef, ChangeEvent, KeyboardEvent } from "react"
import Colors from "../constants/Colors.json"
import { useCanvas } from "./App"
import styles from "./Form.module.scss"

const Form = ({ id, point }: { id: string; point: Point }) => {
  const { update, deselect } = useCanvas()
  const inputRef = useRef<HTMLInputElement>(null)
  const focus = () => inputRef.current?.focus()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update(id, { ...point, [e.target.name]: e.target.value })
    e.target.name === "color" && (point.value ? deselect() : focus())
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    ;(e.key === "Enter" || e.key === "Escape") && deselect()
  }

  return (
    <>
      <input
        className={styles.input}
        name="value"
        value={point.value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoFocus
        autoComplete="off"
      />

      <section className={styles.colors}>
        {Colors.map(({ code }) => (
          <Fragment key={code}>
            <input
              type="radio"
              name="color"
              id={code}
              value={code}
              onChange={handleChange}
              checked={code === point.color}
              hidden
            />
            <label
              htmlFor={code}
              className={styles.color}
              style={{ background: code }}
            />
          </Fragment>
        ))}
      </section>
    </>
  )
}

export default Form
