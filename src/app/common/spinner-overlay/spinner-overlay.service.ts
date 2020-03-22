import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';


@Injectable()
export class SpinnerOverlayService {
    private spinnerRef: OverlayRef;// = this.cdkSpinnerCreate();

    constructor(private overlay: Overlay) {
    }
}
