/**
 * Created by istrauss on 9/28/2016.
 */

import {inject, bindable} from 'aurelia-framework';
import {ObserverManager, ObservationInstruction} from '../../workers/workers';

@inject(Element, ObserverManager)
export class SpinnerOverlay {

    @bindable minHeight = 350;
    @bindable size = 'large';

    constructor(element, observerManager) {
        this.element = element;
        this.observerManager = observerManager;
    }

    attached() {
        this.parent = $(this.element).parent();
        this.parentMinHeight = this.parent.css('min-height');

        let parentPosition = this.parent.css('position');
        if (parentPosition !== 'fixed' && parentPosition !== 'absolute') {
            this.parent.css('position', 'relative');
        }

        this.subscribeObservers();
        this.toggled();
    }

    detached() {
        this.observerManager.unsubscribe();
    }

    subscribeObservers() {
        let observationInstructions = [
            new ObservationInstruction(this.element, 'className', this.toggled.bind(this))
        ];
        this.observerManager.subscribe(observationInstructions);
    }

    toggled() {
        if (this.element.className.indexOf('aurelia-hide') > -1) {
            this.parent.css('min-height', this.parentMinHeight);
        }
        else {
            if (this.parentMinHeight === '0px') {
                this.parent.css('min-height', this.minHeight + 'px');
            }
        }
    }
}
