// //STEP 2: ADDING BUSINESS LOGIC TO OUR USE CASES
// //Business Rule 1:
// //- Implement wrapping from one edge of the grid to another (pacman effect)

// //Business Rule 2:
// // - There are many obstacles on the planet. An obstacle has a position expressed as x, y co-ordinates.
// // - If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point and aborts the
// //   sequence.

// //For any move command (use case), the rover can encounters an obstacle..
// //so for any use case, we need to check if the command can be executed..

// //Event: Forward Moved, Back Moved, Left Turned, Right Turned
// // are facts that there is no obstacles

// //Obstacles can be represent as a Set of position
// //The problem with Set in JS:
// // - mutable in nature, any immutable is expensive
// // - they only support reference base equality

// //The Command Handler should delegate to the Aggregate
// //The Aggregate should check the business rules to see if the Command can be executed

// //With Effect we can find immutable data type under: "@effect-ts/core/Collections/Immutable/...
// //- Chunk not very optimize (??)
// //- Dictionary not because they are string based records
// //- Hash Map maybe
// //- Hash Set maybe
// //The advantage of Set is that it can only store unique values.. and is very similar to an Array
// import { Tagged } from "@effect-ts/core/Case"
// import * as HS from "@effect-ts/core/Collections/Immutable/HashSet"
// import * as T from "@effect-ts/core/Effect"
// import * as Ex from "@effect-ts/core/Effect/Exit"
// // import * as Ex from "@effect-ts/core/Effect/Exit"
// import { hole, pipe } from "@effect-ts/core/Function"

// import * as RoverDomain from "./rover-v1.0-step1"

// export function modulo(x: RoverDomain.Integer, y: RoverDomain.Integer) {
//   return Math.abs(x % y) as RoverDomain.Integer
// }
// export function add(x: RoverDomain.Integer) {
//   return (y: RoverDomain.Integer) => (x + y) as RoverDomain.Integer
// }
// export function sub(y: RoverDomain.Integer) {
//   return (x: RoverDomain.Integer) => (x - y) as RoverDomain.Integer
// }
// export const addOneTo = add(1 as RoverDomain.Integer)
// export const subOneTo = sub(1 as RoverDomain.Integer)

// export function getNextPosition(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.MoveCommand
// ): RoverDomain.Position {
//   switch (command._tag) {
//     case "MoveForward": {
//       switch (rover.orientation._tag) {
//         case "North": {
//           return rover.position.copy({
//             y: modulo(
//               addOneTo(rover.position.y),
//               planet.gridSize.height
//             ) as RoverDomain.Integer
//           })
//         }
//         case "South": {
//           return hole()
//         }
//       }
//       return hole()
//     }
//     case "MoveBack": {
//       switch (rover.orientation._tag) {
//         case "North": {
//           return rover.position.copy({
//             y: modulo(
//               subOneTo(rover.position.y),
//               planet.gridSize.height
//             ) as RoverDomain.Integer
//           })
//         }
//       }
//       return hole()
//     }
//   }
//   return hole()
// }
// //The position change only for a MoveCommand (MoveForward or MoveBack)
// //We want to: Mutable Reference instead of a Mutable Value
// //A Ref can be created from a value
// //Creation of a mutable state is an Effect
// //We can set a Ref, to mutate it
// //Question: Ref is like a mini MAP with one value,
// //its safer to mutate because we need to use set?

// //Question: our remote rover listen to command send by the user (pilot)
// //rover can have single function: moveForward, moveBack etc instead of one big
// //the logic for checkingCollision is only useful for "Move" Commands

// //I need to handle the logic: reverse command if collision detected
// function processMoveCommand(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.MoveCommand
// ): T.IO<RoverDomain.CollisionDetected, RoverDomain.RoverState> {
//   const nextPosition = getNextPosition(rover, planet, command)
//   const isCollisionDetected = HS.has_(planet.obstacles, nextPosition)
//   if (isCollisionDetected) {
//     return T.fail(
//       new RoverDomain.CollisionDetected({
//         obstaclePosition: nextPosition,
//         roverPosition: rover.position
//       })
//     )
//   }
//   console.log("here2")

//   switch (command._tag) {
//     case "MoveForward": {
//       return T.succeed(moveForwardHandler(rover, planet, command))
//     }
//     case "MoveBack": {
//       return T.succeed(moveBackHandler(rover, planet, command))
//     }
//   }
// }

// function processTurnCommand(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.TurnCommand
// ): T.IO<RoverDomain.CollisionDetected, RoverDomain.RoverState> {
//   switch (command._tag) {
//     case "TurnLeft": {
//       return T.succeed(turnLeftHandler(rover, planet, command))
//     }
//     case "TurnRight": {
//       return T.succeed(turnRightHandler(rover, planet, command))
//     }
//   }
// }

// export function processSingleCommand(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.RoverCommand
// ): T.IO<RoverDomain.CollisionDetected, RoverDomain.RoverState> {
//   if (command._tag === "MoveForward" || command._tag === "MoveBack") {
//     console.log("here")
//     return processMoveCommand(rover, planet, command)
//   }
//   return processTurnCommand(rover, planet, command)
// }
// //Question: we need to return void? can't we return the latest state change?
// //we changing state

// //TODO: planet can be pass as a configuration environment
// //TODO: extract the state to a repo, interface .get / .get and makeConcrete implementation using state

