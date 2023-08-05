import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { requestsService } from './../all.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  authForm!: FormGroup

  constructor(private request: requestsService, private router: Router) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    if(localStorage.getItem('access_token')) {
      this.router.navigate(['/admin'])
    } else {
      this.router.navigate(['/auth'])
    }
  }

  logIn() {
    const authFormDta = {...this.authForm.value}
    console.log(authFormDta);
    this.request.authRequest(authFormDta.username, authFormDta.password).subscribe( (response: any) => {
      localStorage.setItem('access_token', response.access)
      localStorage.setItem('refresh_token', response.refresh)
      this.router.navigate(['/admin'])
    }, error => {
      this.request.error(error)
    })
  }

}
