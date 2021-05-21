import { useSelector } from "react-redux";
import { AssertsIdentifierTypePredicate } from "typescript";

export interface ItemEntry {
  date: string,
  mclass: string,
  record: any,
  patientId: string,
}

export interface ObgyState {
  혈압?: ItemEntry[],
  혈당?: ItemEntry[],
  체중?: ItemEntry[],
  운동?: ItemEntry[],
  Dialogue?: ItemEntry[]
  
} 

export interface RootState {

}

export function useRootSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector);
}
