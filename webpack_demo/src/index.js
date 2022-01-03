import _ from 'lodash'
import './style.css'
import Icon from './icon.jpg'
import printMe from "./print.js"

function component() {
    const element = document.createElement('div')
    const btn = document.createElement("button")

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack.'], ' ')
    element.classList.add('hello')

    // Add an image to existing div
    const myIcon = new Image()
    myIcon.src = Icon
    element.appendChild(myIcon)

    // Add button to existing div
    btn.innerHTML = "Click me and check the console!"
    btn.onclick = printMe
    element.appendChild(btn)

    return element;
  }
  
  document.body.appendChild(component())