import { HM, L, pipe, T, tag } from "@app/contexts/common/effect-utils"
import type { KVStorage } from "@app/contexts/common/storage"
import { zeroZeroPosition } from "@app/contexts/config"

import type { RoverState } from "../models/Rover"
import { makeRoverState } from "../models/Rover"
import type { RoverId } from "../models/RoverId"
import { RoverOrientation } from "../models/RoverOrientation"

export interface RoverKVStorage extends KVStorage<RoverId["id"], RoverState> {}

//RoverRepo design using Fluent API
//Question 1: I was struggling using the Pipe API, however it might be better to use Fluent in that context?
//depend on the type of operations..
export class RoverRepo implements RoverKVStorage {
  static fromHashMap(value: HM.HashMap<RoverId["id"], RoverState>) {
    return T.succeedWith(() => new RoverRepo(value))
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

// export const makeRoverRepo = T.succeedWith(() =>
//   RoverRepo.fromHashMap(HM.make<RoverId["id"], RoverState>())
// )
export const makeRoverRepo = RoverRepo.fromHashMap(HM.make<RoverId["id"], RoverState>())

//Question 1: I'm confuse with types.. I'm struggling on how I can make it work
export const LiveRoverRepo4 = L.fromEffect(RoverRepoTag)(makeRoverRepo)

//Issue 1: the issue came from the Repo..
const p = T.gen(function* (_) {
  const repo = yield* _(RoverRepoTag)
  console.log("repo", repo)
  const rover = makeRoverState(zeroZeroPosition, RoverOrientation.North)
  const repoSet = yield* _(repo.set("1", rover))
  console.log("repoSet", repoSet)
  // const newRover = repo.get("1")
  const rover2 = makeRoverState(zeroZeroPosition, RoverOrientation.South)
  const repoSet2 = yield* _(repo.set("1", rover2))
  console.log("repoSet", repoSet2)
  const newRover = yield* _(repo.get("1"))
  console.log("newRover", newRover)

  return newRover
})

T.runPromise(pipe(p, T.provideSomeLayer(LiveRoverRepo4)))
