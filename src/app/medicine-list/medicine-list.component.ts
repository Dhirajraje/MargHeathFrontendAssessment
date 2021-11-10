import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss'],
})
export class MedicineListComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  lable = 'Select file:';
  count: any;
  allMedicines: any;
  constructor(public serviceServices: ApiserviceService) {}

  ngOnInit(): void {
    this.getAllMedicine();
  }
  getAllMedicine() {
    this.serviceServices
      .getAllMedicines(this.pageNumber, this.pageSize)
      .then((resp: any) => {
        console.log(resp);
        this.allMedicines = resp.data.data;
        this.count = resp.data.count;
      });
  }
  changePage(event: any) {
    this.pageNumber = event;
  }
  uploadFile(event: any) {
    this.lable = 'Uploading file';
    this.serviceServices.uploadCSV(event.target.files[0]).then((data) => {
      this.lable = 'Uploaded, select another file:';
      this.getAllMedicine();
    });
  }
}
