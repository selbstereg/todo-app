import { timer, Subscription } from 'rxjs';

export class DebounceTimer {
    private subscription: Subscription = new Subscription;
    private debounceTimeInMilliSeconds: number;

    constructor(debounceTimeInMilliSeconds: number) {
        this.debounceTimeInMilliSeconds = debounceTimeInMilliSeconds;
    }

    public callAferExpiry(callback: () => void): void {
        this.subscription = timer(this.debounceTimeInMilliSeconds).subscribe(
            () => callback()
        );
    }

    public stop(): void {
        this.subscription.unsubscribe();
    }
}