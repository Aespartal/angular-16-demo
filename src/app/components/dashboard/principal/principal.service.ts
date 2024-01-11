import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ItemService {

  constructor() {
    // Empty
  }

  query(): Observable<any[]> {
    return of([
      { name: 'Product A', price: 10, favourite: false },
      { name: 'Product B', price: 15, favourite: true },
      { name: 'Product C', price: 20, favourite: true }
    ]);

  }
}
