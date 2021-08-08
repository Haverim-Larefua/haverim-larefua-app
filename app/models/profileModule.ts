import { types, getRoot } from "mobx-state-tree"
import { withEnvironment } from "./extensions"
import { getFcmTokenFlow } from "../utils/firebaseUtils"

export const profileModel = types
  .model("profile")
  .props({
    token: types.optional(types.string, ""),
    profile: types.frozen(),
    autoLogin: false
  })
  .extend(withEnvironment)
  .views(self => ({}))
  .actions(self => ({
    setProfile(profile) {
      self.profile = profile
    },
    setToken(token, savePass: boolean) {
      self.token = token
      self.autoLogin = savePass
    },
  }))
  .actions(self => ({
    async setPushToken() {
      const firebaseToken = await getFcmTokenFlow()
      if (firebaseToken) {
        await self.environment.api.updatePushToken(self.profile.id, firebaseToken)
      }
    }
  }))
  .actions(self => ({
    async login(user: string, pass: string, savePass: boolean) {
      const response = await self.environment.api.login(user, pass);
      if (response.ok) {
        self.environment.api.setTokenHeader(response.data.token);
        self.setProfile(response.data.user);
        self.setToken(response.data.token, savePass);
        await self.setPushToken();
        const root = getRoot(self);
        // @ts-ignore
        const packagesResponse = await root.packagesStore.getAllPackages();
        return packagesResponse
      }
      return response;
    },
    async silentLogin() {
      self.environment.api.setTokenHeader(self.token);
      await self.setPushToken();
      const root = getRoot(self);
      // @ts-ignore
      const packagesResponse = await root.packagesStore.getAllPackages();
      return packagesResponse
    },
  }))
  .actions(self => ({
    async resetPassword(password: string) {
      const response =  await self.environment.api.resetPassword(self.profile.id, password);
      if(response.ok) {
        self.profile.new = false;
        self.setProfile({...self.profile});
      }
      return response;
    }
  }))
  .actions(self => ({
    async forgotPassword(phoneNumber: string) {
      const response = await self.environment.api.forgotPassword(phoneNumber);
      if (response.ok) {
        self.setProfile(response.data.user);
      }
      return response;
    }
  }))
