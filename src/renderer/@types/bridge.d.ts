import { process } from "../../main/preload"

declare global {
  interface Window {
    Main: typeof process
  }
}
