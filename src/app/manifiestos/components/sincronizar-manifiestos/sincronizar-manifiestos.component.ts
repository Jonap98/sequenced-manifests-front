import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
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

  @Input()
  public titulo?: string;

  @Input()
  public bySerial?: boolean;

  @Output()
  public onSyncData = new EventEmitter<string>();

  public syncForm?: FormGroup;
  ngOnInit(): void {
    this.syncForm = this.fb.group({
      factor_sincronizacion: [''],
      by_serial: [false]
    });
  }

  onSincronizar() {
    if( this.syncForm!.invalid )
      return

    this.syncForm!.value.by_serial = this.bySerial;

    this.onSyncData.emit( this.syncForm!.value );

    this.syncForm?.reset();
  }

}
