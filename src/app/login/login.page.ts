import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { TemplateService } from '../service/template-service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //admin2@admin.com
  //123456

  formGroup : FormGroup;

  constructor(private formBuilder : FormBuilder,
    private auth : AngularFireAuth,
    private navCtrl : NavController,
    private menuCtrl : MenuController,
    private template : TemplateService) {
      this.iniciarForm();
    }

  ngOnInit() {
    this.menuCtrl.enable(false); // bloqueando menu
  }

  autenticar() {

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;

    this.template.loading.then(load=>{ // mensagem carregando

      this.auth.signInWithEmailAndPassword(user,pass).then(data=>{ 
        load.dismiss(); 
        this.menuCtrl.enable(true); 
        this.navCtrl.navigateRoot(['clientes']); 
      }).catch(data=>{
        
        load.dismiss(); 
        this.template.myAlert("Erro ao atenticar");
      })

    })

  }

  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      username : ['',[Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
  }


}
