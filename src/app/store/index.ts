
export function counterReducer(state = {}, action: {type, payload}) {
  console.log(action);
  console.log(window.location);
  switch (action.type) {
    case 'SET_BANNERLIST':
      return action.payload;
    case 'GET_BANNERLIST':
      return state;
  }
}
