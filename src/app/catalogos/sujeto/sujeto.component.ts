import { Component, OnInit } from '@angular/core';
import { Sujeto } from 'src/app/models/sujeto';
import { SujetoService } from 'src/app/services/sujeto.service';

@Component({
  selector: 'app-sujeto',
  templateUrl: './sujeto.component.html',
  styleUrls: ['./sujeto.component.css']
})
export class SujetoComponent implements OnInit {

  public sujetos: Sujeto[] = [];
  public encabezados: string[] = [
    '#',
    'nombre',
    'paterno',
    'materno',
    'rfc',
    'curp',
    'fechaNacimiento'
  ];

  constructor(private sujetoService: SujetoService) { }

  ngOnInit(): void {
    this.getSujetos();
  }

  public getSujetos(): void {
    this.sujetoService.getSujetos().subscribe(s => {
      this.sujetos = s
      console.log(s);

    });
  }
}
