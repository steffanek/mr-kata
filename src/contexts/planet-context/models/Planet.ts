import type { Obstacle } from "@app/contexts/obstacle-context/models/Obstacle"

import type { HS } from "../../common/effect-utils"
import { Tagged } from "../../common/effect-utils"
import type { PlanetGridSize } from "./PlanetGridSize"

export class Planet extends Tagged("Planet")<{
  readonly gridSize: PlanetGridSize
  readonly obstacles: HS.HashSet<Obstacle>
}> {}

export function makePlanet(
  gridSize: PlanetGridSize,
  obstacles: HS.HashSet<Obstacle>
): Planet {
  return new Planet({
    gridSize,
    obstacles
  })
}

//I need to combine existing obstacle array (initial state) with the new one...
//Question: does that mean, Obstacle is belonging to the Planet Context? What if Obstacle are present on another Context?
//Strategy: Product Type (obstacle, obstacle) -> (0x0, 0x0) -> (OxO)
//existing array = [0x4, 0x6, 0x8]
//new array = [0x4, 0x5]
//Combined array = ((((0x4, 0x4), 0x6), 0x5) 0x8)
//Result Combined array = [0x4 from exist, 0x5 from new, 0x6 from exit, 0x8 from exist]

// export function addObstacles(...obstacles: readonly Obstacle[]) {
//   return (self: Planet) =>
//     new Planet(
//       self.gridSize,
//       pipe(
//         obstacles,
//         A.reduce(self.obstacles, (s, p) => s.add(hashPosition(scale(self)(p))))
//       )
//     )
// }
