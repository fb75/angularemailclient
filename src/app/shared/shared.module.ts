import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo reactive forms nel modulo
import { ReactiveFormsModule } from '@angular/forms';
// riutilizzo e condivido in altri moduli il componente esportandolo e reimportandolo in altri moduli
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [InputComponent, ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InputComponent, ModalComponent]
})
export class SharedModule { }
