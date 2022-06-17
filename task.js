class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word'); // доступ к слову
    this.winsElement = container.querySelector('.status__wins'); // правильно введенные слова
    this.lossElement = container.querySelector('.status__loss'); // неправильно введенные слова
    this.сountdown = container.querySelector('.status__timer'); // таймер
    this.characters = container.querySelectorAll('.symbol'); // массив символов

    this.reset(); // запуск игры

    this.registerEvents();
  }

  reset() { // перезагрузка игры
    this.setNewWord(); // генерация нового слова
    this.timer(); // запуск таймера
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
  }

  timer() { // работа таймера
    let timerId = setInterval(() => { // уменьшение счетчика
      if (this.сountdown.textContent > 0){ // если таймер больше 0
        --this.сountdown.textContent; // -1
      } else {
        clearInterval(timerId); // отменить интервал
        return this.reset(); // выйти из функции, вернуть новую игру
      }
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
    this.сountdown.textContent = word.length; // определение счетчика
    this.currentSymbol = this.wordElement.querySelector('.symbol_current'); // тот символ, который нужжно ввести
  }
}

new Game(document.getElementById('game'))

