import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'
import { Sujeto } from 'src/app/catalogos/sujeto/interface/sujeto';
import { DataBibliotecaService } from 'src/app/services/data-biblioteca.service';
import { SujetoService } from 'src/app/catalogos/sujeto/services/sujeto.service';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-sujeto',
  templateUrl: './sujeto.component.html',
  styleUrls: ['./sujeto.component.css']
})
export class SujetoComponent implements OnDestroy, OnInit {

  @ViewChild(ListComponent) list!: ListComponent;
  @ViewChild(FormComponent) form!: FormComponent;

  dtTrigger: Subject<any> = new Subject<any>();

  lstSujetos: Sujeto[] = [];
  encabezados: string[] = ['#', 'Nombre Completo', 'rfc', 'curp', 'fechaNacimiento', 'Acciones'];

  sujeto!:Sujeto;
  renderTable: boolean = false;

  constructor(public sujetoService: SujetoService,
    private dataBiblioteca: DataBibliotecaService,
    private change: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    /*NOTE - EMITIMOS EL NOMBRE DEL ENCABEZADO DEL MODULO EN TURNO
          PARA IMPRIMIRLO EN LA PANTALLA
  */
    this.emitDescriptionModule();

    /*NOTE - HACEMOS UNA PATECION AL BACK-END PARA EXTRAER
          LOS DATOS Y POSTERIORMENTE LLENAR EL LISTADO DE LA TABLA
  */
    this.getSujetos();

  }

  emitDescriptionModule(): void {
    this.dataBiblioteca.descripModulo$.emit('Sujetos');
  }

  getSujetos(): void {
    this.sujetoService.getSujetos().subscribe(sujetos => {
      this.lstSujetos = sujetos
      this.change.detectChanges();
      this.dtTrigger.next(0);
    });
  }

  addRow(sujeto: Sujeto): void {
    this.sujetoService.saveSujeto(sujeto).subscribe(msj => {
      this.form.btnCerrar.nativeElement.click();
      this.settings('success', msj.mensaje);
    });
  }

  editRow(sujetoid: number) {
    this.sujetoService.getSujetoById(sujetoid).subscribe(sujeto => {
      this.sujeto = sujeto;
    });
  }

  updateRow(sujeto: Sujeto): void {
    this.sujetoService.updateSujeto(sujeto.sujetoid, sujeto).subscribe(msj => {
      //document.getElementById("cerrar")?.click();
      this.form.btnCerrar.nativeElement.click();
      this.settings('info', msj.mensaje);
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

        this.sujetoService.deleteSujeto(sujetoId).subscribe(msj => {
          this.settings('info', msj.mensaje);
        });

      }
    })
  }

  settings(alerta: any, title: string): void {
    this.list.onRenderTable();
    this.getSujetos();
    this.getMessageAlert(alerta, title);
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
