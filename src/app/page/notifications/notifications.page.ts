import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { Filesystem } = Plugins;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  URL = '/sign-in'
  request : any;
  user : any;
  constructor(public service: AuthServiceService) { }

  ngOnInit() {
    // this.NotificationService.getUser(this.URL)
    this.service.gotUser().subscribe((user) =>{
      this.user = user;
      console.log(this.user);
    })

    this.service.viewRequest().subscribe((err) =>{
      this.request = err;
      console.log(this.request);
    })
  }

  
async fileRead() {
  let contents = await Filesystem.readFile({
    path: 'secrets/text.txt',
    directory: FilesystemDirectory.Documents,
    encoding: FilesystemEncoding.UTF8
  });
  console.log(contents);
}

  invoice(i){
    // pdfmake.vfs = pdfFonts.pdfMake.vfs;
    console.log(i)
    var invoiceDoc = {
      content: [
      {
      columns: [
      // {
      // image: 'data:image/jpeg;../../../assets/images/scc.jpeg',
      // fit: [100, 100]
      // },
      [

      { text: 'SEKHASIMBE CONSIETIOUS COMPANY', style: 'header' },
      { text: 'Reference number: '+ this.request[i].refNo , style: 'sub_header' },
      { text: 'Request Issued date : '+ this.request[i].stamp, style: 'sub_header' },
      { text: 'Electrical Technology Supplier & Services Provider', style: 'sub_header' },
      { text: 'WEBSITE: under-construction', style: 'url' },
      { text: 'hey', style: 'display:none' },
     { layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*', 'auto', 100, '*' ],

          body: [
            [ 'First', 'Second', 'Third', 'The last one' ],
            [  this.request[i].service, 'R '+this.request[i].serviceCost , 'third', 'last one' ],
            // [ { text: this.request[i].serviceDesc}],
            [ { text: 'R '+this.request[i].serviceCost}, 'Val 2', 'Val 3', 'Val 4' ],
            // [ { text: 'Requested Date&Time : '+ this.request[i].date, bold: true }, 'Val 3' ],
            // [ { text: 'Distance '+this.request[i].distance +' KM', bold: true }, 'R '+this.request[i].calloutFee, 'Val 4' ]
          ]
        }
      }
      ]
      ]
      
      }
      ],
      styles: {
      header: {
      bold: true,
      fontSize: 20,
      alignment: 'right'
      },
      sub_header: {
      fontSize: 18,
      alignment: 'right'
      },
      url: {
      fontSize: 16,
      alignment: 'right'
      }
      },
      pageSize: 'A4',
      pageOrientation: 'portrait'
      };

      console.log(this.request[i])
      console.log("*** print pdf")
    pdfMake.createPdf(invoiceDoc).download();

  }

}
