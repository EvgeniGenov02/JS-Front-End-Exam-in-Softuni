window.addEventListener("load", solve);

function solve() {
  
  document.querySelector('button.btn.clear').addEventListener('click',function(e){
    e.preventDefault();
    location.reload();
  });
  document.getElementById('add-btn').addEventListener('click',function(e){

    e.preventDefault();
    let player = document.getElementById('player');
    let score = document.getElementById('score');
    let round = document.getElementById('round');

    if(player.value !== '' && score.value !== '' && round.value !== ''){
      
      let ul = document.getElementById('sure-list');
      
      let li = document.createElement('li');
      li.setAttribute('class','dart-item');

      let article =  document.createElement('article');
      li.appendChild(article);

      let pForName = document.createElement('p');
      pForName.innerText = player.value;
      article.appendChild(pForName);

      let pForScore = document.createElement('p');
      pForScore.innerText = `Score: ${score.value}`
      article.appendChild(pForScore);
      
      let pForRound = document.createElement('p');
      pForRound.innerText = `Round: ${round.value}`;
      article.appendChild(pForRound);

      let buttonEdit = document.createElement('button');
      buttonEdit.setAttribute('class','btn edit');
      buttonEdit.innerText = 'edit';
      li.appendChild(buttonEdit)
      buttonEdit.addEventListener('click',function(e){
  
        e.preventDefault();

        player.value = pForName.innerText;
        score.value = pForScore.innerText.split(": ")[1];
        round.value = pForRound.innerText.split(": ")[1];

        e.target.parentElement.remove()

        document.getElementById('add-btn').disabled = false;
      });

      let buttonOk = document.createElement('button');
      buttonOk.setAttribute('class','btn ok');
      buttonOk.innerText = 'ok';
      li.appendChild(buttonOk)

      buttonOk.addEventListener('click', function(e){
        e.preventDefault();

       let player = pForName.innerText;
       let score = pForScore.innerText.split(": ")[1];
       let round = pForRound.innerText.split(": ")[1];

      let ul = document.getElementById('scoreboard-list');

      let li = document.createElement('li');
      li.setAttribute('class','dart-item');

      let article =  document.createElement('article');
      li.appendChild(article);

      let pName = document.createElement('p');
      pName.innerText = player;
      article.appendChild(pName);

      let pScore = document.createElement('p');
      pScore.innerText = `Score: ${score}`
      article.appendChild(pScore);
      
      let pRound = document.createElement('p');
      pRound.innerText = `Round: ${round}`;
      article.appendChild(pRound);

      ul.appendChild(li)

        e.target.parentElement.remove()
      });


      ul.appendChild(li);

      document.getElementById('add-btn').disabled = true;
      player.value = '';
      score.value = '';
      round.value = '';
    }
    
  })
  }
  