//STEP 5: REPO for our state (inversion of control)
//Question: using class and union type to define multiple concrete implementation?
//Question if that Repo use a concrete implementation DB that can have error? or the connection would be handle within a Managed?
//Question: create can be extracted to a Managed? We need to connect to the resource?

import type { _A } from "../../common/effect-utils"
import { L, Ref, T, tag } from "../../common/effect-utils"
import type { RoverState } from "../models/Rover"

//Version pipe able for set too?
export const makeLiveRoverRepo = T.succeedWith(() => ({
  create: (roverInitialState: RoverState) => T.succeed(Ref.makeRef(roverInitialState)),
  get: (roverCurrentRef: Ref.Ref<RoverState>) => T.succeed(Ref.get(roverCurrentRef)),
  set: (roverCurrentRef: Ref.Ref<RoverState>, stateValue: RoverState) =>
    T.succeed(Ref.set_(roverCurrentRef, stateValue))
}))
export interface RoverRepo extends _A<typeof makeLiveRoverRepo> {}

export const RoverRepo = tag<RoverRepo>()

//utilities to use in our program, they require the Repo
export const { create, get, set } = T.deriveLifted(RoverRepo)(
  ["create", "get", "set"],
  [],
  []
)

export const LiveRoverRepo = L.fromEffect(RoverRepo)(makeLiveRoverRepo)
