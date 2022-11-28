let ALTURA = 500;
let LARGURA = 500;
let P1;
let GRAVIDADE = 0.7;
let FORCA_DO_PULO = -6;
let teclas = {};
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let motor  = null;
let objetos = [];

window.addEventListener('keydown',(ev)=>{pressionou(ev)});
window.addEventListener('keyup',(ev)=>{soltou(ev)});
let MAPEAMENTO = {
    frente:'d',
    tras:'a',
    cima:'w'
}

class Jogador{
    constructor(posicao){
        this.posicao = posicao;
        this.largura = 10;
        this.aceleracaoMaxima = 6;//velocidade maxima
        this.fatorAceleracao  = 0.2;//fator de aumento
        this.altura = 10;
        this.duploPulo = true;
        this.player1 = false;
        this.aceleracao = {
            x:1,
            y:0
        }
    }

    noChao(){
        if(this.posicao.y+this.altura<ALTURA)return false;
        return true;
    }

    bloqueado(lado){
        if(this.posicao.x<=0 && lado=='esquerda'){
            this.posicao.x = 0;
            return true;
        }
        if(this.posicao.x+this.largura>=LARGURA && lado=='direita'){
            this.posicao.x = LARGURA-this.largura;
            return true;
        }

        return false;
    }

    processarGravidade(){
        if(!this.noChao())this.posicao.y = this.posicao.y+this.aceleracao.y;
        this.aceleracao.y+=GRAVIDADE;
    }

    atualizar(ctx){
        
        ctx.fillStyle = "#FF0000";
        if(this.player1) ctx.fillStyle = "#00FF00";
        this.processarGravidade();
        // console.log('queda ',this.aceleracao.y)
        if(this.noChao()){
            this.aceleracao.y = 0;
            this.posicao.y = ALTURA-this.altura;
        }
        if(this.player1){
            if(teclas.frente && !this.bloqueado('direita')){
                this.posicao.x = this.posicao.x+this.aceleracao.x;
                if(this.aceleracao.x<=this.aceleracaoMaxima){
                    this.aceleracao.x+=this.fatorAceleracao;
                }
                
            }
            if(teclas.tras && !this.bloqueado('esquerda')){
                this.posicao.x = this.posicao.x-this.aceleracao.x;
                if(this.aceleracao.x<=this.aceleracaoMaxima){
                    this.aceleracao.x+=this.fatorAceleracao;
                }
            }
        }
       
        ctx.fillRect(this.posicao.x,this.posicao.y,this.largura,this.altura);
    }



}

//=========Configuração=====================
    P1 = new Jogador({x:450,y:0});
    P1.player1 = true;    
    objetos.push(P1);
    objetos.push(new Jogador({
        x:60,
        y:20
    }));
    motor = setInterval(()=>{
        desenhar();
    },1000/60);

//========Ignição==========================

    function desenhar(){
        branco(); 
        objetos.forEach(ob=>{ob.atualizar(ctx);});
    }

    function branco(){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0,0,LARGURA,ALTURA);
    }

    function pressionou(ev){
        // console.log(ev);
        if(ev.key==MAPEAMENTO.cima){
            if(P1.noChao()){
                P1.duploPulo = true;
                P1.posicao.y--;      
                P1.aceleracao.y=FORCA_DO_PULO; 
            }else if(P1.duploPulo){
                P1.duploPulo = false;
                P1.aceleracao.y=FORCA_DO_PULO; 
            }
              
        }
        if(ev.key==MAPEAMENTO.frente)teclas.frente = true;
        if(ev.key==MAPEAMENTO.tras)teclas.tras = true;
    }

    function soltou(ev){
        if(ev.key==MAPEAMENTO.frente){
            teclas.frente = false;
            P1.aceleracao.x = 1;
        }
        if(ev.key==MAPEAMENTO.tras){
            teclas.tras = false;
            P1.aceleracao.x = 1;
        }
        
    }

