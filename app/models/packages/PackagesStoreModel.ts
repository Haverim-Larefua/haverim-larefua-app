import { types, Instance, SnapshotOut } from "mobx-state-tree"
import { packageModel } from "./packageModel"
import { withEnvironment } from "../extensions"

export const PackagesStoreModel = types
  .model("packages")
  .props({
    packages: types.optional(types.array(packageModel), [{id: '5', done: false}])
  })
  .views(self => ({}))
  .extend(withEnvironment)
  .actions(self => ({
    setName(newName) {
      //
    },
  }))

type packageStoreType = Instance<typeof PackagesStoreModel>
export interface PackageStore extends packageStoreType {}
type packageStoreSnapshotType = SnapshotOut<typeof PackagesStoreModel>
export interface PackageSnapshot extends packageStoreSnapshotType {}
