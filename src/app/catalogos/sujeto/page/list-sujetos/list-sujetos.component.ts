import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SujetoService } from '../../service/sujeto.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-sujetos',
  templateUrl: './list-sujetos.component.html',
  styleUrls: []
})
export class ListSujetosComponent implements OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: any = DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  encabezados: string[] = ['#', 'Nombre Completo', 'rfc', 'curp', 'fechaNacimiento', 'Acciones'];


  constructor(private sujeService: SujetoService) { }

  ngOnInit(): void {
    this.sujeService.getListSujetos();
    this.cargarSettingsTable();
  }

  get lstSujetos() {
    return this.sujeService.sujetos;
  }

  editRow(sujetoid: number) {
    this.sujeService.getSujetoById(sujetoid).subscribe(sujeto => {
      //this.formSujeto.patchValue(sujeto);
    });
  }

  deleteRow(sujetoId: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sujeService.deleteSujeto(sujetoId).subscribe(msj => {
          this.renderTable();
          this.getMessageAlert('info', msj.mensaje);
        });
      }
    })
  }

  cargarSettingsTable(): void {
    this.dtOptions = {
      //pagingType: 'full_numbers',
      pageLength: 10,
      //info: false,
      //searching: false,
      //paging: false,
      scrollY: '200px',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-MX.json'
      },
      order: []
    };
  }

  renderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // PRIMERO DESTRUIMOS LA TABLA
      dtInstance.destroy();
      // HACEMOS PETICION AL SERVIDOR PARA TRAER EL LISTADO
      this.sujeService.getListSujetos();
    });
  }

  getMessageAlert(alerta: any, title: string): void {
    Swal.fire({
      position: 'center',
      icon: alerta,
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
