import { processSingleCommand } from "./contexts/_draft/rover-v1.0-step2"
import { pipe, T } from "./contexts/common/effect-utils"
import { LiveRoverContext } from "./contexts/rover-context/RoverContext3"

//Template to provide Layers..
const mainProgram = processSingleCommand
const result = pipe(mainProgram, T.provideSomeLayer(LiveRoverContext), T.run)
