import {actionCreator} from 'aurelia-redux-connect';
import {UPDATE_RECENT_TRADES} from '../detail.action-types';

@actionCreator()
export class UpdateRecentTradesActionCreator {
    create(trades, replace = false) {
        return {
            type: UPDATE_RECENT_TRADES,
            payload: {
                replace,
                trades
            }
        };
    }
}
