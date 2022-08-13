import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pi-clinic-app-menu',
  templateUrl: './pi-clinic-app-menu.component.html',
  styleUrls: ['./pi-clinic-app-menu.component.css']
})
export class PiClinicAppMenuComponent implements OnInit {

  @Input()  currentPage: string;

  constructor() {
    this.currentPage = "";
  }

  ngOnInit(): void {
  }

}
