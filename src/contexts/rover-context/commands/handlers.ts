import { hole, T } from "../../common/effect-utils"
import type { Integer } from "../../common/Integer"
import type { Planet } from "../../planet-context/models/Planet"
import type { RoverState } from "../models/Rover"
import type { RoverId } from "../models/RoverId"
import type { RoverRepo } from "../storage/RoverRepo4"
// import { RoverRepoTag } from "../storage/RoverRepo4"
import type { MoveBack, MoveForward, TurnLeft, TurnRight } from "./Command"
import { addOneTo, modulo, subOneTo } from "./helpers"

export function moveForwardHandler(
  roverId: RoverId["id"],
  rover: RoverState,
  roverRepo: RoverRepo,
  planet: Planet,
  command: MoveForward
): T.IO<never, void> {
  return T.gen(function* (_) {
    // const roverRepo = yield* _(RoverRepoTag)
    //Question 1: Should I use the Interface here?
    switch (rover.orientation._tag) {
      case "North": {
        return yield* _(
          roverRepo.set(
            roverId,
            rover.copy({
              position: rover.position.copy({
                y: modulo(addOneTo(rover.position.y), planet.gridSize.height) as Integer
              })
            })
          )
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
  })
}

export function moveBackHandler(
  roverId: RoverId["id"],
  rover: RoverState,
  roverRepo: RoverRepo,
  planet: Planet,
  command: MoveBack
): T.IO<never, void> {
  switch (rover.orientation._tag) {
    case "North": {
      return roverRepo.set(
        roverId,
        rover.copy({
          position: rover.position.copy({
            y: modulo(subOneTo(rover.position.y), planet.gridSize.height) as Integer
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

export function turnLeftHandler(
  roverId: RoverId["id"],
  rover: RoverState,
  roverRepo: RoverRepo,
  planet: Planet,
  command: TurnLeft
): T.IO<never, void> {
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
  roverId: RoverId["id"],
  rover: RoverState,
  roverRepo: RoverRepo,
  planet: Planet,
  command: TurnRight
): T.IO<never, void> {
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
