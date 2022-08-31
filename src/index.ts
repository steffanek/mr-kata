import { pipe, T } from "./contexts/common/effect-utils"
// import { RoverCommands } from "./contexts/rover-context/commands/Command"
import { getRoverState } from "./contexts/rover-context/processors.ts/getRoverState"
// import { processSingleCommand } from "./contexts/rover-context/processors.ts/singleCommand"
import { RoverContextDependency } from "./contexts/rover-context/RoverContext4"

// const command1 = RoverCommands.Move.Forward
console.log("start")
// const program1 = processSingleCommand
const AppDependencies = RoverContextDependency
// const programWithDeps = pipe(
//   program1(command1),
//   T.chain((x) => getRoverState()),
//   T.chain((roverState) => T.succeedWith(() => console.log(roverState))),
//   T.provideSomeLayer(AppDependencies)
// )
const programWithDeps2 = pipe(
  getRoverState(),
  //   T.chain((roverState) => T.succeedWith(() => console.log(roverState))),
  T.provideSomeLayer(AppDependencies)
)
//Promise void?
T.runPromise(programWithDeps2)
