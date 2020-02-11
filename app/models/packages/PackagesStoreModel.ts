import { types, Instance, SnapshotOut, getRoot } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { PackageData, PackageStatusAPI } from "../../screens/packagesList/types"

export const PackagesStoreModel = types
  .model("packages")
  .props({
    packages: types.optional(types.frozen<PackageData[]>(), [])
  })
  .views(self => ({}))
  .extend(withEnvironment)
  .actions(self => ({
    setPackages(packages) {
      self.packages = packages
    },
    setId(id){
      self.packages[0].id = id
    }
  }))
  .actions(self => ({
    async getAllPackages() {
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
  .actions(self => ({
    async updatePackagesStatus(packages: string[], status: PackageStatusAPI) {
      const rootStore = getRoot(self)
      // @ts-ignore
      const userId = rootStore.profileModel.profile.id
      const response = await self.environment.api.updatePackagesStatus(packages, userId, status)
      if (response.ok) {
        await self.getAllPackages()
      }
      return response
    }
  }))

type packageStoreType = Instance<typeof PackagesStoreModel>
export interface PackageStore extends packageStoreType {}
type packageStoreSnapshotType = SnapshotOut<typeof PackagesStoreModel>
export interface PackageSnapshot extends packageStoreSnapshotType {}
