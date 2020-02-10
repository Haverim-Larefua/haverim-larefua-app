import { types, getRoot } from "mobx-state-tree"
import { withEnvironment } from "./extensions"

export const profileModel = types
  .model("profile")
  .props({
    token: types.optional(types.string, ""),
    profile: types.frozen(),
  })
  .extend(withEnvironment)
  .views(self => ({}))
  .actions(self => ({
    setProfile(profile) {
      self.profile = profile
    },
    setToken(token) {
      self.token = token
    },
  }))
  .actions(self => ({
    async login(user: string, pass: string) {
      const response = await self.environment.api.login(user, pass)
      if (response.ok) {
        self.environment.api.setTokenHeader(response.data.token)
        self.setProfile(response.data.user)
        self.setToken(response.data.token)
        const root = getRoot(self)
        // @ts-ignore
        const packagesResponse = await root.packagesStore.getPackagesWithStatusReady()
        return packagesResponse
      }
      return response
    }
  }))
