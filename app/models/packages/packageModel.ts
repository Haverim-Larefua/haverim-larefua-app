import { types, Instance, SnapshotOut } from "mobx-state-tree"

export const packageModel = types
  .model("package")
  .props({
    id: types.frozen(),
    done: false,
    name: types.optional(types.string, "a"),
    category: types.maybe(types.string),
  })
  .views(self => ({}))
  .actions(self => ({
    setName(newName) {
      self.name = newName
    },
    toggle() {
      self.done = !self.done
    }
  }))

type packageType = Instance<typeof packageModel>
export interface Package extends packageType {}
type packageSnapshotType = SnapshotOut<typeof packageModel>
export interface PackageSnapshot extends packageSnapshotType {}
