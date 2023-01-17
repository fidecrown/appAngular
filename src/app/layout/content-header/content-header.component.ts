import { Component, OnInit } from '@angular/core';
import { DataBibliotecaService } from 'src/app/services/data-biblioteca.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

  descripcionModulo: string = '';

  constructor(public dataBiblioteca : DataBibliotecaService) { }

  ngOnInit(): void {
    this.dataBiblioteca.descripModulo$.subscribe( texto => this.descripcionModulo = texto);
  }

}
