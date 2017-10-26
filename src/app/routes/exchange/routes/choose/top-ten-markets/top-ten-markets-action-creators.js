
import {inject} from 'aurelia-framework';
import {MarketResource} from 'app-resources';
import {UPDATE_TOP_TEN_ORDER, UPDATE_TOP_TEN_RESULTS} from "./top-ten-markets-action-types";
import {ExchangeActionCreators} from "../../../exchange-action-creators";
import {MarketToAssetPairValueConverter} from '../choose-value-converters';

@inject(MarketResource, ExchangeActionCreators, MarketToAssetPairValueConverter)
export class TopTenMarketsActionCreators {

    constructor(marketResource, exchangeActionCreators, marketToAssetPair) {
        this.marketResource = marketResource;
        this.exchangeActionCreators = exchangeActionCreators;
        this.marketToAssetPair = marketToAssetPair;
    }

    updateTopTenMarketsOrder(order) {
        return async (dispatch, getState) => {
            if (getState.exchange.choose.topTen)

            dispatch({
                type: UPDATE_TOP_TEN_ORDER,
                payload: order
            });

            await dispatch(
                this.refreshTopTenMarkets()
            );
        };
    }

    refreshTopTenMarkets() {
        return async (dispatch, getState) => {
            const markets = await this.marketResource.topTen(this.order);

            dispatch({
                type: UPDATE_TOP_TEN_RESULTS,
                payload: markets
            });
        };
    }
}