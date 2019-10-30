import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'gamezeug-tables';

  constructor(private http: HttpClient) { }

  onClickMe() {
    this.getTest().subscribe((data: string) => this.title = data);
  }

  getTest() {
    return this.http.get('http://localhost:8081/test');
  }

}
