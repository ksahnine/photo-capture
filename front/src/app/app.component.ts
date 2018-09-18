import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  @ViewChild("snapshot")
  public snapshot: ElementRef;

  @ViewChild("preview")
  public preview: ElementRef;

  public captures: Array<any>;

  public hasPicture = false;
  title = 'app';
  articles:Article[] = [];
  article = new Article();
  loading = false;

  constructor(private http: Http) {
    //this.articles = ELEMENT_DATA;
    this.captures = [];
    this.list();
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
      /*if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
              this.video.nativeElement.src = window.URL.createObjectURL(stream);
              this.video.nativeElement.play();
          });
      }*/
  }

  public capture() {
    this.snapshot.nativeElement.click();
      //var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
      //this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  public gotThePicture() {
    this.hasPicture = true;
    var file    = this.snapshot.nativeElement.files[0];
    var reader  = new FileReader();

    var that = this;
    reader.onloadend = function () {
      that.preview.nativeElement.onload = function() {
        var width = this.width;     // here we can extract image size
        var height = this.height;
        // set canvas size here as well before drawing the image in
        // continue you code from here using f.ex. a callback
        //document.write("w: " + w + " h: " + h);
        var ctx = that.canvas.nativeElement.getContext("2d");
        
        var MAX_WIDTH = 800;
        var MAX_HEIGHT = 600;
        //var width = that.preview.nativeElement.width ;
        //var height = that.preview.nativeElement.height ;
        
        /*if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }*/
        that.canvas.nativeElement.width = width;
        that.canvas.nativeElement.height = height;
        ctx.drawImage(that.preview.nativeElement, 0, 0, width, height);
        
        var dataurl = that.canvas.nativeElement.toDataURL("image/png", 0.2);
  
        that.article.photo = dataurl;  
      }
      that.preview.nativeElement.src = reader.result;
      //that.article.photo = reader.result;

    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      that.preview.nativeElement.src = "";
    }
  
  }

  public list() {
    this.http.get('/api/articles').subscribe(
      data => this.articles = data.json().data.articles
    );
  }

  public add() {
    this.loading = true;
    this.http.post('/api/articles', this.article).subscribe(
      ack => this.list(),
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  public delete(articleId) {
    this.http.delete(`/api/articles/${articleId}`).subscribe(ack => this.list());    
  }

}

export class Article {
  constructor() { 
    this.available = false
  }
  id: number;
  title: string;
  description: string;
  photo: string;
  available: boolean;
}
