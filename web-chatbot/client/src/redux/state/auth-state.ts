export interface AuthState {
  encryptedPk: string;
  fetching: "none" | "done"
}