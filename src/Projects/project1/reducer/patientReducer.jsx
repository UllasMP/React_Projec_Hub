export const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FILTER: "FILTER",
  RESET_FILTER: "RESET_FILTER",
};

export function patientReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload];
    case ACTIONS.UPDATE:
      return state.map((p) => (p.id === action.payload.id ? action.payload : p));
    case ACTIONS.DELETE:
      return state.filter((p) => p.id !== action.payload);
    case ACTIONS.FILTER:
      return state.filter((p) =>
        p.priority.toLowerCase().includes(action.payload.toLowerCase())
      );
    case ACTIONS.RESET_FILTER:
      return action.payload;
    default:
      return state;
  }
}
