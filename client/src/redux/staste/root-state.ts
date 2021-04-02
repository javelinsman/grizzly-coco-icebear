import { useSelector } from "react-redux";
import { AssertsIdentifierTypePredicate } from "typescript";

export interface RootState {}

export function useRootSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector);
}
