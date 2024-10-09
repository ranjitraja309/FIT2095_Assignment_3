import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {
  constructor(private router: Router) { }

  handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.router.navigate(['/invaliddata']);
    } else {
      console.error('An error occurred:', error);
    }
  }
}