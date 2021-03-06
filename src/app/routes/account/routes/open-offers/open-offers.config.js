/**
 * Created by Ishai on 4/27/2017.
 */

import {transient, inject} from 'aurelia-framework';
import {SanitizeHTMLValueConverter} from 'aurelia-templating-resources';
import {FormatNumberValueConverter} from 'app-resources';
import {IssuerHtmlValueConverter} from '../../account.value-converters';

@transient()
@inject(FormatNumberValueConverter, IssuerHtmlValueConverter, SanitizeHTMLValueConverter)
export class OpenOffersConfig {

    constructor(formatNumber, issuerHtml, sanitizeHTML) {
        return {
            table: {
                lengthMenu: [ 10, 25, 100 ],
                serverSide: true,
                searchDelay: 500,
                columns: [
                    {
                        title: 'Offered Amount',
                        data: 'amount',
                        searchable: false
                    },
                    {
                        title: 'Offered Asset Code',
                        data: '_sellingAssetCode',
                        render(cellData, type, rowData) {
                            return rowData.sellingAssetCode;
                        },
                        searchable: true
                    },
                    {
                        title: 'Offered Asset Issuer',
                        data: 'sellingIssuerId',
                        searchable: true,
                        cellCallback (cell, rowData) {
                            cell.empty();
                            let newHtml = issuerHtml.toView(rowData.sellingIssuer);
                            newHtml = sanitizeHTML.toView(newHtml);
                            cell.html(newHtml);
                        }
                    },
                    {
                        title: 'Desired Asset Code',
                        data: '_buyingAssetCode',
                        render(cellData, type, rowData) {
                            return rowData.buyingAssetCode;
                        },
                        searchable: true
                    },
                    {
                        title: 'Desired Asset Issuer',
                        data: 'buyingIssuerId',
                        searchable: true,
                        cellCallback (cell, rowData) {
                            cell.empty();
                            let newHtml = issuerHtml.toView(rowData.buyingIssuer);
                            newHtml = sanitizeHTML.toView(newHtml);
                            cell.html(newHtml);
                        }
                    },
                    {
                        title: 'Price',
                        data: 'price',
                        searchable: false,
                        render(cellData, type, rowData) {
                            return formatNumber.toView(parseFloat(rowData.price, 10)) + ' ' + rowData.sellingAssetCode + '/' + rowData.buyingAssetCode;
                        }
                    },
                    {
                        title: '',
                        defaultContent: '',
                        searchable: false,
                        orderable: false
                    }
                ]
            }
        };
    }
}
