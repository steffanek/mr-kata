import { HS, pipe, T } from "./common/effect-utils"
import type { Integer } from "./common/Integer"
import {
  addMultipleObstacle,
  addOneObstacle,
  Obstacle
} from "./obstacle-context/models/Obstacle"
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

export const obstaclesHash = pipe(HS.make<Obstacle>(), addOneObstacle(o0x4))
export const obstaclesHash2 = pipe(HS.make<Obstacle>(), addMultipleObstacle(o0x4, o0x6))

//Rover Config: Live and Test
export const zeroZeroPosition = new RoverPosition({
  x: 0 as Integer,
  y: 0 as Integer
})
