import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => sessionStorage);
export const isInProgressAtom = atomWithStorage('is-in-progress', false, storage);
export const playersAtom = atomWithStorage('players', [], storage);
export const whoGridItemsAtoms = atomWithStorage('who-items', null, storage);
export const whatGridItemsAtoms = atomWithStorage('what-items', null, storage);
export const whereGridItemsAtoms = atomWithStorage('where-items', null, storage);
