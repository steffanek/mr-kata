import { Tagged } from "@app/contexts/common/effect-utils"
import type { Integer } from "@app/contexts/common/Integer"

export class PlanetGridSize extends Tagged("PlanetGridSize")<{
  readonly width: Integer
  readonly height: Integer
}> {}
