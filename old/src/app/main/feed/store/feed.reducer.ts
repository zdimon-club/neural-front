
import { FeedState, Feed, default_state } from './feed.store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as Actions from './feed.action';


export const adapter: EntityAdapter<Feed> = createEntityAdapter<Feed>({

});

export const initialState: FeedState = adapter.getInitialState({
  ids: [],
  results: {},
  results_list: [],
  is_loading: false
});


export function FeedReducer(state = initialState, action: Actions.ActionsUnion) {

  switch (action.type) {

    case Actions.ActionTypes.LoadMyFeedDone:
    return adapter.addMany(action.payload.results_list, {...initialState});
    // return {
    //   // ...state,
    //   // ids: action.payload.ids,
    //   // results: action.payload.results,
    //   adapter.addMany(action.payload.results_list)
    // };

    // case Actions.ActionTypes.AddCommentDone:
    // const newfeed = {}
    // newfeed[action.payload.feed] = state.results[action.payload.feed];
    // newfeed[action.payload.feed].feedcomment.push(action.payload);

    // return {
    //   ...state,
    //   results: Object.assign({}, state.results, newfeed)
    // };

    case Actions.ActionTypes.GetFeedDone:
        // console.log(action.payload)
        return adapter.upsertOne(action.payload, state);

    case Actions.ActionTypes.AddCommentDone:
      const feed_with_new_comment = state.entities[action.payload.feed];
      feed_with_new_comment.feedcomment.push(action.payload);
      return adapter.upsertOne(feed_with_new_comment, state);

    case Actions.ActionTypes.AddLikeDone:
      return adapter.upsertOne(action.payload, state);


    default:
      return state;
  }
}
