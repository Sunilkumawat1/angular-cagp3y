import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total time worked</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let employee of employees" [ngClass]="{'less-than-100': employee.totalTime < 100}">
            <td>{{ employee.name }}</td>
            <td>{{ employee.totalTime }}</td>
          </tr>
        </tbody>
      </table>
      <div style="width: 500px; height: 500px;">
        <canvas #myChart></canvas>
      </div>
    </div>
  `,
  styles: [`
    .less-than-100 {
      background-color: #ffcccc;
    }
  `]
})
export class AppComponent implements OnInit {
  employees: any[];
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.http.get<any[]>('https://rc-vault-fap-live1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==')
      .subscribe(data => {
        this.employees = data;
        
        // Set up chart data
        const chartData = {
          labels: this.employees.map(e => e.name),
          datasets: [{
            data: this.employees.map(e => e.totalTime),
            backgroundColor: [
              'red',
              'blue',
              'green',
              'yellow',
              'purple',
              'orange',
              'brown',
              'pink',
              'gray',
              'black'
            ]
          }]
        };
        
        // Create chart
        const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: chartData
        });
      });
  }
}
