import { T } from "@app/contexts/common/effect-utils"

// import { makeRoverStateNotFound } from "../errors"
import { RoverContext } from "../RoverContext4"

//Question 1: NoSuchElementException
export function getRoverState() {
  return T.gen(function* (_) {
    const rover = yield* _(RoverContext)
    console.log(rover)
    const roverCurrentState = rover.Read.getCurrentState
    console.log(roverCurrentState)
    switch (roverCurrentState._tag) {
      case "None": {
        return yield* _(T.fail("makeRoverStateNotFound(roverId)"))
      }
      case "Some": {
        console.log(roverCurrentState)
        return roverCurrentState.value
      }
    }
  })
}
