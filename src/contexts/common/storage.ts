import type * as O from "@effect-ts/core/Option"

import type { T } from "./effect-utils"

export interface KVStorage<K, V> {
  set: (k: K, v: V) => T.IO<never, void>
  get: (k: K) => T.IO<never, O.Option<V>>
}
