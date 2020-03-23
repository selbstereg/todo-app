export class JobTracker {
    jobIdCounter: number = 0;
    jobIds: number[] = [];

    constructor() {}

    addJob(): number {
        if (this.jobIdCounter > 99) {
            this.jobIdCounter = 0;
        }
        const jobId = this.jobIdCounter;
        this.jobIds.push(jobId);
        this.jobIdCounter++;
        return jobId;
    }

    removeJob(jobId: number): void {
        this.jobIds = this.jobIds.filter(id => id !== jobId);
    }

    hasNoJobs(): boolean {
        return this.jobIds.length === 0;
    }
}