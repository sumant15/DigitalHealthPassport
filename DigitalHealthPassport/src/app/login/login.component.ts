import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  
  constructor(private fb: FormBuilder,private loginservice: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
   }  
   
   get f() { return this.loginForm.controls; }

   onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
  }
  else{
    this.loginservice.AuthenticateUser(this.loginForm.value).subscribe((data) => {
      // if (data.length > 0) {
        localStorage.setItem("uname", this.loginForm.value.email)
        console.log('data',data);
        // this.rtr.navigate(['Home'])
    //   }
    //   else
    //     alert("Invalid Login ...")
    // }
    //)
  })
  }
}



  ngOnInit(){
  }

}
