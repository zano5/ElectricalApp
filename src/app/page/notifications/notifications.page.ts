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
  obj : any;
  
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
    
    var url = "data:application/pdf;base64,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MjcwLjk5NjA5NCAxMTQ4LjQzNzUgMTA1Ni4xNTIzNDRdCi9JdGFsaWNBbmdsZSAwCi9Bc2NlbnQgOTI3LjczNDM3NQovRGVzY2VudCAtMjQ0LjE0MDYyNQovQ2FwSGVpZ2h0IDcxMC45Mzc1Ci9YSGVpZ2h0IDUyOC4zMjAzMTMKL1N0ZW1WIDAKL0ZvbnRGaWxlMiAxNSAwIFIKPj4KZW5kb2JqCjE3IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9DSURGb250VHlwZTIKL0Jhc2VGb250IC9BWlpaWlorUm9ib3RvLVJlZ3VsYXIKL0NJRFN5c3RlbUluZm8gPDwKL1JlZ2lzdHJ5IChBZG9iZSkKL09yZGVyaW5nIChJZGVudGl0eSkKL1N1cHBsZW1lbnQgMAo+PgovRm9udERlc2NyaXB0b3IgMTYgMCBSCi9XIFswIFs5MDggNTkzLjI2MTcxOSA1NjguMzU5Mzc1IDYyNi45NTMxMjUgNzEyLjg5MDYyNSA2NTIuMzQzNzUgMjcxLjk3MjY1NiA4NzMuMDQ2ODc1IDYyMi41NTg1OTQgMjQ3LjU1ODU5NCA2NTAuODc4OTA2IDY4Ny41IDcxMi44OTA2MjUgNTk2LjY3OTY4OCA2NDguNDM3NSA2MzAuODU5Mzc1IDYwMC41ODU5MzggNjE1LjcyMjY1NiA1MjkuNzg1MTU2IDM0Ny4xNjc5NjkgMzM4LjM3ODkwNiA1NTEuNzU3ODEzIDUyMy40Mzc1IDU1MS4yNjk1MzEgODc2LjQ2NDg0NCA1NjEuMDM1MTU2IDI0Mi4xODc1IDU2MS41MjM0MzggNTYxLjUyMzQzOCA1NjEuNTIzNDM4IDU2MS41MjM0MzggNTY4LjM1OTM3NSA1MTUuNjI1IDMyNi42NjAxNTYgNTYzLjk2NDg0NCA1NDMuOTQ1MzEzIDU2MS41MjM0MzggNTYxLjUyMzQzOCA1NjEuNTIzNDM4IDU2MS41MjM0MzggNTYxLjUyMzQzOCAyNDIuNjc1NzgxIDI0Mi42NzU3ODEgNTUwLjc4MTI1IDU3MC4zMTI1IDU2MS4wMzUxNTYgNDczLjE0NDUzMSA1NjEuMDM1MTU2IDYyMS41ODIwMzEgNDg0LjM3NSA4ODcuMjA3MDMxIDI3NS44Nzg5MDZdXQovQ0lE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";
window.open(url);
    this.previewAnyFile.preview(url).then((aa) => {
      alert(" success :"+JSON.stringify(aa))
    },(err) =>{
      alert(" error :"+JSON.stringify(err));
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
          // bold: true,
          fontSize: 20,
          alignment: 'center',
          margin : 20 
          },
          sub_header: {
          fontSize: 12,
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
      const pdfDocGenerator  = pdfMake.createPdf(invoiceDoc)
      ;
      console.log(pdfDocGenerator)
      pdfDocGenerator.getBase64((data) => {
       
        let a = "data:application/pdf;base64," + data;
        // this.runPdf(a);
        console.log("data:application/pdf;base64," + data)
        
        // console.log("data:document/pdf;base64," + data)
        // console.log(a)
        // alert(a);
      });
      // console.log(JSON.stringify(this.obj))
    
  }

}
