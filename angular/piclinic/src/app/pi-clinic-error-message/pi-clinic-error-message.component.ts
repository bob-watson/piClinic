import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pi-clinic-error-message',
  templateUrl: './pi-clinic-error-message.component.html',
  styleUrls: ['./pi-clinic-error-message.component.css']
})
export class PiClinicErrorMessageComponent implements OnInit {

  @Input() errorMessageText: string;

  constructor() {
    this.errorMessageText = "Initial message text.";
  }

  errorMessageToShow(): boolean {
    if (this.errorMessageText.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }

}
