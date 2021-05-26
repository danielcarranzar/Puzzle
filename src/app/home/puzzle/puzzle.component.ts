import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {

  imagenes = [
    'imagen-0', 'imagen-1', 'imagen-2',
    'imagen-3', 'imagen-4', 'imagen-5',
    'imagen-6', 'imagen-7', 'imagen-8'
];
terminado = this.imagenes.length;
intentos:number=12;
item:number=0;
id:number=0;
@ViewChild ('piezas') piezas : ElementRef | any;


  constructor() { 
   
  }

  ngOnInit(): void {
    this.mezclar();
  }

  dragStart(e:any,id:any){      
    e.dataTransfer.setData('id', e.target.id);
    this.item = (e.target.src.split('-')[2]).split('.')[0]; 
    this.id =e.target.id.split('-')[1]
  }

  
  dragOver(e:any){
    e.preventDefault();
    e.target.classList.add('hover');   
  }

  dragLeave(e:any){
    e.target.classList.remove('hover');
  }

  drop(e:any){
    this.intentos--;
    e.target.classList.remove('hover');
    
            if (e.target.dataset.id == this.item) {
                e.target.appendChild(document.getElementById("pieza-"+this.id));               
                this.terminado--;

                if (this.terminado === 0 && this.intentos>0) {                  
                    document.body.classList.add('ganaste');
                }
                
                if(this.intentos<=0){
                 alert("Intentos agotados")
                 location.reload()
                }
            }
  }


  mezclar(){
    
    while (this.imagenes.length) {

      const piezas = document.getElementById("pieza-"+(this.imagenes.length-1)) as HTMLInputElement;
      const index = Math.floor(Math.random() * this.imagenes.length);     
      piezas.src="../../../assets/images/puzzle-01/"+this.imagenes[index]+".jpg";      
      this.imagenes.splice(index, 1);
  }
      this.imagenes = [
        'imagen-0', 'imagen-1', 'imagen-2',
        'imagen-3', 'imagen-4', 'imagen-5',
        'imagen-6', 'imagen-7', 'imagen-8'
    ];
  
  }
  

 

}
