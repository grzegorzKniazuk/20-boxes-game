import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BoxSettings } from '../interfaces/box-settings';
import { BoxesService } from '../services/boxes.service';

@Injectable({
  providedIn: 'root',
})
export class BoxDataResolve implements Resolve<BoxSettings> {

  constructor(private boxesService: BoxesService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BoxSettings> | Promise<BoxSettings> | BoxSettings {
    return this.boxesService.getBoxSettings(+route.params['id']);
  }
}
