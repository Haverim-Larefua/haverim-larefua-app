import { getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { PackageData, PackageStatus, PackageStatusAPI } from "../../screens/packagesList/types"

export const PackagesStoreModel = types
  .model("packages")
  .props({
    packages: types.optional(types.frozen<PackageData[]>(), [])
  })
  .views(self => {
    return {
      get deliveredPackages() {
        return self.packages.filter(p => PackageStatusAPI[p.parcelTrackingStatus] === PackageStatusAPI.delivered)
      },
      get inDistribution() {
        return self.packages.filter(p => PackageStatusAPI[p.parcelTrackingStatus] === PackageStatusAPI.distribution)
      },
      get readyToPickUp() {
        return self.packages.filter(p => PackageStatusAPI[p.parcelTrackingStatus] === PackageStatusAPI.ready)
      },
    }
  })
  .extend(withEnvironment)
  .actions(self => ({
    setPackages(packages) {
      self.packages = packages
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
  .actions(self => ({
    async addSignature(packageId: string, signature: string) {
      const rootStore = getRoot(self)
      // @ts-ignore
      const userId = rootStore.profileModel.profile.id
      const response = await self.environment.api.addSignatureToPackage(packageId, userId, signature)
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
