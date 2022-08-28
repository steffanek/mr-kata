import { HM, L, T, tag } from "@app/contexts/common/effect-utils"
import type { KVStorage } from "@app/contexts/common/storage"

import type { RoverState } from "../models/Rover"
import type { RoverId } from "../models/RoverId"

export interface RoverRepo2 extends KVStorage<RoverId, RoverState> {}

export const RoverRepo2 = tag<RoverRepo2>()

export const makeRoverRepo2 = T.succeedWith(() => ({
  set: (roverId: RoverId, value: RoverState) =>
    T.succeedWith(() => HM.set(roverId.id, value)),
  get: (roverId: RoverId) => T.succeedWith(() => HM.get(roverId.id))
}))
//Question: I have some issues to get the value..
export const LiveRoverRepo2 = L.fromEffect(RoverRepo2)(makeRoverRepo2)

export const LiveRoverRepoDependency = LiveRoverRepo2
