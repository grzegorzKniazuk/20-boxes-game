import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BoxSettings } from 'src/app/core/interfaces/box-settings';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/core/services/store.service';

@Injectable({
  providedIn: 'root'
})
export class BoxesSettingsResolve implements Resolve<BoxSettings[]> {

  constructor(private storeService: StoreService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BoxSettings[]> | Promise<BoxSettings[]> | BoxSettings[] {
    return this.storeService.boxesSettings;
  }
}
