import type { _A } from "../common/effect-utils"
import { L, pipe, T, tag } from "../common/effect-utils"
import { zeroZeroPosition } from "../config"
import { PlanetContext } from "../planet-context/PlanetContext"
import type { MoveCommand, TurnCommand } from "./commands/Command"
import { makeRoverState } from "./models/Rover"
import { makeRoverId } from "./models/RoverId"
import { RoverOrientation } from "./models/RoverOrientation"
import { moveHandler, turnHandler } from "./processors.ts/singleCommand"
import { RoverRepo3 } from "./storage/RoverRepo3"

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
  const roverRepo = yield* _(RoverRepo3)
  const RoverHasHMap = roverRepo.make()
  const roverId = makeRoverId("1").id
  //Question 1: I would like to us the roverRepo, but it doesn't work this way..
  const saveInitialState = pipe(RoverHasHMap, T.chain(roverRepo.set(roverId, rover)))

  //Define API
  //Read context:
  const getCurrentState = yield* _(pipe(RoverHasHMap, T.chain(roverRepo.get(roverId))))

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
