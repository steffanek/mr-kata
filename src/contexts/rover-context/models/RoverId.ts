// import type { Ref } from "@app/contexts/common/effect-utils"
import { Tagged } from "@app/contexts/common/effect-utils"

// import type { RoverState } from "./Rover"

export class RoverId extends Tagged("RoverId")<{
  readonly id: string
}> {}

export function makeRoverId(id: string): RoverId {
  return new RoverId({
    id
  })
}

// export class RoverId extends Tagged("RoverId")<{
//   readonly id: Ref.Ref<RoverState>
// }> {}

// export function makeRoverId(id: Ref.Ref<RoverState>): RoverId {
//   return new RoverId({
//     id
//   })
// }
