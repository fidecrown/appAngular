import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Sujeto } from '../../../models/sujeto';
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
  @Input() dtOptions:DataTables.Settings = {};
  @Input() dtTrigger:Subject<any> = new Subject<any>();

  @Output() oneditRow: EventEmitter<number> = new EventEmitter();
  @Output() onedeleteRow: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editRow(sujetoid: number) {
    this.oneditRow.emit(sujetoid);
  }

  deleteRow(sujetoid: number){
    this.onedeleteRow.emit(sujetoid);
  }

  onRenderTable(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // DESTRUIMOS LA TABLA - LIMPIAMOS LOS DATOS
      dtInstance.destroy();
    });
  }

}
