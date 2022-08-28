import { HM, HS, pipe } from "../common/effect-utils"

//A Set is an Array with Unique Value
const emptyHashSet = HS.make<string>()
const HashSet = pipe(emptyHashSet, HS.add("test"), HS.add("test")) //it will only keep the first "test" value
const HashSet2 = pipe(emptyHashSet, HS.add("test"), HS.add("test2")) //it will only keep the first "test" value

console.log(emptyHashSet)
console.log(HashSet)
console.log(HashSet2)
console.log(HS.size(HashSet2))

//A Map is like a Dictionary, KV Storage
const emptyHashMap = HM.make<string, string>()
const HashMap = pipe(emptyHashMap, HM.set("1", "first value")) //it will only keep the first "test" value

console.log(emptyHashMap)
console.log(HashMap)
console.log("keys", HM.keys(HashMap))
console.log("values", HM.values(HashMap))
console.log(pipe(HashMap, HM.get("1")))
