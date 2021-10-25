import { Platform } from "react-native"
import { API_URL } from "react-native-dotenv"


/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */ 
 export const DEFAULT_API_CONFIG: ApiConfig = { 
  // url: "http://localhost:3001" || "https://jsonplaceholder.typicode.com",
  //url: "http://localhost:3001",
 //  url: "http://10.0.2.2",
 url: API_URL || "http://10.0.2.2",
   timeout: 10000,
}
