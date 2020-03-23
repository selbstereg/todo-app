import { timer, Subscription } from 'rxjs';

export class DebounceTimer {
    private subscription: Subscription = new Subscription;
    private debounceTimeInMilliSeconds = 50;

    constructor() {}

    public callAferExpiry(callback: () => void) {
        this.subscription = timer(this.debounceTimeInMilliSeconds).subscribe(
            () => callback()
        );
    }

    public stop() {
        this.subscription.unsubscribe();
    }
}