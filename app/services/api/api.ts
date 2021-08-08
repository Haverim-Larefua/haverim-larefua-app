import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { PackageStatusAPI } from "../../screens/packagesList/types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  setTokenHeader(token) {
    this.apisauce.setHeader('Authorization', `Bearer ${token}`);
  }

  async login(username: string, password: string): Promise<ApiResponse<Types.IAuthUserResponse>> {
    const response: ApiResponse<Types.IAuthUserResponse> = await this.apisauce.post(`/auth/user`, { username, password });
    return response;
  }

  async updatePushToken(userId: string, token: string): Promise<ApiResponse<any>> {
    const response: ApiResponse<any> = await this.apisauce.put(`/push-token/update/${userId}`, { token });
    return response;
  }

  async getPackages(userId: string): Promise<ApiResponse<any>> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const response: ApiResponse<any> = await this.apisauce.get(`parcels/user/${userId}`, { last_statuses: 'assigned,distribution,delivered' });
    return response;
  }

  async updatePackagesStatus(packages: string[], userId: string, newStatus: PackageStatusAPI): Promise<ApiResponse<any>> {
    const response: ApiResponse<any> = await this.apisauce.put(`parcels/user/${userId}/${newStatus}`, { parcels: packages });
    return response;
  }

  async addSignatureToPackage(parcelId: string, userId: string, signature: string, notes: string): Promise<ApiResponse<any>> {
    const response: ApiResponse<any> = await this.apisauce.put(`parcels/${parcelId}/signature/${userId}`, { signature, comment: notes });
    return response;
  }

  async reportPackageProblem(parcelId: string, userId: string, problem: string): Promise<ApiResponse<any>> {
    const response: ApiResponse<any> = await this.apisauce.put(`parcels/${parcelId}/exception`, { exception: problem });
    return response;
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data;
      const resultUsers: Types.User[] = rawUsers.map(convertUser);
      return { kind: "ok", users: resultUsers };
    } catch {
      return { kind: "bad-data" };
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async resetPassword(id: string, password: string): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.put(`/users/${id}/resetPassword`, { password });

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    return response;
  }

  async forgotPassword(phoneNumber: string): Promise<ApiResponse<any>> {
    debugger;
    return await this.apisauce.put(`/auth/forgotPassword`, { phoneNumber });
  }
}
