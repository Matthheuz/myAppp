import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { Cliente } from '../model/cliente';

@Injectable()

export class ClienteService{
cliente : Cliente = new Cliente();

constructor(private firestore: AngularFirestore){


}

listaDeClientes() : Observable<any>{

    return from(new Observable(observe => {
        this.firestore.collection('cliente').snapshotChanges().subscribe(response=>{
            let lista: Cliente[] = [];
            response.map(obj =>{
                let cliente: Cliente = new Cliente();
                cliente.setData(obj.payload.doc.data());
                lista.push(cliente);
            });
                observe.next(lista);
        })
    }))
}


}