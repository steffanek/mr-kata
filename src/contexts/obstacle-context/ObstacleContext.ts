import type { _A } from "../common/effect-utils"
import { L, T, tag } from "../common/effect-utils"
import { obstaclesHash } from "../config"

//This Context should represent a concrete implementation as an Effect, with Dependency, Error and Result Expected
//State initial: Yes (hard coded)
//State can change: No (it's fixed)
//Dependency: No

export const makeObstacleContext = T.succeedWith(() => obstaclesHash)

export interface ObstacleContext extends _A<typeof makeObstacleContext> {}

export const ObstacleContext = tag<ObstacleContext>()

export const LiveObstacleContext = L.fromEffect(ObstacleContext)(makeObstacleContext)

export const ObstacleContextDependency = LiveObstacleContext
