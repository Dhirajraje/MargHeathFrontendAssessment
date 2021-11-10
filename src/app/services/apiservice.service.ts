import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private http: HttpClient) {}
  getAllMedicines(pageNumber: any, pageSize: any) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line max-len
      this.http
        .get(
          environment.db.apiUrl +
            environment.db.getAllMedicines +
            '?pageNumber=' +
            pageNumber +
            '&pageSize=' +
            pageSize
        )
        .subscribe(
          (resp) => {
            // console.log(resp);
            resolve(resp);
          },
          (err) => {
            console.log('err: ', err);
            reject();
          }
        );
    });
  }
  async uploadCSV(file: any) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.db.apiUrl + environment.db.uploadFile, formData)
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            console.log('err: ', err);
            reject();
          }
        );
    });
  }
}
