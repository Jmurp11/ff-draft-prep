import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Params } from '@angular/router';

interface IRoutePart {
  title: string;
  breadcrumb: string;
  params?: Params;
  url: string;
  urlSegments: any[];
}

@Injectable({
  providedIn: 'root'
})
export class RoutePartsService implements OnInit{
  public routeParts: IRoutePart[];
  constructor(private router: Router) {}

  ngOnInit() { }

  generateRouteParts(snapshot: ActivatedRouteSnapshot): IRoutePart[] {
    let routeParts = [] as IRoutePart[];
    if (snapshot) {
      if (snapshot.firstChild) {
        routeParts = routeParts.concat(this.generateRouteParts(snapshot.firstChild));
      }
      if (snapshot.data['title'] && snapshot.url.length) {
        // console.log(snapshot.data['title'], snapshot.url)
        routeParts.push({
          title: snapshot.data['title'],
          breadcrumb: snapshot.data['breadcrumb'],
          url: snapshot.url[0].path,
          urlSegments: snapshot.url,
          params: snapshot.params
        });
      }
    }
    return routeParts;
  }
}
