import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      nombre: [''], 
      rfc: [''], 
      nombrejefedirecto: ['']
    });

    this.datosLaboralesForm.addControl('empresa_trabaja', this.empresaTrabajaForm);
  }

}
