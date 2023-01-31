import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Sujeto } from '../interface/sujeto';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: any = DataTableDirective;

  @Input() encabezados: string[] = [];
  @Input() lstSujetos: Sujeto[] = [];
  @Input() dtTrigger:Subject<any> = new Subject<any>();

  @Input() set renderTable(render: boolean) {
    if (render) {
      console.log('INICIA EL RENDER');
      
      this.onRenderTable();
    }else{
      console.log('NO INICIO EL RENDER')
    }
  }

  @Output() oneditRow: EventEmitter<number> = new EventEmitter();
  @Output() ondeleteRow: EventEmitter<number> = new EventEmitter();

  dtOptions:DataTables.Settings = {};

  constructor() { }

  ngOnInit(): void {

    this.loadSettingsTable();
  }

  editRow(sujetoid: number) {
    this.oneditRow.emit(sujetoid);
  }

  deleteRow(sujetoid: number){
    this.ondeleteRow.emit(sujetoid);
  }

  onRenderTable(){
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // DESTRUIMOS LA TABLA - LIMPIAMOS LOS DATOS
      dtInstance.destroy();
    });
    
  }

  loadSettingsTable(): void {
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

}
