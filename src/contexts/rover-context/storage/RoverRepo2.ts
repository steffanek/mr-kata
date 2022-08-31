// import { HM, L, T, tag } from "@app/contexts/common/effect-utils"
// import type { KVStorage } from "@app/contexts/common/storage"

// import type { RoverState } from "../models/Rover"
// import type { RoverId } from "../models/RoverId"

// export interface RoverRepo2 extends KVStorage<RoverId["id"], RoverState> {}

// export const RoverRepo2 = tag<RoverRepo2>()

// export const makeRoverRepo2 = T.succeedWith(() => ({
//   set: (roverId: RoverId["id"], value: RoverState) =>
//     T.succeedWith(() => HM.set(roverId, value)),
//   get: (roverId: RoverId["id"]) => T.succeedWith(() => HM.get(roverId))
// }))
// //Question 1: I'm confuse with types.. I'm struggling on how I can make it work
// export const LiveRoverRepo2 = L.fromEffect(RoverRepo2)(makeRoverRepo2)

// export const LiveRoverRepoDependency = LiveRoverRepo2
