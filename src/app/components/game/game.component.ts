import { Component, OnInit } from '@angular/core';
import { Squares } from '../../squares';
import { SquareClass } from '../../square';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  squares:SquareClass[] = Squares;
  choosed:SquareClass[] = [];
  player1choose = "";
  player2choose = "";
  turno = "";
  finjuego = "";
  ganador = "";
  constructor(
  ) { }
  //FUNCIÓN QUE REINICIA EL JUEGO
  reiniciaJuego(){
    this.limpiarSquares();
    this.choosed = [];
    this.player1choose = "";
    this.player2choose = "";
    this.turno = "";
  }
  //AL INICIAR EL JUEGO TODO SE LIMPIA
  ngOnInit(): void {
    this.squares = Squares;
    this.finjuego = "TIC-TAC-TOC";

  }
  limpiarSquares(){
    for(let square of Squares){
      square.content = "";
    }
  }
  //ELEGIR EL CARACTER POR JUGADOR
  activedPlayer1(optionChoosed:string){
    this.player1choose = optionChoosed;
    switch(optionChoosed){
      case 'X':this.player2choose = 'O';break;
      case 'O': this.player2choose = 'X';break; 
    }
    this.limpiarSquares();
    this.squares = Squares;
    this.finjuego = "INICIA JUEGO";
    this.choosed = [];
    this.turno = this.player1choose;
    this.ganador = "";
  }
  //ES EL TURNO DEL OTRO PARTICIPANTE
  cambiarTurno(actual:string){
    switch(actual){
      case "X":
        this.turno = "O";
        break;
      case "O":
        this.turno = "X";
        break;
    }
  }
  
  victoria(){
    let encontro = false;
    for(let i=0;i<7;i=i+3){
  
      let example = this.squares[i].content;
      if(example == this.squares[i+1].content &&
         example == this.squares[i+2].content &&
         example != "" &&
         this.squares[i+1].content!="" &&
         this.squares[i+2].content!=""){
        encontro = true;
        this.ganador = example;
        console.log("victoria");
      }
    }
    console.log('terminado');
    for(let i=0;i<3;i++){
      let example = this.squares[i].content;
      if(example == this.squares[i+3].content &&
         example == this.squares[i+6].content &&
         example != "" && 
         this.squares[i+3].content != "" && 
         this.squares[i+6].content != ""){
        encontro = true;
        this.ganador = example;
        console.log('victoria')
      }
    }
    if(this.squares[0].content == this.squares[4].content &&
      this.squares[4].content == this.squares[8].content &&
      this.squares[0].content != "" &&
      this.squares[4].content != "" &&
      this.squares[8].content != ""){
        encontro = true;
        this.ganador = this.squares[0].content;
        console.log('victoria')
    }
    if(this.squares[2].content == this.squares[4].content &&
        this.squares[4].content == this.squares[6].content &&
        this.squares[3].content != "" &&
        this.squares[4].content != "" &&
        this.squares[6].content != ""){
          encontro = true;
          this.ganador = this.squares[2].content;
          console.log('victoria')
    }
    console.log('terminado2');
    return encontro;
  }

  choose(row:number,column:number){
    if(this.turno != ""){
      this.finjuego="";
      let index = this.squares.findIndex(square=>square.column === column && square.row === row);
      this.squares[index].content = this.turno;
      let newChoose = new SquareClass();
      newChoose.row = row;
      newChoose.column = column;
      newChoose.content = this.turno;
      this.choosed.push(newChoose);
   
      if(this.choosed.length==9 || this.victoria()){
        this.finjuego = "FIN DEL JUEGO, ELIJA NUEVAMENTE LOS ROLES";
        if(this.victoria()){
          this.ganador = this.turno;
        }
        this.reiniciaJuego();
      }
      this.cambiarTurno(this.turno);
    }else{
      this.finjuego="NO ESCOGE AUN ROLES";
    }
    
  }

}
