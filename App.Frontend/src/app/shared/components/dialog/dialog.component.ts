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

  constructor() {}

  ngOnInit() {}

  close() {
    this.closeModalBtn.nativeElement.click();
  }
}
