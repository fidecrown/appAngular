import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sujeto',
  templateUrl: './sujeto.component.html',
  styles: [
  ]
})
export class SujetoComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  //DECLARACION DE VARIABLES LOCALES
  @Input() altaSolClienteForm!: FormGroup;
  sujetoForm!: FormGroup;

  ngOnInit(): void {
    this.loadSujetoForm();
    console.log('CARGO EL FORM SUJETO')
  }

  loadSujetoForm(): void {
    this.sujetoForm = this.fb.group({
      sujetoid: [0],
      nombre: [''],
      paterno: [''],
      materno: [''],
      rfc: [''],
      curp: [''],
      fechaNacimiento: [''],
      sexo: [''],
    });

    this.altaSolClienteForm.addControl('sujeto', this.sujetoForm);
  }
  
}

/*
sujetoid: [0],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      fechaNacimiento: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      sexo: ['', Validators.required],
*/