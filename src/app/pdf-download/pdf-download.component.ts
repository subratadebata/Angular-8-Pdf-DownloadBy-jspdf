import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.scss']
})
export class PdfDownloadComponent implements OnInit {
  gridDataToShow = [];
  rows = [];
  constructor(private http: HttpClient) {

    const url = 'assets/jsonData/data.json';
    this.http.get(url).subscribe(data => {
      this.gridDataToShow = data as string[];
      console.log(this.gridDataToShow)	 // FILL THE ARRAY WITH DATA.
    }
    );

  }

  ngOnInit() {
  }
  pdfDownload() {
    console.log("pdf called")
    var gridDataToPrint = [];
    const doc = new jsPDF({

      orientation: 'landscape',
      unit: 'in'

    });
    this.gridDataToShow.forEach(element => {
      var temp = [element.firstname, element.middlename, element.lastname, element.designation
      ];
      this.rows.push(temp);

    });
    let columns = ["First Name", "Middle Name", " Last Name ", "Designation"
    ];
    doc.autoTable(columns, this.rows);
    doc.save('Subrata.pdf');


  }
}
