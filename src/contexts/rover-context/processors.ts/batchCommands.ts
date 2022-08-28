import { pipe } from "@effect-ts/core"

import { T } from "../../common/effect-utils"
import type { Planet } from "../../planet-context/models/Planet"
import type { RoverCommand } from "../commands/Command"
import type { CollisionDetected } from "../errors/Errors"
import type { RoverState } from "../models/Rover"
import { processSingleCommand } from "./singleCommand"

//As a Rover, we receive Commands from outside that they are unknown
//A Queue/Pipe and commands..
//We need to parse those commands first, and filter out those who are
//not defined as in our model..
//Then we create Commands, and put it inside another Queue,
//that will handle and process the domain command
export function processBatchCommandsV0(
  rover: RoverState,
  planet: Planet,
  commands: RoverCommand[]
): T.IO<CollisionDetected, RoverState> {
  const c1 = pipe(
    commands,
    T.reduce(rover, (cumState, command) => {
      console.log("cumState", cumState)
      return processSingleCommand(cumState, planet, command)
    })
  )
  console.log("c1", c1)
  return c1
}
