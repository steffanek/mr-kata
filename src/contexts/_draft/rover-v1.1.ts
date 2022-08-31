// import { Case, Tagged } from "@effect-ts/core/Case"
// import { hole } from "@effect-ts/core/Function"
// //Actors:
// //- pilot (send command to the rover)

// //Entities:
// //- a rover
// //  - local rover state: position (x,y), orientation(north, east, west, south)
// //- a planet (grid x --- and y | )
// //  - local planet state: grid (x, y), with x (width) and y (height) size, boundaries
// //- an obstacle on the planet
// //  - local obstacle state: position (x,y)

// //Context the rover is positioned on the planet?

// //State:
// //- global:
// //  -initial: a Planet with a rover and some obstacles
// //  -final: a Planet with a rover and some obstacles
// //Each entity has its life cycle, and state..

// //Use cases:
// //Commands:
// //-turnLeft
// //-turnRight
// //-moveForward
// //-moveBack

// //Constraints and business logic for each command is the same:
// //- if a planet boundaries is attain, get back to the opposite boundary
// //- if an obstacle is encountered move back to the latest point

// //-------------------
// //V1 - focus on the center - pure domain logic - domain modeling
// //Develop an API (types and functions) that executes single command:
// //Pure domain logic: ADT - Define Entities

// //STEP 1: THE BASE ENTITY = PLANET MODELLING
// //- Represent the Planet, so first the GridSize

// export class GrideSizeTag extends Tagged("GridSize")<{
//   readonly width: number
//   readonly height: number
// }> {}

// //Question: do we really need to use tag everywhere?
// //We don't really need to tag everything
// //We wouldn't need a Tag Type for the GridSize
// //its cool to have identified type
// //If we want a Case without specific Tag, we can do:
// //- it has the same property  Case: copy, destructure equal
// //Question what does it mean?
// export class GrideSizeCase extends Case<{
//   readonly width: number
//   readonly height: number
// }> {}

// //Problem 1: in TS the number types can be a negative number
// //I need to be explicit now, and "as Integer"
// //Question: I can still put a -2
// // const x: Integer = -2 as Integer
// // const y: Integer = 1 as Integer
// // const z: Integer = (x + y) as Integer

// export interface IntegerBrand {
//   readonly Integer: unique symbol
// }
// export type Integer = number & IntegerBrand

// //To be even more verbose, and be 100% type safe
// //to prevent error like passing x and y, and pass width as the x, and height as the x..
// //we should use WithBrand and a HeightBrand
// export class PlanetGridSize extends Tagged("PlanetGridSize")<{
//   readonly width: Integer
//   readonly height: Integer
// }> {}

// export class ThePlanet extends Tagged("ThePlanet")<{
//   readonly gridSize: PlanetGridSize
// }> {}

// //STEP 2: ACTORS MODELLING
// //Represent the Rover, so the Position and the Orientation
// //AND The COMMAND IT CAN HANDLE

// //Coordinate = Position
// //The cool thing about tag I can use the same properties as before

// //to be even more verbose, we should have PositionXBrand and PositionYBrand
// export class ThePosition extends Tagged("ThePosition")<{
//   readonly x: Integer
//   readonly y: Integer
// }> {}

// //Orientation: North, West, South, East
// export class NorthOrientation extends Tagged("NorthOrientation")<{}> {}
// export class SouthOrientation extends Tagged("SouthOrientation")<{}> {}
// export class WestOrientation extends Tagged("WestOrientation")<{}> {}
// export class EastOrientation extends Tagged("EastOrientation")<{}> {}

// export type OrientationType =
//   | NorthOrientation
//   | SouthOrientation
//   | WestOrientation
//   | EastOrientation

// export class TheRover extends Tagged("The Rover")<{
//   readonly position: ThePosition
//   readonly orientation: OrientationType
// }> {}

// //STEP 3: USE CASES MODELLING
// export class TurnLeftCommand extends Tagged("TurnLeftCommand")<{}> {}
// export class TurnRightCommand extends Tagged("TurnRightCommand")<{}> {}
// export class MoveForwardCommand extends Tagged("MoveForwardCommand")<{}> {}
// export class MoveBackCommand extends Tagged("MoveBackCommand")<{}> {}

// export type RoverCommand =
//   | TurnLeftCommand
//   | TurnRightCommand
//   | MoveForwardCommand
//   | MoveBackCommand

