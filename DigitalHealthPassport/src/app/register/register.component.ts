import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../must-match.validator';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  
  
  constructor(private fb: FormBuilder,private registerservice: RegisterService) { 
    this.registerForm = this.fb.group({
      organizationemailid: ['', Validators.required],
      organizationname: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone_number: ['',Validators.required],
      role:['']
    }, {
        validator: MustMatch('password', 'confirmPassword'),
    })
  }
  
  get f() { return this.registerForm.controls; }

  healthCheck(event: any){
console.log('health',event.target.value)
this.registerForm.value.role = event.target.value;
  }

  airportCheck(event: any){
console.log('airport',event.target.value);
this.registerForm.value.role = event.target.value;
  }

  onSubmit(){
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
  }
  else{
    let issuer_details = {
      "email": this.registerForm.value.organizationemailid,
    "password": this.registerForm.value.password,
    "role": this.registerForm.value.role,
    "phone_number": this.registerForm.value.phone_number
    }
    console.log('form values',issuer_details);
    this.registerservice.AddIssuer(issuer_details).subscribe((data: any)=>{
      console.log(JSON.stringify(data))
    })
  }
  }

  ngOnInit(){
    
  }

}
