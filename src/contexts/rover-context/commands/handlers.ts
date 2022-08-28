import type { T } from "../../common/effect-utils"
import { hole } from "../../common/effect-utils"
import type { Integer } from "../../common/Integer"
import type { Planet } from "../../planet-context/models/Planet"
import type { RoverState } from "../models/Rover"
import * as RoverRepo from "../storage/RoverRepo"
import type { MoveBack, MoveForward, TurnLeft, TurnRight } from "./Command"
import { addOneTo, modulo, subOneTo } from "./helpers"

export function moveForwardHandler(
  roverCurrentState: RoverState,
  planet: Planet,
  command: MoveForward
): T.IO<never, void> {
  switch (roverCurrentState.orientation._tag) {
    case "North": {
      return RoverRepo.set(
        roverCurrentState.copy({
          position: roverCurrentState.position.copy({
            y: modulo(
              addOneTo(roverCurrentState.position.y),
              planet.gridSize.height
            ) as Integer
          })
        })
      )
    }
    case "South": {
      return hole()
    }
    case "West": {
      return hole()
    }
    case "East": {
      return hole()
    }
  }
  return hole()
}

export function moveBackHandler(
  roverCurrentState: RoverState,
  planet: Planet,
  command: MoveBack
): RoverState {
  switch (roverCurrentState.orientation._tag) {
    case "North": {
      return roverCurrentState.copy({
        position: roverCurrentState.position.copy({
          y: modulo(
            subOneTo(roverCurrentState.position.y),
            planet.gridSize.height
          ) as Integer
        })
      })
    }
    case "South": {
      return hole()
    }
    case "West": {
      return hole()
    }
    case "East": {
      return hole()
    }
  }
  return hole()
}

export function turnLeftHandler(
  rover: RoverState,
  planet: Planet,
  command: TurnLeft
): RoverState {
  switch (rover.orientation._tag) {
    case "North": {
      return hole()
    }
    case "South": {
      return hole()
    }
    case "West": {
      return hole()
    }
    case "East": {
      return hole()
    }
  }
  return hole()
}

export function turnRightHandler(
  rover: RoverState,
  planet: Planet,
  command: TurnRight
): RoverState {
  switch (rover.orientation._tag) {
    case "North": {
      return hole()
    }
    case "South": {
      return hole()
    }
    case "West": {
      return hole()
    }
    case "East": {
      return hole()
    }
  }
  return hole()
}
