import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable()
export class ClienteService{
    cliente : Cliente = new Cliente();

    constructor(private firestore: AngularFirestore){

    }

    listaDeClientes() : Observable<any>{

        // Observable -> Aguardar resposta do servidor
        return from(new Observable(observe =>{ // converter para Observable
            
            // this.firestore.collection('cliente') -> Selecionar a coleção no Firestore
            // .snapshotChanges().subscribe -> Tentar buscar no servidor
            // response -> dados baixados do servidor, os clientes
            this.firestore.collection('cliente').snapshotChanges().subscribe(response=>{
                // transformar response em array de clientes
                let lista: Cliente[] = [];
                response.map(obj =>{
                    // será repetido para cada registro, cada registro do Firestore se chama obj
                    let cliente: Cliente = new Cliente();
                    cliente.setData(obj.payload.doc.data());// obj.payload.doc.data() -> Dados do cliente
                    cliente.id = obj.payload.doc.id; // inserindo ID
                    lista.push(cliente); // adicionando o cliente na lista // push é adicionar
                });
                observe.next(lista);
            })

        }))
    }

 


}