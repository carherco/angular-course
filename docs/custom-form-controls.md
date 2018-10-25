# Custom and reusable form controls

## The ControlValueAccessor Interface

The ControlValueAccessor is a kind of bridge between the model and the view.

Every native form element has a built-in ControlValueAccessor.

+------------------------------------+----------------------+
|              Accessor              |     Form Element     |
+------------------------------------+----------------------+
| DefaultValueAccessor               | input, textarea      |
| CheckboxControlValueAccessor       | input[type=checkbox] |
| NumberValueAccessor                | input[type=number]   |
| RadioControlValueAccessor          | input[type=radio]    |
| RangeValueAccessor                 | input[type=range]    |
| SelectControlValueAccessor         | select               |
| SelectMultipleControlValueAccessor | select[multiple]     |

If we want to build a new form control, we need to implement the same interface to tell the form's API how to interact with our control.

It has 3 mandatory methods and one optional method:

- writeValue(value: any) {}

Write value to display in view

- registerOnChange(fn: (value: any) => void) {}

Callback for value changes in DOM

- registerOnTouched(fn: () => void) {}

Callback for toggling "touched" property

- setDisabledState(isDisabled: boolean) {}

Enable/disable element in view.

## FormControlDirective

All form directives, call setUpControl function to setup interaction between a formControl and a ControlValueAccessor. Here is the code snippet demonstrating that for the formControl directive:

```ts
export class FormControlDirective ... {
  ...
  ngOnChanges(changes: SimpleChanges): void {
    if (this._isControlChanged(changes)) {
      setUpControl(this.form, this);
```

And here is the code of the setUpControl function that shows how the native and Angular’s form controls are synchronized:

```ts
export function setUpControl(control: FormControl, dir: NgControl) {
  
  // initialize a form control
  dir.valueAccessor.writeValue(control.value);
  
  // setup a listener for changes on the native control
  // and set this value to form control
  dir.valueAccessor.registerOnChange((newValue: any) => {
    control.setValue(newValue, {emitModelToViewChange: false});
  });

  // setup a listener for changes on the Angular formControl
  // and set this value to the native control
  control.registerOnChange((newValue: any, ...) => {
    dir.valueAccessor.writeValue(newValue);
  });
```

Once we understand the mechanics we can continue implementing our own accessor for a custom form control.

## writeValue()

Write a new value to the element. Angular will call this method with the value in one of the following cases:

- When you instantiate a new FormControl.
- When you call this.control.patchValue/setValue(value)

```html
<input type="text" #input>
```

```ts
export class RequiredTextComponent implements ControlValueAccessor {
  @ViewChild('input') input: ElementRef;
  writeValue(value: any) {
    this.input.nativeElement.value = value;
  }
}
```

## registerOnChange()

Set the function to be called when the control receives a change event. Angular provides you with a function and asks you to call it whenever there is a change in your component with the new value so that it can update the control.

```html
<input type="text" #input 
  (input)="onChange($event.target.value)">
```

```ts
onChange = (_: any) => { };
registerOnChange(fn: (value: any) => void) {
  this.onChange = fn;
}
```

## registerOnTouched()

The registerOnTouched method is the same as registerOnChange except that you should call it when the control receives a touch event.

```html
<input type="text" #input 
  (input)="onChange($event.target.value)"
  (blur)="onTouched()">
```

```ts
onTouched = () => { };
registerOntouched(fn: () => void) {
  this.onTouched = fn;
}
```

## setDisabledState()

This function is called when the control status changes to or from DISABLED. Depending on the value, it will enable or disable the appropriate DOM element.

Angular will call this method in one of the following cases:

- When you instantiate a new FormControl with the disabled property set to true. FormControl({value: '', disabled: true})
- When you call control.disable() or when you call control.enable() after your already called control.disable() at least once.

```html
<input type="text" #input 
  (input)="onChange($event.target.value)"
  (blur)="onTouched()"
  [disabled]="disabled">
```

```ts
setDisabledState(disabled: boolean) {
  this.disabled = disabled;
}
```

## Provide the component as NG_VALUE_ACCESSOR

```ts
@Component({
  ...
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RequiredTextComponent
      //useExisting: forwardRef(() => RequiredTextComponent),
    }
  ],
  ...
})
export class RequiredTextComponent implements ControlValueAccessor {
  //...
}
```

or

```ts
const REQUIRED_TEXT_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => RequiredTextComponent),
}
@Component({
  ...
  providers: [
    REQUIRED_TEXT_ACCESSOR
  ],
  ...
})
export class RequiredTextComponent implements ControlValueAccessor {
  //...
}
```

We need to use *forwardRef* because in ES6 classes are not hoisted to the top, so at this point (inside the metadata definition), the class is not yet defined.

multi: true indicates that several elements of NG_VALUE_ACCESSOR can be bound to this provider.

## Use it

```html
<form>
  <input type="text" name="one" ngModel />
  <select name="two" name="two" ngModel>...</select>
  <required-text name="three" ngModel></required-text>
</form>
```

## Validator interface

The validator interfaces requires to implement the validate() method.

```ts
validate(ctrl: AbstractControl) {
  return Validator.required(ctrl);
}
```

And provide it

```ts
@Component({
  providers: [
    {provide: NG_VALIDATORS, multi: true, useExisting: RequiredText}
  ]
})
export class RequiredText {
  validate(ctrl: AbstractControl) {
    return Validator.required(ctrl);
  }
}
```

## NgControl

It's the super class for all bottom-level individual FormControlDirective, NgModel and FormControlName.

```ts
constructor(@Self() public controlDirective: NgControl) {

}
```

The @Self directive ensures that Angular will inject our control directive and not another one. That could happen because the user (the programmer) could wrap our directive inside another control.

At this time, we are injecting NgControl, but NgControl has to inject ValueAccesor and Validator. That will cause a circular dependency.

We need to remove our providers and do it by ourself.

```ts
constructor(@Self() public controlDir: NgControl) {
  controlDir.valueAccessor = this;
}
```

And on the validators side

```ts
ngOnInit() {
  const control = this.controlDir.control;
  let validators = control.validator ? [control.validator, Validators.required] :Validators.required;
  control.setValidators(validators);
  control.updateValueAndValidity();
}
```

```html
<input type="text" #input 
  (input)="onChange($event.target.value)"
  (blur)="onTouched()"
  [disabled]="disabled">

<div class="error"
  *ngIf="controlDir && !controlDir.control.valid">
  This field is invalid.
</div>
```

Thanks to: https://blog.angularindepth.com/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms-93b9eee9ee83 and https://www.youtube.com/watch?v=CD_t3m2WMM8&index=15&list=PLAw7NFdKKYpGUpg7JJ8-PJNMdlrOnmZtN