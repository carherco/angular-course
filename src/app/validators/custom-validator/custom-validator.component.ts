import { Component, OnInit } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-custom-validator',
  templateUrl: './custom-validator.component.html',
  styleUrls: ['./custom-validator.component.css'],
  providers: [
    {provide: NG_VALIDATORS, multi: true, useExisting: CustomValidator}
  ]
})
export class CustomValidator {

  constructor() { }

  static validate(ctrl: AbstractControl) {
    return ctrl.value ? null : {customError: true} 
    //return null;
  }


}
