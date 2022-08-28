import { HM, L, T, tag } from "@app/contexts/common/effect-utils"
import type { KVStorage } from "@app/contexts/common/storage"

import type { RoverState } from "../models/Rover"
import type { RoverId } from "../models/RoverId"

export interface RoverKVStorage extends KVStorage<RoverId["id"], RoverState> {}

//RoverRepo design using Fluent API
//Question 1: I was struggling using the Pipe API, however it might be better to use Fluent in that context?
//depend on the type of operations..
export class RoverRepo implements RoverKVStorage {
  static fromHashMap(value: HM.HashMap<RoverId["id"], RoverState>) {
    return new RoverRepo(value)
  }
  private constructor(readonly value: HM.HashMap<RoverId["id"], RoverState>) {}
  get(roverId: RoverId["id"]) {
    return T.succeedWith(() => HM.get_(this.value, roverId))
  }
  set(roverId: RoverId["id"], newValue: RoverState) {
    return T.succeedWith(() => HM.set_(this.value, roverId, newValue))
  }
}
//Question 1: by defining a Class, I can't use the same name..
export const RoverRepoTag = tag<RoverRepo>()
// Question 1: By defining as a Class can I derive the Interface?
// export interface RoverRepo3 extends _A<typeof > {}

export const makeRoverRepo = T.succeedWith(() =>
  RoverRepo.fromHashMap(HM.make<RoverId["id"], RoverState>())
)
//Question 1: I'm confuse with types.. I'm struggling on how I can make it work
export const LiveRoverRepo2 = L.fromEffect(RoverRepoTag)(makeRoverRepo)

export const LiveRoverRepoDependency = LiveRoverRepo2
