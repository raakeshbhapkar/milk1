import { Input,Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector:'[hideElementDirective]'
})
export class hideshowDirective {
 

 constructor(private el:ElementRef){
 
   //el.nativeElement.style.background="red"
   // console.log(888888888);
}
@Input() set hideElementDirective(isHidden){
 
  console.log("isHidden",isHidden)
  
    if(isHidden){
      console.log("if");
  //  this.el.nativeElement.style.background="#fff";
  // setTimeout(() => {
    this.el.nativeElement.focus();
    //},1500);
    }else{
       console.log("else");
     //this.el.nativeElement.style.background="#000";
    }
    this.el.nativeElement.focus();
    // @HostListener('mouseover') onHover() {
    // console.log(77777);
    //   this.hilightColor("#000")
    // }
    // @HostListener('mouseleave') onMouseLeave() {
    //   console.log(77777);
    //   this.hilightColor("#fff")
    // }
    // public hilightColor(color){
    //   this.el.nativeElement.style.background=color
    // }
 
 }
 

 }


