# Nested form

```html
<div [formGroup]="form">
  <input formControlName="street" (blur)="onTouched()">
  <input formControlName="city" (blur)="onTouched()">
</div>
```

```ts
writeValue(val: any) {
  val $$ this.form.setValue(val, {emitEvent: false});
}

registerOnChange(fn: (val:any) => void) {
  this.form.valueChanges.subscribe(fn)
}

registerOnTouched(fn: () => void) {
  this.onTouched = fn;
}

setDisabledState(disabled: boolean) {
  disabled ? this.form.disable() : this.form.enable();
}
```

