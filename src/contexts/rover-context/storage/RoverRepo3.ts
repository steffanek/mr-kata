//STEP 5: REPO for our state (inversion of control)
//Question: using class and union type to define multiple concrete implementation?
//Question if that Repo use a concrete implementation DB that can have error? or the connection would be handle within a Managed?
//Question: create can be extracted to a Managed? We need to connect to the resource?

import type { _A } from "../../common/effect-utils"
import { HM, L, T, tag } from "../../common/effect-utils"
import type { RoverState } from "../models/Rover"
import type { RoverId } from "../models/RoverId"

export const makeLiveRoverRepo3 = T.succeedWith(() => ({
  make: () => T.succeedWith(() => HM.make<RoverId["id"], RoverState>()),
  set:
    (roverId: RoverId["id"], value: RoverState) =>
    (self: HM.HashMap<RoverId["id"], RoverState>) =>
      T.succeedWith(() => HM.set(roverId, value)),
  get: (roverId: RoverId["id"]) => (self: HM.HashMap<RoverId["id"], RoverState>) =>
    T.succeedWith(() => HM.get(roverId))
}))

export interface RoverRepo3 extends _A<typeof makeLiveRoverRepo3> {}

export const RoverRepo3 = tag<RoverRepo3>()

//utilities to use in our program, they require the Repo
export const { get, make, set } = T.deriveLifted(RoverRepo3)(
  ["make", "set", "get"],
  [],
  []
)

export const LiveRoverRepo3 = L.fromEffect(RoverRepo3)(makeLiveRoverRepo3)
