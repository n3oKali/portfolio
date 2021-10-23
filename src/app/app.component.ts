import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Response } from './response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  items = ['perm_identity', 'mail', 'date_range', 'room', 'call', 'lock'];
  titles = ['Hi, My name is', 'My email address is', 'My birthday is', 'My address is', 'My phone number is', 'My password is'];
  imageURL = '';
  info = [];
  currentItem:number = 0;

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.getUserInformations().subscribe((data: Response)=>{
      var result = data.results[0];
      this.imageURL = result.picture.large;
      this.info.push(result.name.first + ' ' + result.name.last)
      this.info.push(result.email)
      var date = new Date(result.dob.date);
      this.info.push(date.toLocaleDateString("en-US"))
      this.info.push(result.location.street.number + ' ' + result.location.street.name)
      this.info.push(result.phone)
      this.info.push(result.login.password)
    })
  }

  getCurrentTitle(){
    return this.titles[this.currentItem];
  }

  getCurrentValue(){
    return this.info[this.currentItem];
  }
}