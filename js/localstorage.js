'use strict';
/* global nameField roleField profileImage inputEmail inputTelefono inputLinkedin inputGithub miniBox fotoURL */

// Funciones localstorage

var infoTarjeta = {};
var habilidade1LocalStorage;
var habilidade2LocalStorage;
var habilidade3LocalStorage;
var guilty;

function verifySelectValues() {
  infoTarjeta = JSON.parse(localStorage.getItem('Profile-Card'));
  if (infoTarjeta.habilidade1) {
    habilidade1LocalStorage = infoTarjeta.habilidade1;
  } else {
    habilidade1LocalStorage = '';
  }
  if (infoTarjeta.habilidade2) {
    habilidade2LocalStorage = infoTarjeta.habilidade2;
  } else {
    habilidade2LocalStorage = '';
  }
  if (infoTarjeta.habilidade3) {
    habilidade3LocalStorage = infoTarjeta.habilidade3;
  } else {
    habilidade3LocalStorage = '';
  }


}
// var habilidade2 = document.querySelector('.select__habilidades2');
// var habilidade3 = document.querySelector('.select__habilidades3');



// -------------------- addEventListeners para los input, para guardar el texto en LS
nameField.addEventListener('focusout', guardarDataLS);
roleField.addEventListener('focusout', guardarDataLS);
inputEmail.addEventListener('focusout', guardarDataLS);
inputTelefono.addEventListener('focusout', guardarDataLS);
inputLinkedin.addEventListener('focusout', guardarDataLS);
inputGithub.addEventListener('focusout', guardarDataLS);

function guardarDataLSSelect(event) {

  guilty = event.currentTarget;

  guilty.classList.add('select__habilidades-active');

  if (guilty.name === 'Habilidade1') {
    habilidade1LocalStorage = guilty.value;

    if (document.querySelector('.card__foot--box-Habilidade1')) {
      document.querySelector('.card__foot--box-Habilidade1').remove();
    }
  } else if (guilty.name === 'Habilidade2') {

    if (document.querySelector('.card__foot--box-Habilidade2')) {
      document.querySelector('.card__foot--box-Habilidade2').remove();
    }

    habilidade2LocalStorage = guilty.value;

  } else if (guilty.name === 'Habilidade3') {
    habilidade3LocalStorage = guilty.value;
    if (document.querySelector('.card__foot--box-Habilidade3')) {
      document.querySelector('.card__foot--box-Habilidade3').remove();
    }
  }
  habilidades2Visor()

  guardarDataLS()
}

function habilidades2Visor() {
  var habilidadVisorSkillsBox = document.querySelector('.card__foot--skills');
  var habilidadVisorDIV = document.createElement('div');
  habilidadVisorDIV.classList.add('card__foot--box', 'card__foot--box-' + guilty.name);
  var habilidadVisorP = document.createElement('p');
  habilidadVisorP.classList.add('card__foot--text', 'uppercase');
  var habilidadVisorText = document.createTextNode(guilty.value);

  habilidadVisorP.appendChild(habilidadVisorText);
  habilidadVisorDIV.appendChild(habilidadVisorP);
  habilidadVisorSkillsBox.appendChild(habilidadVisorDIV);
}

function guardarDataLS() {

  if (!localStorage.getItem('Profile-Card')) {
    infoTarjeta = {
      'nombre': '',
      'puesto': '',
      'foto': '',
      'email': '',
      'telefono': '',
      'linkedin': '',
      'github': '',
      'habilidade1': '',
      'habilidade2': '',
      'habilidade3': '',
      'color': '',
      'fuente': ''
    }

  } else {
    infoTarjeta = JSON.parse(localStorage.getItem('Profile-Card'));
  }

  infoTarjeta.nombre = nameField.value;
  infoTarjeta.puesto = roleField.value;
  infoTarjeta.foto = fotoURL;
  infoTarjeta.email = inputEmail.value;
  infoTarjeta.telefono = inputTelefono.value;
  infoTarjeta.linkedin = inputLinkedin.value;
  infoTarjeta.github = inputGithub.value;
  infoTarjeta.habilidade1 = habilidade1LocalStorage;
  infoTarjeta.habilidade2 = habilidade2LocalStorage;
  infoTarjeta.habilidade3 = habilidade3LocalStorage;
  infoTarjeta.color = null
  infoTarjeta.fuente = null

  localStorage.setItem('Profile-Card', JSON.stringify(infoTarjeta));
}

function recuperarDataLS() {
  if (localStorage.getItem('Profile-Card')) {
    infoTarjeta = JSON.parse(localStorage.getItem('Profile-Card'));
    verifySelectValues()
    nameField.value = infoTarjeta.nombre;
    roleField.value = infoTarjeta.puesto;
    profileImage.style.backgroundImage = infoTarjeta.foto;
    miniBox.style.backgroundImage = infoTarjeta.foto;
    profileImage.value = infoTarjeta.foto;
    inputEmail.value = infoTarjeta.email;
    inputTelefono.value = infoTarjeta.telefono;
    inputLinkedin.value = infoTarjeta.linkedin;
    inputGithub.value = infoTarjeta.github;

    if (inputEmail.value !== '') {
      emailLink.href = 'mailto:' + inputEmail.value;
      document.querySelector('.email').style.display = 'flex';
    }

    if (inputTelefono.value !== '') {
      mobileLink.href = 'tel:' + inputTelefono.value;
      document.querySelector('.mobile').style.display = 'flex';
    }

    if (inputLinkedin.value !== '') {
      inputLinkedin.href = 'http://linkedin.com/in/' + inputLinkedin.value;
      document.querySelector('.linkedin').style.display = 'flex';
    }

    if (inputGithub.value !== '') {
      inputGithub.href = 'https://github.com/' + inputGithub.value;
      document.querySelector('.github').style.display = 'flex';
    }



    loadSelect();
    setTimeout(determineSelectsValuesOnRecoverData, 2000);

  } else {
    loadSelect();
  }
}

function determineSelectsValuesOnRecoverData() {
  if (infoTarjeta.habilidade1 !== '') {
    guilty = document.querySelector('.select__habilidades1');
    guilty.value = infoTarjeta.habilidade1;
    guilty.classList.add('select__habilidades-active');
    habilidades2Visor()

  }
  if (infoTarjeta.habilidade2 !== '') {
    createSelect();
    guilty = document.querySelector('.select__habilidades2');
    guilty.value = infoTarjeta.habilidade2;
    guilty.classList.add('select__habilidades-active');
    habilidades2Visor()

  }
  if (infoTarjeta.habilidade3 !== '') {
    createSelect();
    guilty = document.querySelector('.select__habilidades3');
    guilty.value = infoTarjeta.habilidade3;
    guilty.classList.add('select__habilidades-active');
    habilidades2Visor()

  }
}

// -------------- Se ejecuta al iniciar la página
recuperarDataLS()