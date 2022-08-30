import type { Obstacle } from "@app/contexts/obstacle-context/models/Obstacle"

import { Tagged } from "../../common/effect-utils"
import type { RoverPosition } from "../models/RoverPosition"

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
