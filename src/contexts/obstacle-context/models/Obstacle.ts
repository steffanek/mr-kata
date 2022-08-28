import { HS, Tagged } from "@app/contexts/common/effect-utils"

import type { ObstaclePosition } from "./ObstaclePosition"

export class Obstacle extends Tagged("Obstacle")<{
  readonly position: ObstaclePosition
}> {}

export function makeObstacle(position: ObstaclePosition): Obstacle {
  return new Obstacle({ position })
}

export const addOneObstacle = (obstacle: Obstacle) => HS.add(obstacle)

// export function makeObstaclesHashSet(...obstacles: Obstacle[]) {
//   return pipe(
//     HS.make<Obstacle>(),
//     HS.reduce(identity, (identity, o) => HS.add(obstacles))
//   )
// }
