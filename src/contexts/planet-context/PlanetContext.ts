import type { _A } from "../common/effect-utils"
import { HS, L, pipe, T, tag } from "../common/effect-utils"
import { gridSize10x10 } from "../config"
import { ObstacleContext } from "../obstacle-context/ObstacleContext"
import { makePlanet } from "./models/Planet"

//This Context should represent a concrete implementation as an Effect, with Dependency, Error and Result Expected
//State initial: Yes
//State can change: No (it's fixed)... Well but I should be able to access the obstacle position?
//Dependency: No

export const makePlanetContext = T.gen(function* (_) {
  //To make a planet
  //Question: ObstacleContext give me only 1 obstacle..
  //I want to have a function from the ObstacleContext, that I can add more Obstacle
  //I've attempt to make such function under "Obstacle.ts"
  const obstacles = yield* _(ObstacleContext)
  const planet = makePlanet(gridSize10x10, obstacles)
  return planet
})

export interface PlanetContext extends _A<typeof makePlanetContext> {}

export const PlanetContext = tag<PlanetContext>()

export const LivePlanetContext = L.fromEffect(PlanetContext)(makePlanetContext)

export const PlanetContextDependency = LivePlanetContext
