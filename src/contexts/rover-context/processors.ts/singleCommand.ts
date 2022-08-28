import { Obstacle } from "@app/contexts/obstacle-context/models/Obstacle"
import { ObstaclePosition } from "@app/contexts/obstacle-context/models/ObstaclePosition"

import { HS, T } from "../../common/effect-utils"
import type { Planet } from "../../planet-context/models/Planet"
import type { MoveCommand, RoverCommand, TurnCommand } from "../commands/Command"
import {
  moveBackHandler,
  moveForwardHandler,
  turnLeftHandler,
  turnRightHandler
} from "../commands/handlers"
import { getNextPosition } from "../commands/helpers"
import { CollisionDetected } from "../errors/Errors"
import type { RoverState } from "../models/Rover"
import type { RoverId } from "../models/RoverId"

//2 types of Commands: Move and Turn

//Those processors will process either a Move or a Turn command
// and check business constraints, if requirement are match, they can process the command by
// delegating to the appropriate handler that will change the state

//Question: API Schema validation..,
//when commands received might be unknown type
//We need to parse those commands to validate them,
//and create those inside our App

export function moveHandler(
  roverId: RoverId, //ID? => UUID => DB
  planet: Planet,
  command: MoveCommand
): T.IO<CollisionDetected, RoverState> {
  //I imported the Repo so I can use it the utilities..
  //I'm programming to an interface..

  const nextPosition = getNextPosition(roverCurrentState, planet, command)
  const isCollisionDetected = HS.has_(planet.obstacles["position"], nextPosition)
  if (isCollisionDetected) {
    return T.fail(
      new CollisionDetected({
        obstacle: new Obstacle({
          position: new ObstaclePosition({
            x: nextPosition.x,
            y: nextPosition.y
          })
        }),
        roverPosition: roverCurrentState.position
      })
    )
  }
  switch (command._tag) {
    case "MoveForward": {
      return T.succeedWith(() => moveForwardHandler(roverCurrentState, planet, command))
    }
    case "MoveBack": {
      return T.succeedWith(() => moveBackHandler(roverCurrentState, planet, command))
    }
  }
}

export function turnHandler(
  roverCurrentState: RoverState,
  planet: Planet,
  command: TurnCommand
): T.IO<CollisionDetected, RoverState> {
  switch (command._tag) {
    case "TurnLeft": {
      return T.succeedWith(() => turnLeftHandler(roverCurrentState, planet, command))
    }
    case "TurnRight": {
      return T.succeedWith(() => turnRightHandler(roverCurrentState, planet, command))
    }
  }
}

export function processSingleCommand(
  roverCurrentState: RoverState,
  planet: Planet,
  command: RoverCommand
): T.IO<CollisionDetected, RoverState> {
  if (command._tag === "MoveForward" || command._tag === "MoveBack") {
    return moveHandler(roverCurrentState, planet, command)
  }
  return turnHandler(roverCurrentState, planet, command)
}
