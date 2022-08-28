import type { Obstacle } from "@app/contexts/obstacle-context/models/Obstacle"

import { Tagged } from "../../common/effect-utils"
import type { RoverPosition } from "../models/RoverPosition"

//STEP 4: Potential ERRORS When running a use case
export class CollisionDetected extends Tagged("CollisionDetected")<{
  readonly obstacle: Obstacle
  readonly roverPosition: RoverPosition
}> {}

export function makeCollisionDetected(
  obstacle: Obstacle,
  roverPosition: RoverPosition
): CollisionDetected {
  return new CollisionDetected({
    obstacle,
    roverPosition
  })
}
