import { Injectable } from '@angular/core';
import { FormArray, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() {}

  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if(control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true});
      } else if(control instanceof FormGroup || control instanceof FormArray) {
        control.markAsTouched({onlySelf: true});
        this.validateAllFormFields(control);
      }
    })
  }

  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string){
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl): string{
    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')){
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if(field?.hasError('maxlength')){
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'campo Inválido';
  }

  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string,
    fieldName: string, index: number): string {
    const formArry = formGroup.get('lessons') as UntypedFormArray;
    const field = formArry.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string){
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }
}
