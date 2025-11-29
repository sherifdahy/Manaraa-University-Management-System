import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-universties-page',
  standalone : false,
  templateUrl: './universties-page.component.html',
  styleUrls: ['./universties-page.component.css']
})
export class UniverstiesPageComponent implements OnInit {

  constructor(private httpClient : HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://manaraa.runasp.net/api/Roles?includeDisabled=true').subscribe(response=>{
    })
  }

}
