import { types, Instance, SnapshotOut, getRoot } from "mobx-state-tree"
import { withEnvironment } from "../extensions"

export const PackagesStoreModel = types
  .model("packages")
  .props({
    packages: types.optional(types.frozen(), [])
  })
  .views(self => ({}))
  .extend(withEnvironment)
  .actions(self => ({
    setPackages(packages) {
      self.packages = packages
    }
  }))
  .actions(self => ({
    async getPackagesWithStatusReady() {
      const rootStore = getRoot(self)
      // @ts-ignore
      const userId = rootStore.profileModel.profile.id
      const response = await self.environment.api.getPackages(userId)
      if (response.ok) {
        self.setPackages(response.data)
      }
      return response
    }
  }))

type packageStoreType = Instance<typeof PackagesStoreModel>
export interface PackageStore extends packageStoreType {}
type packageStoreSnapshotType = SnapshotOut<typeof PackagesStoreModel>
export interface PackageSnapshot extends packageStoreSnapshotType {}
