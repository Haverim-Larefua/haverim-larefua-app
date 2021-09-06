import { getRoot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions"
import { PackageData, PackageStatusAPI } from "../../screens/packagesList/types"

export const PackagesStoreModel = types
           .model('packages')
           .props({
               packagesByUser: types.optional(types.frozen<PackageData[]>(), []),
               allPackages: types.optional(types.frozen<PackageData[]>(), [])
           })
           .views(self => {
               return {
                   get deliveredPackages() {
                       return self.packagesByUser.filter(
                           p =>
                               PackageStatusAPI[p.parcelTrackingStatus] ===
                               PackageStatusAPI.delivered
                       );
                   },
                   get inDistribution() {
                       return self.packagesByUser.filter(
                           p =>
                               PackageStatusAPI[p.parcelTrackingStatus] ===
                               PackageStatusAPI.distribution
                       );
                   },
                   get readyToPickUp() {
                       return self.packagesByUser.filter(
                           p =>
                               PackageStatusAPI[p.parcelTrackingStatus] ===
                               PackageStatusAPI.assigned
                       );
                   },
                   get needDelivery() {
                       return self.allPackages.filter(({ needDelivery})=> Boolean(needDelivery));
                   }
               };
           })
           .extend(withEnvironment)
           .actions(self => ({
               setPackagesByUser(packages) {
                   self.packagesByUser = packages;
               }
           }))
           .actions(self => ({
               setAllPackages(packages) {
                   self.allPackages = packages;
               }
           }))
           .actions(self => ({
               async getAllPackages() {
                   const rootStore = getRoot(self);
                   // @ts-ignore
                   const userId = rootStore.profileModel.profile.id;
                   const response = await self.environment.api.getPackagesByUser(userId);
                   if (response.ok) {
                       self.setPackagesByUser(response.data);
                   }
                   const response2 = await self.environment.api.getNeedDeliveryPackages(userId);
                   if (response.ok) {
                       self.setAllPackages(response2.data);
                   }
                   return response;
               }
           }))
           .actions(self => ({
               async updatePackagesStatus(packages: string[], status: PackageStatusAPI) {
                   const rootStore = getRoot(self);
                   // @ts-ignore
                   const userId = rootStore.profileModel.profile.id;
                   const response = await self.environment.api.updatePackagesStatus(
                       packages,
                       userId,
                       status
                   );
                   if (response.ok) {
                       await self.getAllPackages();
                   }
                   return response;
               }
           }))
           .actions(self => ({
               async addSignature(packageId: string, signature: string, notes: string) {
                   const rootStore = getRoot(self);
                   // @ts-ignore
                   const userId = rootStore.profileModel.profile.id;
                   const response = await self.environment.api.addSignatureToPackage(
                       packageId,
                       userId,
                       signature,
                       notes
                   );
                   if (response.ok) {
                       await self.getAllPackages();
                   }
                   return response;
               }
           }))
           .actions(self => ({
               async reportProblem(packageId: string, problem: string) {
                   const rootStore = getRoot(self);
                   // @ts-ignore
                   const userId = rootStore.profileModel.profile.id;
                   const response = await self.environment.api.reportPackageProblem(
                       packageId,
                       userId,
                       problem
                   );
                   if (response.ok) {
                       await self.getAllPackages();
                   }
                   return response;
               }
           }));

type packageStoreType = Instance<typeof PackagesStoreModel>
export interface PackageStore extends packageStoreType {}
type packageStoreSnapshotType = SnapshotOut<typeof PackagesStoreModel>
export interface PackageSnapshot extends packageStoreSnapshotType {}