// //Inversion of Control: we don't pass a mutable value, we pass an explicit reference (we use an api, like a repo)
// //in both case we pass a reference, in both case we have a global variable that can be mutate
// //but its more secure to explicit show that its a shared state

// //passing by value vs by reference
// //- We avoid passing mutable values, yes we use .copy, but someone can forget to use it
// //  and mutate the value. Also it can be pass in other functions.. that can mutate it
// //- Instead, we are passing an explicit Reference (pointer) that has an effect api
// //  around the mutation, cuz a mutation of a state is a side effect.
// //Its one way to deal with State in our program
// //The alternative is to use Monad Transformer to get to a State Monad.. but its extremelly verbose in TS
// //Making this mutable state into its own environment Effect just With Tag + utility around Service Creation and Layers
// //its a way to lift the State at the top, so our program can share safely access and share that piece of state
// //its like a mini inMemory DB
// export function processBatchCommandsV0(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   commands: RoverDomain.RoverCommand[]
// ): T.IO<RoverDomain.CollisionDetected, RoverDomain.RoverState> {
//   const c1 = pipe(
//     commands,
//     T.reduce(rover, (cumState, command) => {
//       console.log("cumState", cumState)
//       return processSingleCommand(cumState, planet, command)
//     })
//   )
//   console.log("c1", c1)
//   return c1
// }

// export function moveForwardHandler(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.MoveForward
// ): RoverDomain.RoverState {
//   switch (rover.orientation._tag) {
//     case "North": {
//       return rover.copy({
//         position: rover.position.copy({
//           y: modulo(
//             addOneTo(rover.position.y),
//             planet.gridSize.height
//           ) as RoverDomain.Integer
//         })
//       })
//     }
//     case "South": {
//       return hole()
//     }
//     case "West": {
//       return hole()
//     }
//     case "East": {
//       return hole()
//     }
//   }
//   return hole()
// }

// // export function moveBack(
// //   rover: RoverDomain.RoverState,
// //   planet: RoverDomain.Planet,
// //   command: RoverDomain.MoveBack
// // ): RoverDomain.RoverState {
// //   return moveBackHandler(rover, planet, command)
// // }

// export function moveBackHandler(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.MoveBack
// ): RoverDomain.RoverState {
//   switch (rover.orientation._tag) {
//     case "North": {
//       return rover.copy({
//         position: rover.position.copy({
//           y: modulo(
//             subOneTo(rover.position.y),
//             planet.gridSize.height
//           ) as RoverDomain.Integer
//         })
//       })
//     }
//     case "South": {
//       return hole()
//     }
//     case "West": {
//       return hole()
//     }
//     case "East": {
//       return hole()
//     }
//   }
//   return hole()
// }

// export function turnLeft(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.TurnLeft
// ): RoverDomain.RoverState {
//   return turnLeftHandler(rover, planet, command)
// }
// export function turnLeftHandler(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.TurnLeft
// ): RoverDomain.RoverState {
//   switch (rover.orientation._tag) {
//     case "North": {
//       return hole()
//     }
//     case "South": {
//       return hole()
//     }
//     case "West": {
//       return hole()
//     }
//     case "East": {
//       return hole()
//     }
//   }
//   return hole()
// }
// export function turnRight(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.TurnRight
// ): RoverDomain.RoverState {
//   return turnRightHandler(rover, planet, command)
// }
// export function turnRightHandler(
//   rover: RoverDomain.RoverState,
//   planet: RoverDomain.Planet,
//   command: RoverDomain.TurnRight
// ): RoverDomain.RoverState {
//   switch (rover.orientation._tag) {
//     case "North": {
//       return hole()
//     }
//     case "South": {
//       return hole()
//     }
//     case "West": {
//       return hole()
//     }
//     case "East": {
//       return hole()
//     }
//   }
//   return hole()
// }

// //STEP 3:
// //Represent an Obstacle, so the Position
// export class Obstacle extends Tagged("Obstacle")<{
//   readonly position: RoverDomain.Position
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

// const planet = new RoverDomain.Planet({
//   gridSize: new RoverDomain.PlanetGridSize({
//     width: 10 as RoverDomain.Integer,
//     height: 10 as RoverDomain.Integer
//   }),
//   obstacles: pipe(HS.make<RoverDomain.Position>())
// })
// export const roverState = new RoverDomain.RoverState({
//   position: new RoverDomain.Position({
//     x: 0 as RoverDomain.Integer,
//     y: 0 as RoverDomain.Integer
//   }),
//   orientation: new RoverDomain.North()
// })
// export const roverState2 = new RoverDomain.RoverState({
//   position: new RoverDomain.Position({
//     x: 0 as RoverDomain.Integer,
//     y: 1 as RoverDomain.Integer
//   }),
//   orientation: new RoverDomain.North()
// })

// export const command1 = new RoverDomain.MoveForward()
// export const command2 = new RoverDomain.MoveForward()
// export const command3 = new RoverDomain.MoveBack()
// export const command4 = new RoverDomain.MoveBack()

// export const commands = [command1, command2, command3, command4]
// //When
// export const res = T.runPromise(processBatchCommandsV0(roverState, planet, commands))
// res.then((v) => console.log("v", v))

// export const resEx = T.runPromiseExit(
//   processBatchCommandsV0(roverState, planet, commands)
// )
// //Question how to unwrap?
// console.log(resEx.then())
