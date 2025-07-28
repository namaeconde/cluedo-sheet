import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { STORAGE_KEY } from "./types";


const storage = createJSONStorage(() => sessionStorage);
export const isInProgressAtom = atomWithStorage(STORAGE_KEY.IS_IN_PROGRESS, false, storage);
export const playersAtom = atomWithStorage(STORAGE_KEY.PLAYERS, [], storage);
export const whoGridItemsAtoms = atomWithStorage(STORAGE_KEY.WHO_ITEMS, null, storage);
export const whatGridItemsAtoms = atomWithStorage(STORAGE_KEY.WHAT_ITEMS, null, storage);
export const whereGridItemsAtoms = atomWithStorage(STORAGE_KEY.WHERE_ITEMS, null, storage);
