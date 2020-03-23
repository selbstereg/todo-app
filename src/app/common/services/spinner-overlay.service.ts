import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material';
import { JobTracker } from '../utils/job-tracker';
import { DebounceTimer } from '../utils/debounce-timer'


@Injectable()
export class SpinnerOverlayService {
    private spinnerOverlayRef: OverlayRef = this.cdkSpinnerCreate();
    private jobTracker: JobTracker = new JobTracker();
    private debounceTimer: DebounceTimer = new DebounceTimer(50);

    constructor(private overlay: Overlay) {
    }

    start(): number {
        if (this.isSpinning()) {
            this.debounceTimer.stop();
        } else {
            this.startSpinning();
        }
        return this.jobTracker.addJob();
    }
    
    stop(jobId: number) {
        this.jobTracker.removeJob(jobId);
        if (this.jobTracker.hasNoJobs()) {
            this.debounceTimer.callAferExpiry(
                () => this.stopSpinning()
            );
        }
    }

    isSpinning() {
        return this.spinnerOverlayRef.hasAttached();
    }
    
    private startSpinning() {
        this.spinnerOverlayRef.attach(new ComponentPortal(MatSpinner))
    }

    private stopSpinning() {
        this.spinnerOverlayRef.detach();
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
}
