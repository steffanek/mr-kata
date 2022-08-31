import { makeObstacle } from "@app/contexts/obstacle-context/models/Obstacle"
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
import { makeCollisionDetected, makeRoverStateNotFound } from "../errors"
import type { RoverId } from "../models/RoverId"
import { RoverContext } from "../RoverContext4"
import type { RoverRepo } from "../storage/RoverRepo4"
// import { RoverRepoTag } from "../storage/RoverRepo4"

//2 types of Commands: Move and Turn
//Those processors will process either a Move or a Turn command
// and check business constraints, if requirement are match, they can process the command by
// delegating to the appropriate handler that will change the state

//Question: API Schema validation..,
//when commands received might be unknown type
//We need to parse those commands to validate them,
//and create those inside our App

export function moveHandler(
  roverId: RoverId["id"], //ID? => UUID => DB
  roverRepo: RoverRepo, //Question 1: Do I need to inject the Repo? or I can just use the Interface?
  planet: Planet,
  command: MoveCommand
) {
  //I imported the Repo so I can use it the utilities..
  //I'm programming to an interface..
  return T.gen(function* (_) {
    // const repo = yield* _(RoverRepoTag)

    const roverCurrentState = yield* _(roverRepo.get(roverId))
    switch (roverCurrentState._tag) {
      case "None": {
        return yield* _(T.fail(makeRoverStateNotFound(roverId)))
      }
      case "Some": {
        const nextPosition = getNextPosition(roverCurrentState.value, planet, command)
        const isCollisionDetected = HS.has_(planet.obstacles["position"], nextPosition)
        if (isCollisionDetected) {
          const obstacle = makeObstacle(
            new ObstaclePosition({
              x: nextPosition.x,
              y: nextPosition.y
            })
          )
          const roverPosition = roverCurrentState.value.position
          return yield* _(T.fail(makeCollisionDetected(obstacle, roverPosition)))
        }
        switch (command._tag) {
          case "MoveForward": {
            return yield* _(
              moveForwardHandler(
                roverId,
                roverCurrentState.value,
                roverRepo,
                planet,
                command
              )
            )
          }
          case "MoveBack": {
            return yield* _(
              moveBackHandler(
                roverId,
                roverCurrentState.value,
                roverRepo,
                planet,
                command
              )
            )
          }
        }
      }
    }
  })
}

export function turnHandler(
  roverId: RoverId["id"], //ID? => UUID => DB
  roverRepo: RoverRepo, //Question 1: Do I need to inject the Repo? or I can just use the Interface?
  planet: Planet,
  command: TurnCommand
) {
  return T.gen(function* (_) {
    // const repo = yield* _(RoverRepoTag)
    const roverCurrentState = yield* _(roverRepo.get(roverId))
    switch (roverCurrentState._tag) {
      case "None": {
        return yield* _(T.fail(makeRoverStateNotFound(roverId)))
      }
      case "Some": {
        switch (command._tag) {
          case "TurnLeft": {
            return yield* _(
              turnLeftHandler(
                roverId,
                roverCurrentState.value,
                roverRepo,
                planet,
                command
              )
            )
          }
          case "TurnRight": {
            return yield* _(
              turnRightHandler(
                roverId,
                roverCurrentState.value,
                roverRepo,
                planet,
                command
              )
            )
          }
        }
      }
    }
  })
}

export function processSingleCommand(command: RoverCommand) {
  return T.gen(function* (_) {
    const rover = yield* _(RoverContext)

    if (command._tag === "MoveForward" || command._tag === "MoveBack") {
      return yield* _(rover.Write.move(command))
    }
    // return yield* _(rover.Write.turn(command))
  })
}