// //STEP 4: FIRST BUSINESS LOGIC
// //- Implement wrapping from one edge of the grid to another (pacman effect).
// //At start we define the GridSize, max width and max height
// //Ex: width: 4, height: 4
// //if the position of the rover is at the border

// export function modulo(x: Integer, y: Integer) {
//   return Math.abs(x % y) as Integer
// }
// export function addition(x: Integer) {
//   return (y: Integer) => (x + y) as Integer
// }
// export const addOneTo = addition(1 as Integer)

// //
// export function moveForwardHandler(
//   rover: TheRover,
//   planet: ThePlanet,
//   command: MoveForwardCommand
// ): TheRover {
//   switch (rover.orientation._tag) {
//     case "NorthOrientation": {
//       return rover.copy({
//         position: rover.position.copy({
//           y: modulo(addOneTo(rover.position.y), planet.gridSize.height) as Integer
//         })
//       })
//     }
//     case "SouthOrientation": {
//       return hole()
//     }
//     case "WestOrientation": {
//       return hole()
//     }
//     case "EastOrientation": {
//       return hole()
//     }
//   }
//   return hole()
// }

// export function moveBackHandler(
//   rover: TheRover,
//   planet: ThePlanet,
//   command: MoveBackCommand
// ): TheRover {
//   switch (rover.orientation._tag) {
//     case "NorthOrientation": {
//       return hole()
//     }
//     case "SouthOrientation": {
//       return hole()
//     }
//     case "WestOrientation": {
//       return hole()
//     }
//     case "EastOrientation": {
//       return hole()
//     }
//   }
//   return hole()
// }

// export function turnLeftHandler(
//   rover: TheRover,
//   planet: ThePlanet,
//   command: TurnLeftCommand
// ): TheRover {
//   switch (rover.orientation._tag) {
//     case "NorthOrientation": {
//       return hole()
//     }
//     case "SouthOrientation": {
//       return hole()
//     }
//     case "WestOrientation": {
//       return hole()
//     }
//     case "EastOrientation": {
//       return hole()
//     }
//   }
//   return hole()
// }
// export function turnRightHandler(
//   rover: TheRover,
//   planet: ThePlanet,
//   command: TurnRightCommand
// ): TheRover {
//   switch (rover.orientation._tag) {
//     case "NorthOrientation": {
//       return hole()
//     }
//     case "SouthOrientation": {
//       return hole()
//     }
//     case "WestOrientation": {
//       return hole()
//     }
//     case "EastOrientation": {
//       return hole()
//     }
//   }
//   return hole()
// }

// //Version with Switch Case
// export function moveRover(
//   rover: TheRover,
//   planet: ThePlanet,
//   command: RoverCommand
// ): TheRover {
//   switch (command._tag) {
//     case "MoveForwardCommand": {
//       return moveForwardHandler(rover, planet, command)
//     }
//     case "MoveBackCommand": {
//       return moveBackHandler(rover, planet, command)
//     }
//     case "TurnLeftCommand": {
//       return turnLeftHandler(rover, planet, command)
//     }
//     case "TurnRightCommand": {
//       return turnRightHandler(rover, planet, command)
//     }
//   }
//   return hole()
// }

// //STEP 3:
// //Represent an Obstacle, so the Position
// export class Obstacle extends Tagged("Obstacle")<{
//   readonly position: ThePosition
// }> {}

// //--------
// //Question a union Type can be defined in 2 ways?
// //Method 1: using type + interface

// // this means an EitherUnion is built in from a Left or a Right
// export type EitherUnion = Left | Right
// interface Left {
//   readonly _tag: "Left"
// }
// interface Right {
//   readonly _tag: "Right"
// }

// //Method 2: using type + class (interface + as method as additional power)
// export type EitherUnionClass = Left2 | Right2
// class Left2 extends Tagged("Left2")<{}> {}
// class Right2 extends Tagged("Right2")<{}> {}

// //Question: can we have a 3rd method with: Base Class and Child class that extend to the Base one?

// // this means an EitherUnion is built in from a Left or a Right
// //it means a Term or MathExpr can be build also from a Add | Sub | Value etc..

// //We write a program that built an Add or Sub, a Left or a Right
// //An Add can take 2 values, a Value just one, but they all return an MathExpr
// //each can be evaluated
// //and then we evaluate our program: branching/pattern matching and decide..
// //but also we might handle exception..

// //A Term is our program, that should return a Value

// //Domain modeling with ADT..
