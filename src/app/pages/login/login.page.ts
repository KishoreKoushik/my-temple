import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private router: Router, private storage: Storage) { }

  loginForm: FormGroup;
  isLogin: boolean = true;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    })
  }

  login() {
    let email = this.loginForm.controls["email"].value;
    let password = this.loginForm.controls["password"].value;
    let formData = this.loginForm.controls;
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      if (this.isLogin)
        this.authService.login(email, password).then(res => {
          if (res) {
            this.storage.set('isLoggedin', true);
            this.router.navigate(['/home']);
          }
        })
      else
        this.authService.signUp(email, password);
    }
    else {
      if (formData["email"].invalid) {
        if (formData['email'].errors['required']) {
          alert('Please enter email');
        } else {
          alert('Please enter valid email');
        }
      } else {
        if (formData['password'].errors['required']) {
          alert('Please enter password');
        } else {
          alert('Password should contain minimum 6 characters');
        }
      }
    }
  }

  toggleForm() {
    this.loginForm.reset();
    this.isLogin = !this.isLogin;
  }

  forgotPassword() {
    if (this.loginForm.controls["email"].invalid)
      alert('Pleaase enter your correct mail id')
    else {
      this.authService.recover(this.loginForm.controls['email'].value).then(res => {
        if (res)
          alert(res.message);
        else
          alert('Password reset link to your registered mail id');
      })
    }
  }

}


// TODO: 
// 1. alter the way error messages are shown 
// 2. Improve the design