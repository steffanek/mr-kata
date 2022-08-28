import { Tagged } from "@app/contexts/common/effect-utils"

import type { RoverOrientation } from "./RoverOrientation"
import type { RoverPosition } from "./RoverPosition"

export class RoverState extends Tagged("RoverState")<{
  readonly position: RoverPosition
  readonly orientation: RoverOrientation
}> {}

export function makeRoverState(
  position: RoverPosition,
  orientation: RoverOrientation
): RoverState {
  return new RoverState({
    position,
    orientation
  })
}
