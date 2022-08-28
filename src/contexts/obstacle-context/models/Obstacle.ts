import { HS, Tagged } from "@app/contexts/common/effect-utils"

import type { ObstaclePosition } from "./ObstaclePosition"

export class Obstacle extends Tagged("Obstacle")<{
  readonly position: ObstaclePosition
}> {}

export function makeObstacle(position: ObstaclePosition): Obstacle {
  return new Obstacle({ position })
}

export const addOneObstacle = (obstacle: Obstacle) => HS.add(obstacle)

export const addMultipleObstacle = (...obstacles: readonly Obstacle[]) => {
  return (self: HS.HashSet<Obstacle>) => obstacles.forEach((o) => pipe(self, HS.add(o)))
}

export const addMultipleObstacle2 = (...obstacles: readonly Obstacle[]) => {
  return (self: HS.HashSet<Obstacle>) => obstacles.forEach((o) => pipe(self, HS.add(o)))
}
