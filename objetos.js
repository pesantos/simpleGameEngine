let altura = 500;
let largura = 500;
let GRAVIDADE = 0.7;
let teclas = {};

class Jogador{
    constructor(posicao){
        this.posicao = posicao;
        this.largura = 10;
        this.aceleracaoMaxima = 6;//velocidade maxima
        this.fatorAceleracao  = 0.2;//fator de aumento
        this.altura = 10;
        this.player1 = false;
        this.aceleracao = {
            x:1,
            y:0
        }
    }

    noChao(){
        if(this.posicao.y+this.altura<altura)return false;
        return true;
    }

    bloqueado(lado){
        if(this.posicao.x<=0 && lado=='esquerda'){
            this.posicao.x = 0;
            return true;
        }
        if(this.posicao.x+this.largura>=largura && lado=='direita'){
            this.posicao.x = largura-this.largura;
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
            this.posicao.y = altura-this.altura;
        }
        if(this.player1){
            if(teclas.frente && !this.bloqueado('direita')){
                this.posicao.x = this.posicao.x+this.aceleracao.x;
                if(this.aceleracao.x<=this.aceleracaoMaxima){
                    this.aceleracao.x+=this.fatorAceleracao;
                }
                
            }
            if(teclas.tras && !this.bloqueado('esquerda'))this.posicao.x = this.posicao.x-this.aceleracao.x;
        }
       
        ctx.fillRect(this.posicao.x,this.posicao.y,this.largura,this.altura);
    }
}

