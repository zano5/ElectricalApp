import { Component, OnInit,ViewChild  } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
// import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { IonContent } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { Filesystem } = Plugins;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  // @ViewChild(IonContent,{static : true}) content: IonContent;
  @ViewChild(IonInfiniteScroll,{static : true}) infiniteScroll: IonInfiniteScroll;
  URL = '/sign-in'
  request : any;
  user : any;
  // ,private downloader: Downloader
  constructor(public service: AuthServiceService) { }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.request.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  // ScrollToBottom(){
  //   this.content.scrollToBottom(1500);
  // }
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

  
  run(){

  //   var request: DownloadRequest = {
  //     uri: 'YOUR_URI',
  //     title: 'MyDownload',
  //     description: '',
  //     mimeType: '',
  //     visibleInDownloadsUi: true,
  //     notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
  //     destinationInExternalFilesDir: {
  //         dirType: 'Downloads',
  //         subPath: 'MyFile.apk'
  //     }
  // };

  // this.downloader.download(request)
  // .then((location: string) => console.log('File downloaded at:'+location))
  // .catch((error: any) => console.error(error));

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
    

      { text: 'SEKHASIMBE CONSIETIOUS COMPANY', style: 'header' },
      { text: 'Reference number: '+ this.request[i].refNo , style: 'sub_header' },
      { text: 'Request Issued date : '+ this.request[i].stamp, style: 'sub_header' },
      { text: 'Electrical Technology Supplier & Services Provider', style: 'sub_header' },
      { text: 'WEBSITE: under-construction', style: 'url' },
    'Service' + 'Cost ',
      this.request[i].service  +
      this.request[i].serviceDesc,
     
      {
      style: 'tableExample',
			table: {
				widths: ['*', 'auto'],
				body: [
          // [this.request[i].service, this.request[i].service.cost],
					[this.request[i].serviceDesc,this.request[i].service],
				]
			}
    }
    //  { layout: 'lightHorizontalLines', // optional
    //     table: {
    //       // headers are automatically repeated if the table spans over multiple pages
    //       // you can declare how many rows should be treated as headers
    //       headerRows: 1,
    //       widths: [ '*', 'auto', 100, '*' ],

          // body: [
          //   [ {text : 'Service Requested'},
          //     {text : this.request[i].service},]
          //   // [ { text: this.request[i].serviceDesc}],
          //   // [ { text: 'Requested Date&Time : '+ this.request[i].date, bold: true }],
          //   // [ { text: +this.request[i].distance +' KM', bold: true }, 'R '+this.request[i].calloutFee]
          // ]
    //     }
    //   }
      ],
      styles: {
          header: {
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin : 20 
          },
          sub_header: {
          fontSize: 18,
          alignment: 'left'
          
          },
          url: {
          fontSize: 16,
          alignment: 'left',
          margin :[ 0,0,0,45] 
          }
          },
        pageSize: 'A4',
        pageOrientation: 'portrait'};

      // ]
      
      // }
      // ],
      // styles: {
      //   header: {
      //   bold: true,
      //   fontSize: 20,
      //   alignment: 'right'
      //   },
      //   sub_header: {
      //   fontSize: 18,
      //   alignment: 'right'
      //   },
      //   url: {
      //   fontSize: 16,
      //   alignment: 'right'
      //   }
      //   },
      // pageSize: 'A4',
      // pageOrientation: 'portrait'
      // };

      console.log(this.request[i])
      console.log("*** print pdf")
    pdfMake.createPdf(invoiceDoc).download();

    // let contents = await Filesystem.readFile({
    //   path: 'secrets/text.txt',
    //   directory: FilesystemDirectory.Documents,
    //   encoding: FilesystemEncoding.UTF8
    // });
    // console.log(contents);


  //   var request: DownloadRequest = {
  //     uri: pdfMake.createPdf(invoiceDoc).download(),
  //     title: 'MyDownload',
  //     description: 'first',
  //     mimeType: '',
  //     visibleInDownloadsUi: true,
  //     notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
  //     destinationInExternalFilesDir: {
  //         dirType: 'Downloads',
  //         subPath: 'MyFile.apk'
  //     }
  // };
  //   this.downloader.download(request)
  // .then((location: string) => console.log('File downloaded at:'+location))
  // .catch((error: any) => console.error(error));

  }

}
