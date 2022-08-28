import { Tagged } from "@app/contexts/common/effect-utils"
import type { Integer } from "@app/contexts/common/Integer"

export class RoverPosition extends Tagged("RoverPosition")<{
  readonly x: Integer
  readonly y: Integer
}> {}
