import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
import { PackagesStoreModel } from "../packages/PackagesStoreModel"
import { profileModel } from "../profileModule"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  packagesStore: types.optional(PackagesStoreModel, { packagesByUser: [] }),
  profileModel: types.optional(profileModel, { token: '', profile: {} })
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
