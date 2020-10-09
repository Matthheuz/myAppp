import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente-service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  lista : Cliente[] = [];

  constructor(private clienteServ : ClienteService) { }

  ngOnInit() {
    this.clienteServ.listaDeClientes().subscribe(response=>{
      
      console.log(response); 
      this.lista = response;
      console.log(this.lista); 

      
    },err=>{
      // erro
    })
  }

}
