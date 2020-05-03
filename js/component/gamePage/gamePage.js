define(['base/component', 'component/controller/controller', 'component/generation/FieldGenerator', 'css!component/gamePage/game.css'], (Component, controller, Field) => {
	'use strict';
    class gamePage extends Component {
        render() {
            return `
                    <div class="wrapper">
                    <div class="header">
                        <h2 class="header__title">Морской бой</h2>
                    </div>
                    <div class="game">
                                ${`<p class="game__title">Игрок: ${new URLSearchParams(window.location.search).get('name')}</p>`}
                                <div class="game__fields">
                                <div class="game__field game__field_main">
                                            ${this.renderField(0)}
                                            </div>
                                            <h3 class="game__info"></h3>
                                            <div class="game__field game__field_enemy">
                                            ${this.renderField(1)}
                                        </div>    
                                    </div>
                                    ${this.renderStartButton()}
                            </div>
                    </div>`;
        }

        renderStartButton() {
            return `
                    <div class="game__buttons">
                         <a href="javascript:void(0)" class="game__button game__button_start">Начать игру!</a>
                    </div>
            `;
        }

        /**
         * Обработчик кнопки начала игры
         */
        buttonStart() {
            controller.start();
        }

        /**
         * Добавление событий
         */
        afterRender() {
            document.querySelector(".game__button_start").addEventListener("click", this.buttonStart);
        }

        renderField(type) {

            let arr = Field.generateField();
            controller.add(type, arr);

            let className;
            let str = "";
            let player = (type == 0) ? "Ваше поле" : "Поле противника";

            for (let i = 0; i < 10; i++) {
                str += `<div class="game__field-row">`;
                for (let j = 0; j < 10; j++) {
                    if ((type == 0) && (arr[i][j] == 2)) {
                        className = "game__block ship";
                    } else {
                        className = "game__block";
                    }
                    str += `<div class="${className}" data-x="${i}" data-y="${j}"></div>`;
                }
                str += `</div>`;
            }
            str += `<span class="game__field-title">${player}</span>`;
            return str;
        }
    }
    return gamePage;
});