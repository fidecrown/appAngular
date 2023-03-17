import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  //DECLARACION DE VARIABLES LOCALES
  @Input() altaSolClienteForm!: FormGroup;
  domicilioForm!: FormGroup;

  ngOnInit(): void {
    this.loadDomicilioForm();
  }

  loadDomicilioForm(): void {
    this.domicilioForm = this.fb.group({
      calle: [''],
      numero: [''],
      interior: [''],
      telefono: [''],
      entre_calle_1: [''],
      entre_calle_2: [''],
      referencia: [''],
      coloniaid: [''],
      tiempoarraigo: [''],
      nacionalidadid: ['']
    });

    this.altaSolClienteForm.addControl('domicilio', this.domicilioForm);
  }

}
