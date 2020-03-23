import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material';


@Injectable()
export class SpinnerOverlayService {
    private spinnerOverlayRef: OverlayRef = this.cdkSpinnerCreate();

    constructor(private overlay: Overlay) {
    }

    private cdkSpinnerCreate() {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically()
        return this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            positionStrategy
        });
    }

    start(): number {
        this.showSpinner();
        return null;
    }

    stop(jobId: number) {
        this.hideSpinner();
    }

    showSpinner() {
        this.spinnerOverlayRef.attach(new ComponentPortal(MatSpinner))
    }

    hideSpinner() {
        this.spinnerOverlayRef.detach();
    }
}
