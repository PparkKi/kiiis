const defaultState = {
  userData: null,
  cafeData: null,
  searchData: null,
  boardData: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case "user":
      return {
        ...state,
        userData: action.data,
      };
    case "cafe":
      return {
        ...state,
        cafeData: action.data,
      };
    case "search":
      return {
        ...state,
        searchData: action.data,
      };
    case "board":
      return {
        ...state,
        boardData: action.data,
      };
    default:
      return state;
  }
}
