import type { _A } from "../common/effect-utils"
import { HM, L, pipe, T, tag } from "../common/effect-utils"
import { zeroZeroPosition } from "../config"
import { PlanetContext } from "../planet-context/PlanetContext"
import type { MoveCommand, TurnCommand } from "./commands/Command"
import type { RoverState } from "./models/Rover"
import { makeRoverState } from "./models/Rover"
import type { RoverId } from "./models/RoverId"
import { makeRoverId } from "./models/RoverId"
import { RoverOrientation } from "./models/RoverOrientation"
import { moveHandler, turnHandler } from "./processors.ts/singleCommand"
import { RoverRepo2 } from "./storage/RoverRepo2"

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
  const roverRepo = yield* _(RoverRepo2)

  const roverId = makeRoverId("1").id
  const emptyHashMap = HM.make<RoverId["id"], RoverState>()
  const RoverHashMap = pipe(emptyHashMap, HM.set(roverId, rover))

  //Question 1: I would like to us the roverRepo, but it doesn't work this way..
  const RoverHashMap2 = pipe(emptyHashMap, roverRepo.set(roverId, rover))

  const getRoverState = roverRepo.get(roverId)

  //Define API
  //Read context:
  const getCurrentState = pipe(RoverHashMap, HM.get(roverId))

  //Write context, those should return void..(side effect change state):
  const move = (command: MoveCommand) => moveHandler(roverId, planet, command)
  const turn = (command: TurnCommand) => turnHandler(roverId, planet, command)

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

export const RoverContextDependency = LiveRoverContext

//Should I write a RoverContext Program (main) and provide it those layer?
