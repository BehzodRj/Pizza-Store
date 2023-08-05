import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class requestsService {
  private url = "http://127.0.0.1:8000/"

  constructor(private http: HttpClient, private router: Router) { }

  authRequest(username: string, password: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(this.url + "login/", { "username": username, "password": password }, { headers: header })
  }

  refreshTokenRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(this.url + 'refresh/', { refresh: localStorage.getItem('refresh_token') }, { headers: header })
  }

  error(error: any) {
    alert(error.statusText)

    if (error.status == 401) {
      this.refreshTokenRequest().subscribe((response: any) => {
        localStorage.setItem('access_token', response.access)
        location.reload()
      }, error => {
        localStorage.clear()
        this.router.navigate(['/'])
      })
    }
  }

  getRequest(dataUrl: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.get(this.url + dataUrl, { headers: header })
  }

  getRequestByID() { }


  postRequest(dataUrl: any, body: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post(this.url + dataUrl, body, { headers: header })
  }

  putRequest(dataUrl: any, body: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.put(this.url + dataUrl, body, { headers: header })
  }


  deleteRequest(dataUrl: any,) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.delete(this.url + dataUrl, { headers: header })
  }
}
