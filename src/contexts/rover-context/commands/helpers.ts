import { hole } from "../../common/effect-utils"
import type { Integer } from "../../common/Integer"
import type { Planet } from "../../planet-context/models/Planet"
import type { RoverState } from "../models/Rover"
import type { RoverPosition } from "../models/RoverPosition"
import type { MoveCommand } from "./Command"

export function modulo(x: Integer, y: Integer) {
  return Math.abs(x % y) as Integer
}
export function add(x: Integer) {
  return (y: Integer) => (x + y) as Integer
}
export function sub(y: Integer) {
  return (x: Integer) => (x - y) as Integer
}
export const addOneTo = add(1 as Integer)
export const subOneTo = sub(1 as Integer)

export function getNextPosition(
  roverCurrentState: RoverState,
  planet: Planet,
  command: MoveCommand
): RoverPosition {
  switch (command._tag) {
    case "MoveForward": {
      switch (roverCurrentState.orientation._tag) {
        case "North": {
          return roverCurrentState.position.copy({
            y: modulo(
              addOneTo(roverCurrentState.position.y),
              planet.gridSize.height
            ) as Integer
          })
        }
        case "South": {
          return hole()
        }
      }
      return hole()
    }
    case "MoveBack": {
      switch (roverCurrentState.orientation._tag) {
        case "North": {
          return roverCurrentState.position.copy({
            y: modulo(
              subOneTo(roverCurrentState.position.y),
              planet.gridSize.height
            ) as Integer
          })
        }
      }
      return hole()
    }
  }
  return hole()
}
