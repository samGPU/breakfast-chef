import './style.css'

import Experience from './src/Experience.js'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <canvas class="game"></canvas>
    <div class="ui">
      <h1 id="nextState">Next State</h1>
      <h1 id="score">0</h1>
    </div>
  </div>
`

const canvas = document.querySelector('.game');
const ui = document.querySelector('.ui');

const experience = new Experience(canvas, ui);
