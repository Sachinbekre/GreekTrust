import { Component } from '@angular/core';
import { AppService } from './app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dashboardService: AppService) {}
  public planets_details;
  public vehicles_details;
  public vehicleNames = [];
  public planeNames = [];
  public planet_name:string;
  public falconeShow: boolean;
  public time_took: number = 0;
  public message:string;
  public token : any;
  public abc:string;
  public text_color:string;
  public header_text ='Select planets you want to search in';
  public sel_val1;
  public sel_val2;
  public sel_val3;
  public sel_val4;
  public input_value1;
  public input_value2;
  public input_value3;
  public input_value4;

  ngOnInit() {
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }

  getPlanets() {
    this.dashboardService.getPlanets().subscribe(
      (response) => {
        this.planets_details = response;
      },
      (error) => {}
    );
  }
  getVehicles() {
    this.dashboardService.getvehicle().subscribe(
      (res: any) => {
        this.vehicles_details = res;
      },
      (error) => {}
    );
  }
  
  getToken() {
    this.dashboardService.getToken().subscribe(
      (response) => {
        this.token = response;
      },
      (error) => {}
    );
  }




  
  s1(val) {
    this.sel_val1 = val;
    console.log(val);
  }

  i1(value) {
    this.input_value1 = value;
    console.log(value);
    this.planets_details.forEach((el1) => {
      this.vehicles_details.forEach((el2) => {
        if (value == el2.name && this.sel_val1 == el1.name) {
          let time = el1.distance / el2.speed;
          this.time_took += time;
        }
      });
    });
  }

  s2(val) {
    this.sel_val2 = val;
    console.log(val);
  }

  i2(value) {
    this.input_value2 = value;
    console.log(value);
    this.planets_details.forEach((el1) => {
      this.vehicles_details.forEach((el2) => {
        if (value == el2.name && this.sel_val2 == el1.name) {
          let time = el1.distance / el2.speed;
          this.time_took += time;
        }
      });
    });
  }

  s3(val) {
    this.sel_val3 = val;
    console.log(val);
  }

  i3(value) {
    this.input_value3 = value;
    this.planets_details.forEach((el1) => {
      this.vehicles_details.forEach((el2) => {
        if (value == el2.name && this.sel_val3 == el1.name) {
          let time = el1.distance / el2.speed;
          this.time_took += time;
        }
      });
    });
  }

  s4(val) {
    this.sel_val4 = val;
    console.log(val);
  }

  i4(value) {
    this.input_value4 = value;
    this.planets_details.forEach((el1) => {
      this.vehicles_details.forEach((el2) => {
        if (value == el2.name && this.sel_val4 == el1.name) {
          let time = el1.distance / el2.speed;
          this.time_took += time;
        }
      });
    });
  }

  start_again() {
    this.falconeShow = false;
    window.location.reload();
  }

  findFalcone() {
    this.planeNames = [this.sel_val1, this.sel_val2, this.sel_val3, this.sel_val4];
    this.vehicleNames =[this.input_value1,this.input_value2,this.input_value3,this.input_value4]
    let object = {
      token: this.token.token,
      planet_names: this.planeNames,
      vehicle_names: this.vehicleNames,
    };
    this.dashboardService.findFalcone(object).subscribe(
      (res: any) => {
        if(res.status == "success"){
          this.message = "Congradulations on Finding Falcone. King Shan is mighty pleased"
          this.text_color = 'green';
          this.falconeShow = true;
          this.planet_name = res.planet_name;
        }
        if (res.status == "false") {
           this.message =
            "Failure ! Could not find the Falcone, please try different Planets";
            this.planet_name = 'Not found';
            this.text_color = 'red';
            this.falconeShow = true;
        }
      },
      (err) => {
        console.log("error", err.error);
      }
    );
  }
}
