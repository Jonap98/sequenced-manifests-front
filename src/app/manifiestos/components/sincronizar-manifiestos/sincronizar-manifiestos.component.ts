import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VerManifiestosService } from '../../services/ver-manifiestos.service';

@Component({
  selector: 'sincronizar-manifiestos',
  templateUrl: './sincronizar-manifiestos.component.html',
  styleUrls: ['./sincronizar-manifiestos.component.css']
})
export class SincronizarManifiestosComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private manifiestosService: VerManifiestosService
  ) {}

  @Output()
  public onSyncData = new EventEmitter<string>();

  public syncForm?: FormGroup;
  ngOnInit(): void {
    this.syncForm = this.fb.group({
      num_serie: [''],
    });
  }

  onSincronizar() {
    if( this.syncForm!.invalid )
      return

    this.onSyncData.emit( this.syncForm!.value.num_serie );

    this.syncForm?.reset();
  }

}
