


const initialState = {
  videogames: [],
  origin:[],

  genres: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_GAMES":
      return {
        ...state,
        videogames: action.payload,
        origin: action.payload
      };
      
    default:
        return state
  }
}

export default rootReducer;
