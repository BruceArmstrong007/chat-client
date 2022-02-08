import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = this.persistanceService.get('user');
    if (user !== null) this.router.navigate(['/user/' + user + '/chat']);
    return true;
  }
  constructor(
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
