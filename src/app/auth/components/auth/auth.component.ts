import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  navRoute: string[] = [''];
  routerChange$: any;
  constructor(public route: ActivatedRoute, private router: Router) {
    this.routerChange$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let crntRoute = this.route.snapshot.children[0].url[0].path;
        if (crntRoute === 'register') this.navRoute = ['login'];
        else if (crntRoute === 'login') this.navRoute = ['register'];
        else this.navRoute = ['register', 'login'];
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.routerChange$.unsubscribe();
  }
}
