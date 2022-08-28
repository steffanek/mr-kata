import type { _A } from "../common/effect-utils"
import { L, Ref, T, tag } from "../common/effect-utils"
import { zeroZeroPosition } from "../config"
import { PlanetContext } from "../planet-context/PlanetContext"
import type { MoveCommand, TurnCommand } from "./commands/Command"
import type { RoverState } from "./models/Rover"
import { makeRoverState } from "./models/Rover"
import { makeRoverId } from "./models/RoverId"
import { RoverOrientation } from "./models/RoverOrientation"
import { moveHandler, turnHandler } from "./processors.ts/singleCommand"
import { LiveRoverRepo, RoverRepo } from "./storage/RoverRepo"

//This Context should represent a concrete implementation as an Effect, with Dependency, Error and Result Expected
//State initial: Yes
//State can change: Yes
//Dependency:
// - with another Context: PlanetContext (interface/contract)
// - with inner Repo to save State: RoverRepo (interface/contract)

//Higher level abstraction
export const makeRoverContext = T.gen(function* (_) {
  //Dependencies
  const planet = yield* _(PlanetContext)

  //makerRover initial state from config (hard coded)
  const rover = makeRoverState(zeroZeroPosition, RoverOrientation.North)

  //Save that initial state locally (inMemory):
  const roverRepo = yield* _(RoverRepo)
  //Question: yield, yield, its not bad performance?
  const roverCurrentState = yield* _(yield* _(roverRepo.create(rover)))

  //Define API
  //Read context:
  const getCurrentState = yield* _(yield* _(roverRepo.get(roverCurrentState)))

  //Write context, those should return void..(side effect change state):
  const move = (command: MoveCommand) => moveHandler(getCurrentState, planet, command)
  const turn = (command: TurnCommand) => turnHandler(getCurrentState, planet, command)

  return {
    Read: {
      getCurrentState
    },
    Write: {
      move,
      turn
    }
  }
})
export interface RoverContext extends _A<typeof makeRoverContext> {}

export const RoverContext = tag<RoverContext>()

export const LiveRoverContext = L.fromEffect(RoverContext)(makeRoverContext)

export const RoverContextDependency = LiveRoverRepo
