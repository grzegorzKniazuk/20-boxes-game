import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BoxDependencies } from '../interfaces/box-dependencies';
import { Observable } from 'rxjs';
import { BoxesService } from '../services/boxes.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoxDependenciesResolve implements Resolve<BoxDependencies> {

  constructor(private boxesService: BoxesService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BoxDependencies> | Promise<BoxDependencies> | BoxDependencies {
    return this.boxesService.getBoxDependencies(+route.params['id']);
  }
}
