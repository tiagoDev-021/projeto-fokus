// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


const html = document.querySelector('html');
const focoBt =document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const botoes = document.querySelectorAll('.app__card-button');
const titulo = document.querySelector('.app__title');
const alternarMusicaBt = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const relogio = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const playAudio = new Audio('/sons/play.wav')
const pauseAudio = new Audio('/sons/pause.mp3')
const finalAudio = new Audio('/sons/beep.mp3')

let tempoDecorridoEmSegundos = 1500;
let intervalId = null;

alternarMusicaBt.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    };
});

focoBt.addEventListener('click', () => {
    //html.setAttribute('data-contexto', 'foco' ); 
    mudarContexto('foco'); 
    focoBt.classList.add('active');  
    tempoDecorridoEmSegundos = 1500
    mostrarTempoDecorrido()


});

curtoBt.addEventListener('click', () =>{
    //html.setAttribute('data-contexto', 'descanso-curto' ); 
    mudarContexto('descanso-curto');
    curtoBt.classList.add('active');
    tempoDecorridoEmSegundos = 300
    mostrarTempoDecorrido()
});


longoBt.addEventListener('click', () =>{
    //html.setAttribute('data-contexto', 'descanso-longo' ); 
    mudarContexto('descanso-longo');
    longoBt.classList.add('active');
    tempoDecorridoEmSegundos = 900
    mostrarTempoDecorrido()
});

function mudarContexto(contexto){
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    
    botoes.forEach( bt => bt.classList.remove('active'));

    switch(contexto){
        case 'foco': titulo.innerHTML = `
        Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        
        `
        break;

        case 'descanso-curto': titulo.innerHTML = `
        Que tal dar uma respirada, <br>
            <strong class="app__title-strong">faça uma pausa curta.</strong>
        
        `
        break;

        case 'descanso-longo': titulo.innerHTML = `
        Hora de voltar a superfície, <br>
            <strong class="app__title-strong">faça uma pausa longa.</strong>
        
        `
        break;
        default: break;
    }

};

startPauseBt.addEventListener('click', () => {
   startPauseTempo()
})

function startPauseTempo(){
    if(intervalId === null){
        playAudio.play()
        startPauseBt.textContent = "Pausar"
    
    intervalId = setInterval(contagemRegressiva, 1000);
    return
    }
    pauseAudio.play()
    startPauseBt.textContent = "Começar"
    clearInterval(intervalId)
    intervalId = null
}

function contagemRegressiva(){

    if(tempoDecorridoEmSegundos <=0){
        clearInterval(intervalId)
        intervalId = null
        finalAudio.play()
        alert('tempo finalizado')
        return
    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempoDecorrido()
}

function mostrarTempoDecorrido(){
    const data = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = data.toLocaleTimeString('pt-br',{
        minute: '2-digit', second: '2-digit'
    })
    relogio.textContent = `${tempoFormatado}`

}

mostrarTempoDecorrido()

