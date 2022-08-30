import { Tagged } from "@app/contexts/common/effect-utils"

import type { RoverId } from "../models/RoverId"

export class RoverStateNotFound extends Tagged("RoverStateNotFound")<{
  readonly roverId: RoverId["id"]
}> {}

export function makeRoverStateNotFound(roverId: RoverId["id"]): RoverStateNotFound {
  return new RoverStateNotFound({
    roverId
  })
}
