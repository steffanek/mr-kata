import type { _A } from "../common/effect-utils"
import { L, T, tag } from "../common/effect-utils"
import { zeroZeroPosition } from "../config"
import { PlanetContext, PlanetContextDependency } from "../planet-context/PlanetContext"
import type { MoveCommand, TurnCommand } from "./commands/Command"
import { makeRoverState } from "./models/Rover"
import { makeRoverId } from "./models/RoverId"
import { RoverOrientation } from "./models/RoverOrientation"
import { moveHandler, turnHandler } from "./processors.ts/singleCommand"
import { LiveRoverRepo4, RoverRepoTag } from "./storage/RoverRepo4"

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
  //Should I use makeRoverRepo instead?
  const roverRepo = yield* _(RoverRepoTag)
  const roverId = makeRoverId("1").id
  //This should be a void result..
  yield* _(roverRepo.set(roverId, rover))

  //Define API
  //Read context:
  //Question 1: this gives an Option, should I leave it this way?
  const getCurrentState = yield* _(roverRepo.get(roverId))
  console.log("from Context", getCurrentState)
  //Should I inject the REPO?
  //Write context, those should return void..(side effect change state):
  const move = (command: MoveCommand) =>
    moveHandler(roverId, roverRepo, planet, command)
  const turn = (command: TurnCommand) =>
    turnHandler(roverId, roverRepo, planet, command)

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

export const RoverContextDependency = LiveRoverContext["<<<"](LiveRoverRepo4)["<<<"](
  PlanetContextDependency
)

//Should I write a RoverContext Program (main) and provide it those layer?
