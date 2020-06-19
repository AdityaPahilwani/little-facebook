import { INSERT,FETCH } from "../actions/feed";

const initialState = {
    FEEDS:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INSERT:
      let NEWFEEDS=state.FEEDS;
      NEWFEEDS.push(action.newFeed)
      console.log(NEWFEEDS)
      return {
        ...state,
        FEEDS:NEWFEEDS
      };
    case FETCH:
        let FEED=action.FEED;
        console.log(FEED);
        return {
          ...state,
          FEEDS:FEED
        };
   
    default:
      return state;
  }
};
