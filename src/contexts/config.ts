import { Chunk } from "@effect-ts/core"
import { Arr } from "@effect-ts/core/Collections/Immutable/Chunk"

import { HS, pipe, T } from "./common/effect-utils"
import type { Integer } from "./common/Integer"
import { Obstacle } from "./obstacle-context/models/Obstacle"
import { ObstaclePosition } from "./obstacle-context/models/ObstaclePosition"
import { PlanetGridSize } from "./planet-context/models/PlanetGridSize"
import { RoverPosition } from "./rover-context/models/RoverPosition"

//Planet Config: Live and Test
export const gridSize10x10 = new PlanetGridSize({
  width: 10 as Integer,
  height: 10 as Integer
})

//Obstacle Config: Live and Test
export const obstaclePosition0x4 = new ObstaclePosition({
  x: 0 as Integer,
  y: 4 as Integer
})

export const obstaclePosition0x6 = new ObstaclePosition({
  x: 0 as Integer,
  y: 6 as Integer
})

export const o0x4 = new Obstacle({
  position: obstaclePosition0x4
})

export const o0x6 = new Obstacle({
  position: obstaclePosition0x6
})

export const addOneObstacle = (obstacle: Obstacle) => HS.add(obstacle)
export const addMultipleObstacle = (...obstacles: readonly Obstacle[]) => {
  return (self: HS.HashSet<Obstacle>) => obstacles.forEach((o) => pipe(self, HS.add(o)))
}

export const addMultipleObstacle2 = (...obstacles: readonly Obstacle[]) => {
  return (self: HS.HashSet<Obstacle>) => obstacles.forEach((o) => pipe(self, HS.add(o)))
}

export const obstaclesHash = pipe(HS.make<Obstacle>(), addOneObstacle(o0x4))
export const obstaclesHash2 = pipe(HS.make<Obstacle>(), addMultipleObstacle(o0x4, o0x6))

//Rover Config: Live and Test
export const zeroZeroPosition = new RoverPosition({
  x: 0 as Integer,
  y: 0 as Integer
})
