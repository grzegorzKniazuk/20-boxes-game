import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private formBuilder: FormBuilder) { }

  public get editBoxForm(): FormGroup {
    return this.formBuilder.group({
      dead: [false],
      goTo: [null, [ Validators.min(0), Validators.max(20) ]],
    });
  }
}
