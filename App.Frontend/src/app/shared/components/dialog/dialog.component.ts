import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: false,
})
export class DialogComponent implements OnInit {
  @Input() dialogId!: string;

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('openModalBtn') openModalBtn!: ElementRef;

  constructor() {}

  ngOnInit() {}
  open() {
    this.openModalBtn.nativeElement.click(); // simulate open
  }
  close() {
    this.closeModalBtn.nativeElement.click();
  }
}
