# Pipes

Pipes are like a kind of transform functions. They take a data as input and return it transformed.

- They are used inside templates with the operator |

Example:

Assuming that *dateObj* is a date object with value (year: 2018, month: 10, day: 23, hour: 10, minute: 43, second: 11):

```html
    {{ dateObj | date }}               // output is 'Oct 23, 2018'
    {{ dateObj | date:'medium' }}      // output is 'Oct 23, 2018, 10:43:11 AM'
    {{ dateObj | date:'shortTime' }}   // output is '10:43 AM'
    {{ dateObj | date:'mmss' }}        // output is '43:11'
```

- They accept any number of optional parameters, separated with :

Example:

```html
  {{text | slices:1:5}}
```

- They are chainnable

Example: 

```html
{{  birthday | date:'fullDate' | uppercase}}
```

## Built-in pipes

- AsyncPipe
- CurrencyPipe
- DatePipe
- DecimalPipe
- I18nPluralPipe
- I18nSelectPipe
- JsonPipe
- Keyvalue
- LowerCasePipe
- PercentPipe
- SlicePipe
- TitleCasePipe
- UpperCasePipe

[Pipes documentation](https://angular.io/api?type=pipe)

## Custom pipes

It is possible to program custom pipes.

Example:

``` typescript
    import { Pipe, PipeTransform } from '@angular/core';
    /*
    * Raise the value exponentially
    * Takes an exponent argument that defaults to 1.
    * Usage:
    *   value | exponentialStrength:exponent
    * Example:
    *   {{ 2 | exponentialStrength:10 }}
    *   formats to: 1024
    */
    @Pipe({name: 'exponentialStrength'})
    export class ExponentialStrengthPipe implements PipeTransform {
      transform(value: number, exponent: string): number {
        let exp = parseFloat(exponent);
        return Math.pow(value, isNaN(exp) ? 1 : exp);
      }
    }
```

Features:

- A pipe is a class decorated with metadata.
- The class implements the *transform* method of the *PipeTransform* interface that accepts an input value followed by optional parameters and returns the transformed value.
- To inform Angular that it is a Pipe, we decorate the class with the @Pipe decorator from the *core* library of Angular.
- The decorator @Pipe allows to define the name of the pipe used in the templates. It must therefore be a valid JavaScript identifier.
- The pipe must be included in the array of *declarations* of the *AppModule*.

## Pure and impure pipes

Pure pipes detect changes in variables but do not detect changes within arrays or other compound objects.

The impure pipes inspect all the contents of the array or objects.

To create an impure pipe you have to indicate in the decorator metadata *pure: false*

```typescript
@Pipe({
  name: 'exponentialStrength',
  pure: false
})
```

[Índice](index.md)
