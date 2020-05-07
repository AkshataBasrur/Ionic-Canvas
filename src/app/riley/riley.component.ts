import {
  NgModule,
  Component,
  OnInit,
  Renderer,
  ViewChild,
  AfterViewInit,
  HostListener,
} from "@angular/core";
import { Platform } from "@ionic/angular";

@NgModule({
  declarations: [RileyComponent],
})
@Component({
  selector: "app-riley",
  templateUrl: "./riley.component.html",
  styleUrls: ["./riley.component.scss"],
})
export class RileyComponent implements OnInit, AfterViewInit {
  constructor(public platform: Platform, public renderer: Renderer) {}

  ngOnInit() {}

  @ViewChild("myCanvas", { static: false }) theCanvas;

  c: CanvasRenderingContext2D;
  window: any;
  context: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.c = this.theCanvas.nativeElement.getContext("2d");
    this.renderer.setElementAttribute(
      this.theCanvas.nativeElement,
      "width",
      window.innerWidth + ""
    );
    this.renderer.setElementAttribute(
      this.theCanvas.nativeElement,
      "height",
      this.platform.height() + ""
    );
    this.drawCircles(0);
  }

  // @HostListener("window:deviceorientation", ["$event"])
  // handleMotion(event) {
  //   console.log(event);
  //   let gx = event.beta;
  //   let gy = event.gamma;
  //   if (gx > 90) {
  //     gx = 90;
  //   }
  //   if (gx < -90) {
  //     gx = -90;
  //   }
  //   this.drawCircles(gx * 1.5);
  // }

  @HostListener("window:devicemotion", ["$event"])
  handleMotion(event) {
    let gx = event.accelerationIncludingGravity.x;
    let gy = event.accelerationIncludingGravity.y;
    if (gx > 90) {
      gx = 90;
    }
    if (gx < -90) {
      gx = -90;
    }
    this.drawCircles(gx * 1.5);
  }

  toRadians(deg) {
    return (deg * Math.PI) / 180;
  }
  drawCircles(y1) {
    var width = this.platform.width();
    var height = this.platform.height();

    this.c = this.theCanvas.nativeElement.getContext("2d");
    var cw = width / 2;
    var ch = height / 2;
    var wradius = cw * 2;
    var hradius = ch * 2;
    for (var j = 0; j < 4; j++) {
      this.c.beginPath();
      let startAngle = 250;
      let endAngle = startAngle + 20;
      wradius =
        wradius == cw * 2 - 0.21 * cw && j == 1
          ? 0.67 * cw
          : wradius - 0.21 * cw;
      hradius =
        hradius == ch * 2 - 0.21 * ch && j == 1
          ? 0.67 * ch
          : hradius - 0.21 * ch;

      for (var i = 0; i <= 360 / 18; i++) {
        this.c.beginPath();
        var cx = width / 2;
        var cy = height / 2;
        startAngle = startAngle == 360 ? 0 : startAngle + 20;
        endAngle = startAngle == 360 ? 20 : startAngle + 20;
        this.c.moveTo(cx, cy);
        this.c.ellipse(
          cx,
          cy,
          wradius + 20,
          hradius,
          0,
          this.toRadians(startAngle),
          this.toRadians(endAngle)
        );
        this.c.lineTo(cx, cy);
        this.c.closePath();
        if ((i % 2 != 0 && j % 2 == 0) || (j % 2 != 0 && i % 2 == 0)) {
          if (j != 0) {
            var color = [];
            for (var ij = 0; ij < 3; ij++) {
              color.push(Math.floor(Math.random() * 256));
            }
            this.c.fillStyle = "rgb(" + color.join(",") + ")";
          } else this.c.fillStyle = "black";
          this.c.fill();
        } else {
          this.c.fillStyle = "white";
          this.c.fill();
        }
      }
      if (j == 0) {
        this.c.beginPath();
        this.c.translate(cx, cy);
        this.c.rotate((y1 * Math.PI) / 180);
        this.c.translate(-cx, -cy);
      }
    }
  }
}
