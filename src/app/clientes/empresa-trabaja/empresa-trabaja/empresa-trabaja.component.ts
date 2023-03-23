import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa-trabaja',
  templateUrl: './empresa-trabaja.component.html',
  styles: [
  ]
})
export class EmpresaTrabajaComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  //DECLARACION DE VARIABLES LOCALES
  @Input() datosLaboralesForm!: FormGroup;
  empresaTrabajaForm!: FormGroup;

  ngOnInit(): void {
    this.loadEmpresaTrabajaForm();
  }

  loadEmpresaTrabajaForm(): void {
    this.empresaTrabajaForm = this.fb.group({
      nombre: ['', Validators.required], 
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]], 
      nombrejefedirecto: ['', Validators.required]
    });

    this.datosLaboralesForm.addControl('empresa_trabaja', this.empresaTrabajaForm);
  }

  fieldNotValid(field: string): boolean | undefined {
    return this.empresaTrabajaForm.get(field)?.invalid &&
      this.empresaTrabajaForm.get(field)?.touched
  }

  get f() { return this.empresaTrabajaForm.controls; }

}
