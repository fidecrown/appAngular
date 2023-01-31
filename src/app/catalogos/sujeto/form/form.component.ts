import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sujeto } from '../interface/sujeto';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  @Input() set sujeto(sujeto: Sujeto) {
    if (sujeto) {
      this.formSujeto.patchValue(sujeto);
    }
  }

  @Output() onAddRow: EventEmitter<Sujeto> = new EventEmitter();
  @Output() onUpdateRow: EventEmitter<Sujeto> = new EventEmitter();

  formSujeto!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadForm();
  }

  addRow(): void {
    this.onAddRow.emit(this.formSujeto.value);
  }

  updateRow(): void {
    this.onUpdateRow.emit(this.formSujeto.value);
  }

  loadForm(): void {
    this.formSujeto = this.fb.group({
      sujetoid: [0],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      fechaNacimiento: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      sexo: ['', Validators.required],
    });
  }

  fieldNotValid(field: string): boolean | undefined {
    //console.log(JSON.stringify(this.formSujeto.get(campo)?.errors))
    const control = this.formSujeto.controls;
    //console.log(control['rfc'].errors);
    return this.formSujeto.get(field)?.invalid &&
      this.formSujeto.get(field)?.touched
  }

  get existRowById() {
    return this.formSujeto.value.sujetoid > 0
  }

  get f() { return this.formSujeto.controls; }

  cleanForm(): void {
    this.formSujeto.reset();
  }

}
