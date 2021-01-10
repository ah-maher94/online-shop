import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    const url = 'https://fakestoreapi.com/products';
    return this.http.get(url);
  }

  getProduct(id): Observable<any> {
    const url = 'https://fakestoreapi.com/products/' + id;
    console.log(id);
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }
  handleError(error) {
    return throwError(error.message);
  }
}
