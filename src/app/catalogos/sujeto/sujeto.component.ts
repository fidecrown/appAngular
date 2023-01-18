import { Component, OnInit } from '@angular/core';
import { Sujeto } from 'src/app/models/sujeto';
import { DataBibliotecaService } from 'src/app/services/data-biblioteca.service';
import { SujetoService } from 'src/app/services/sujeto.service';

@Component({
  selector: 'app-sujeto',
  templateUrl: './sujeto.component.html',
  styleUrls: ['./sujeto.component.css']
})
export class SujetoComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  public sujetos: Sujeto[] = [];
  public encabezados: string[] = [
    '#', 'nombre', 'paterno', 'materno', 'rfc', 'curp', 'fechaNacimiento'
  ];

  constructor(public sujetoService: SujetoService,
    private dataBiblioteca: DataBibliotecaService) { }

  ngOnInit(): void {
    this.emitDescriptionModule();
    this.cargarDataTables();
    //this.getSujetos();
  }

  cargarDataTables(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      stateSave: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.sujetoService.getSujetos().subscribe(s => {
          this.sujetos = s;
          callback({
            data: []
          });
        });
      },
    };
  }

  /*NOTE - EMITIMOS EL NOMBRE DEL ENCABEZADO DEL MODULO EN TURNO
          PARA IMPRIMIRLO EN LA PANTALLA
  */
  emitDescriptionModule(): void {
    this.dataBiblioteca.descripModulo$.emit('Sujetos');
  }

  /*  public getSujetos(): void {
     this.sujetoService.getSujetos().subscribe(s => {
       this.sujetos = s
       console.log(s);

     });
   } */

}
