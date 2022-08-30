import { pipe, T } from "./contexts/common/effect-utils"
import { processSingleCommand } from "./contexts/rover-context/processors.ts/singleCommand"
import { RoverContextDependency } from "./contexts/rover-context/RoverContext4"

const mainProgram = processSingleCommand

const AppDependencies = RoverContextDependency
const result = pipe(mainProgram, T.provideSomeLayer(AppDependencies), T.run)
