import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from '../servers.service';

interface exampleType {
    id: number,
    name: string,
    status: string
}

@Injectable()
export class ServerResolver implements Resolve<exampleType> {
    
    constructor(
        private serversService: ServersService
    ){}
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): exampleType | Observable<exampleType> | Promise<exampleType> {
        const id = +route.params['id'];
        return this.serversService.getServer(id)!;
    }

}