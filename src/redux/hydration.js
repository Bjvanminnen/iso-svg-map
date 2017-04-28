export const HYDRATE = 'utils/hydrate';
export function hydrate(state) {
  return {
    type: HYDRATE,
    state
  };
}
