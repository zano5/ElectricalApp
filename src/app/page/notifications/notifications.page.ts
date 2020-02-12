import { Component, OnInit,ViewChild  } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { IonContent } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { observable } from 'rxjs';
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
  arr : [];
  
  constructor(private previewAnyFile: PreviewAnyFile,public service: AuthServiceService,private downloader: Downloader) { }

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
  runPdf(){
    alert('download strating ..')
    var url = "https://firebasestorage.googleapis.com/v0/b/eletrical-engineer-cms.appspot.com/o/pdf%2FSCC(PTY)LTD%20COMPANY%20PROFILE%202019%20%20(1).pdf?alt=media&token=f3c42c70-3a3a-4574-b53a-b3b28f2e6cad";

    this.previewAnyFile.preview(url).then(() => {

    },(err) =>{
      alert(JSON.stringify(err));
    })
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
    this.arr = [];
    this.service.viewRequest().subscribe((err) =>{
      this.request = err;
      this.arr = this.request;
      
      console.log(this.arr)
      let a = 0;
      // if(this.arr.length > 0){
      //   console.log("IN")
      // }
      // else {
      //   console.log("")
      // }
      // for (a; a < this.arr.length;a++) {

      // }
      console.log(this.request);
      let c = 0;
      // for(a;a < this.request.length;a++) {
      //   if(this.request[a].ictObj[a].length > "5"){
      //     console.log(this.request[a].ictObj[a]+ " service booked")
      //   }
      //   else{
      //     console.log("Sorry no service booked")
      //   }
        
      // }
     
    })
  }

  
  run(){

    var request: DownloadRequest = {
      uri: 'YOUR_URI',
      title: 'MyDownload',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: 'MyFile.apk'
      }
  };

  this.downloader.download(request)
  .then((location: string) => console.log('File downloaded at:'+location))
  .catch((error: any) => console.error(error));

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
    pdfMake.createPdf(invoiceDoc).download().then((err) =>{
      console.log(err)
    });

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
