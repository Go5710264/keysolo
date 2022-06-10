class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.characters = container.querySelectorAll('.symbol').length; // количество символов
    this.сountdown = container.querySelector('.status__timer'); // таймер

    this.reset();

    this.registerEvents();
  }

  reset() { // перезагрузка игры
    this.setNewWord(); // генерация нового слова
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() { // регистрация события
    let updatePlayer = ((event) => {
      if (event.key.toLowerCase() === this.currentSymbol.textContent.toLowerCase()) { // если введенный символ с нижним регистром = тому который нужно ввести
        this.success(); // правильно
      } else {
        this.fail(); // неправильно
      }
    }) 
    document.addEventListener('keydown', updatePlayer); // обработчик события клавиатуры
    
    setInterval(() => { // добавление интервала, через который начнется новая игра
      this.reset();
    }, 1000 * this.сountdown.textContent); 

    this.timer();
  }

  timer() { // работа таймера
    setInterval(() => {
      --this.сountdown.textContent;
    }, 1000);
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() { // оправить новое слово
    const word = this.getWord(); // сгенерировать слово

    this.renderWord(word); // поместить слово в визуализатор
  }

  getWord() { // полчить слово
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index]; // вернуть слово по индексу
  }

  renderWord(word) { // отправить слово в html
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');

    this.wordElement.innerHTML = html;
    this.сountdown.textContent = word.length; // переопределение счетчика
    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

