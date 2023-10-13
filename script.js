const html = document.querySelector('html');
const focobt = document.querySelector('.app__card-button--foco');
const curtobt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicafoco = document.querySelector('#alternar-musica');
const StartPause = document.querySelector('#start-pause span');
const StartPauseimg = document.querySelector('#start-pause img');
const tempotela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const startmusic = new Audio('/sons/play.wav');
const pausemusic = new Audio('/sons/pause.mp3');
const finalmusic = new Audio('/sons/beep.mp3');
const startbt = document.querySelector('#start-pause');
musica.loop = true;

let tempo = 1500;
let intervaloId = null;

function AlterarContexto(contexto){
    mostrartempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
        break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
        break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar á surperfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        break;
        default:
            break;
    }
}   
musicafoco.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})
focobt.addEventListener( 'click', () => {
    tempo = 1500;
    AlterarContexto('foco');
    focobt.classList.add('active');
})
curtobt.addEventListener('click', () =>{
    tempo = 300;
    AlterarContexto('descanso-curto');
    curtobt.classList.add('active');
})
longobt.addEventListener('click', () =>{
    tempo = 900;
    AlterarContexto('descanso-longo');
    longobt.classList.add('active');
})

const contagem = () =>{
    if(tempo <= 0){
        finalmusic.play();
        zerar();
        return;
    }
    tempo -= 1;
    mostrartempo();
}
startbt.addEventListener('click', iniciar);

function iniciar(){
    if(intervaloId){
        pausemusic.play();
        zerar();
        return;
    }
    startmusic.play();
    StartPause.textContent = "Pausar";
    StartPauseimg.setAttribute ('src', `/imagens/pause.png`);
    intervaloId = setInterval(contagem, 1000);
}
function zerar(){
    clearInterval(intervaloId);
    StartPause.textContent = "Começar";
    StartPauseimg.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrartempo(){
    const time = new Date(tempo * 1000);
    const tempoFormatado = time.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempotela.innerHTML = `${tempoFormatado}`;
}
mostrartempo();