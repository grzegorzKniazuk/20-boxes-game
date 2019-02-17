import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private formBuilder: FormBuilder) { }

  public get editBoxForm(): FormGroup {
    return this.formBuilder.group({
      id: [null, [ Validators.required ]],
      dead: [false],
      goToStart: [false],
      goTo: [null],
    });
  }
}
