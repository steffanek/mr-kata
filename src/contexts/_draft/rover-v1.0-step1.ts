import { Ref } from "@effect-ts/core"
import { Case, Tagged } from "@effect-ts/core/Case"
import type * as HS from "@effect-ts/core/Collections/Immutable/HashSet"
import * as T from "@effect-ts/core/Effect"
import * as L from "@effect-ts/core/Effect/Layer"
import { tag } from "@effect-ts/core/Has"
//-------------------
//V1 - focus on the center - pure domain logic - domain modeling
//- Base entity: Planet
//- Actors: Rover
//- Use cases: Rover Command

//Develop an API (types and functions) that executes single command:
//Pure domain logic: ADT - Define Entities

//STEP 1: THE BASE ENTITY = PLANET MODELLING
//- Represent the Planet, so first the GridSize

export class GrideSizeTag extends Tagged("GridSize")<{
  readonly width: number
  readonly height: number
}> {}

//Question: do we really need to use tag everywhere?
//We don't really need to tag everything
//We wouldn't need a Tag Type for the GridSize
//its cool to have identified type
//If we want a Case without specific Tag, we can do:
//- it has the same property  Case: copy, destructure equal
//Question what does it mean?
export class GrideSizeCase extends Case<{
  readonly width: number
  readonly height: number
}> {}

//Problem 1: in TS the number types can be a negative number
//I need to be explicit now, and "as Integer"
//Question: I can still put a -2
// const x: Integer = -2 as Integer
// const y: Integer = 1 as Integer
// const z: Integer = (x + y) as Integer

export interface IntegerBrand {
  readonly Integer: unique symbol
}
export type Integer = number & IntegerBrand

//To be even more verbose, and be 100% type safe
//to prevent error like passing x and y, and pass width as the x, and height as the x..
//we should use WithBrand and a HeightBrand
export class PlanetGridSize extends Tagged("PlanetGridSize")<{
  readonly width: Integer
  readonly height: Integer
}> {}

export class Planet extends Tagged("Planet")<{
  readonly gridSize: PlanetGridSize
  readonly obstacles: HS.HashSet<Position>
}> {}

//STEP 2: ACTORS MODELLING
//Represent the Rover, so the Position and the Orientation
//AND The COMMAND IT CAN HANDLE

//Coordinate = Position
//The cool thing about tag I can use the same properties as before

//to be even more verbose, we should have PositionXBrand and PositionYBrand
export class Position extends Tagged("Position")<{
  readonly x: Integer
  readonly y: Integer
}> {}

//Orientation: North, West, South, East
export class North extends Tagged("North")<{}> {}
export class South extends Tagged("South")<{}> {}
export class West extends Tagged("West")<{}> {}
export class East extends Tagged("East")<{}> {}

export type RoverOrientation = North | South | West | East

export class RoverState extends Tagged("RoverState")<{
  readonly position: Position
  readonly orientation: RoverOrientation
}> {}

//STEP 3: USE CASES MODELLING
export class TurnLeft extends Tagged("TurnLeft")<{}> {}
export class TurnRight extends Tagged("TurnRight")<{}> {}
export class MoveForward extends Tagged("MoveForward")<{}> {}
export class MoveBack extends Tagged("MoveBack")<{}> {}
// export class Turn180 extends Tagged("Turn180")<{}> {}

//Question: how to solve the Expression problem?

export type MoveCommand = MoveForward | MoveBack
export type TurnCommand = TurnLeft | TurnRight
export type RoverCommand = MoveCommand | TurnCommand

//STEP 4: Potential ERRORS When running a use case
export class CollisionDetected extends Tagged("CollisionDetected")<{
  readonly obstaclePosition: Position
  readonly roverPosition: Position
}> {}

//STEP 5: REPO for our state (inversion of control)
//Question: using class and union type to define multiple concrete implementation?
//Question if that Repo use a concrete implementation DB that can have error? or the connection would be handle within a Managed?
//Question: create can be extracted to a Managed? We need to connect to the resource?

//Here I can pass void..
export interface RoverRepo {
  create(initialState: RoverState): T.Effect<unknown, never, void>
  get(stateKey: unknown): T.Effect<unknown, never, void>
  set(stateKey: unknown, stateValue: RoverState): T.Effect<unknown, never, void>
}

export const RoverRepo = tag<RoverRepo>()
//utilities to use in our program, they require the Repo
export const { create, get, set } = T.deriveLifted(RoverRepo)(
  ["create", "get", "set"],
  [],
  []
)

//Make our concrete implementation using Ref, to put it in a layer for our environment
export const roverInitialState = new RoverState({
  position: new Position({
    x: 0 as Integer,
    y: 0 as Integer
  }),
  orientation: new North()
})

// Question with type from the Interface vs. here
// export const makeRoverRepo = T.gen(function* (_) {
//   const { create, get, set } = yield* _(RoverRepo)

//   return {
//     create: (roverInitialState: RoverState) => !Ref.makeRef(roverInitialState),
//     get: (roverInitialState: Ref.Ref<RoverState>) => Ref.get(roverInitialState),
//     set: (roverInitialState: Ref.Ref<RoverState>, stateValue: RoverState) =>
//       Ref.set_(roverInitialState, stateValue)
//   }
// })

export const makeLiveRoverRepo = T.succeedWith(
  (): RoverRepo => ({
    create: (roverInitialState: RoverState) =>
      T.succeed(Ref.makeRef(roverInitialState)),
    get: (roverInitialState: Ref.Ref<RoverState>) =>
      T.succeed(Ref.get(roverInitialState)),
    set: (roverInitialState: Ref.Ref<RoverState>, stateValue: RoverState) =>
      T.succeed(Ref.set_(roverInitialState, stateValue))
  })
)

export const LiveLoggerService = L.fromEffect(RoverRepo)(makeLiveRoverRepo)

export const AppDependencies5 = LiveLoggerService
