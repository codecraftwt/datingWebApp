import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function FileValidator(control: AbstractControl): ValidationErrors | null {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const file = control.value as File;
  
  if (file && allowedTypes.indexOf(file.type) === -1) {
    return { invalidFileType: 'Invalid file type. Only .jpg, .jpeg, .png, .pdf, .doc, .docx are allowed.' };
  }
  
  return null;  // valid file
}
