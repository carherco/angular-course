import { Component, OnInit, ViewChild, ElementRef, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
import { CustomValidator } from 'app/validators/custom-validator/custom-validator.component';

@Component({
  selector: 'app-required-text',
  templateUrl: './required-text.component.html',
  styleUrls: ['./required-text.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: RequiredTextComponent
  //   }
  // ],
})
export class RequiredTextComponent implements ControlValueAccessor {

  @ViewChild('input') input: ElementRef;
  disabled: boolean = false;
  
  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    let validators = control.validator ? [control.validator, CustomValidator.validate] :CustomValidator.validate;
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  writeValue(value: any) {
    this.input.nativeElement.value = value;
  }

  onChange = (_: any) => { };
  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  onTouched = () => { };
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
