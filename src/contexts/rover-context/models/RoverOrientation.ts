import { Tagged } from "@app/contexts/common/effect-utils"

export class North extends Tagged("North")<{}> {}
export class South extends Tagged("South")<{}> {}
export class West extends Tagged("West")<{}> {}
export class East extends Tagged("East")<{}> {}

export type RoverOrientation = North | South | West | East

export const RoverOrientation = {
  North: new North(),
  South: new South(),
  East: new East(),
  West: new West()
}
