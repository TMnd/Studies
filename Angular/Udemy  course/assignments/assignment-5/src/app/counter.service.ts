import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class CounterService {
    contActiveToInactive: number = 0;
    contInactiveToActive: number = 0;

    contStatus = new EventEmitter<string>();

    onAddActiveToInactive() {
        this.contActiveToInactive++;
    }

    onInactiveToActive() {
        this.contInactiveToActive++;
    }
}