import { pipe } from "@effect-ts/core"

import { T } from "../../common/effect-utils"
import type { RoverCommand } from "../commands/Command"
import { RoverContext } from "../RoverContext4"
import { processSingleCommand } from "./singleCommand"
//As a Rover, we receive Commands from outside that they are unknown
//A Queue/Pipe and commands..
//We need to parse those commands first, and filter out those who are
//not defined as in our model..
//Then we create Commands, and put it inside another Queue,
//that will handle and process the domain command
export function processBatchCommandsV0(commands: RoverCommand[]) {
  T.gen(function* (_) {
    const rover = yield* _(RoverContext)

    // const roverState = yield* _(rover.Read.getCurrentState)
    const c1 = pipe(
      commands,
      T.reduce({}, (cumState, command) => {
        processSingleCommand(command)
        switch (rover.Read.getCurrentState._tag) {
          case "None": {
            return T.fail("")
          }
          case "Some": {
            return rover.Read.getCurrentState.value
          }
        }
      })
    )
    console.log("c1", c1)
    return c1
  })
}
