import { SET_USER } from "./action_types"

export function setUser(payload) {
  return { type: SET_USER, payload };
}
