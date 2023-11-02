let isValidCodCupom = false;
let isValidPorcentagem = false;
let isValidDinheiroFixo = false;
let isValidValorMinimo = false;

let currentDate = new Date();

console.log(currentDate)

let formateData = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

let dataDeHojePtBR = `${formateData.format(currentDate)}`;

console.log(dataDeHojePtBR)

function formatDateForInputDate(date) {
  date,
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
document.getElementById("campoData").setAttribute("min", formatDateForInputDate(currentDate));


function changeDesconto() {
  var selectDesconto = document.getElementById("selectDesconto");
  var inputPorcentagem = document.getElementById("inputPorcentagem");
  var inputDinheiro = document.getElementById("inputDinheiro");

  if (selectDesconto.value == "Porcentagem de desconto") {
    inputPorcentagem.style.display = "flex";
    inputPorcentagem.setAttribute("required", "true");

    inputDinheiro.style.display = "none";
    inputDinheiro.setAttribute("required", "false");

  } else {
    inputPorcentagem.style.display = "none";
    inputPorcentagem.setAttribute("required", "false");

    inputDinheiro.style.display = "flex";
    inputDinheiro.setAttribute("required", "true");
  }
}
changeDesconto();

function hiddeDate() {
  var checkboxAtivarData = document.getElementById("dataLimiteCheckbox");
  var dataCampoInput = document.getElementById("labelEInputData");
  var campoData = document.getElementById("labelEInputData");

  if (checkboxAtivarData.checked == true) {
    dataCampoInput.style.display = "flex";
    campoData.setAttribute("required", "true");
  } else {
    dataCampoInput.style.display = "none";
    campoData.setAttribute("required", "false");
  }
}
hiddeDate();

function changeCupomTipe(valueTipeCupom) {
  var expCupomUnico = document.getElementById("explicacaoCupomUnico");
  var expCupomGeral = document.getElementById("explicacaoCupomGeral");

  if (valueTipeCupom == "Cupom geral") {
    expCupomUnico.style.display = "none";
    expCupomGeral.style.display = "flex";
  } else if (valueTipeCupom == "Cupom único") {
    expCupomUnico.style.display = "flex";
    expCupomGeral.style.display = "none";
  }
}
changeCupomTipe(document.getElementById("cupomGeral").value);

function validarCampoCodCupom(valueCodCupom) {
  var codCupomElement = document.getElementById("campoTexto");
  var codCupomP = document.getElementById("codCupomP");

  if (valueCodCupom == "") {
    codCupomElement.style.borderColor = "var(--redColor)";
    codCupomP.style.display = "block"

    isValidCodCupom = false;
    console.log(isValidCodCupom)
  } else {
    codCupomElement.style.borderColor = "var(--greenColor)";
    codCupomP.style.display = "none"

    isValidCodCupom = true;
    console.log(isValidCodCupom)
  }
}

function validarPorcentagem(valuePorcentagem) {
  var campoPorcentagem = document.getElementById("campoPorcentagem");
  var porcentagemP = document.getElementById("porcentagemP");

  if (valuePorcentagem >= 1 && valuePorcentagem <= 100 && valuePorcentagem != null) {
    campoPorcentagem.style.borderColor = "var(--greenColor)";
    porcentagemP.style.display = "none";

    isValidPorcentagem = true;
    isValidDinheiroFixo = true;
  } else {
    campoPorcentagem.style.borderColor = "var(--redColor)";
    porcentagemP.style.display = "block";

    isValidPorcentagem = false;
    isValidDinheiroFixo = false;
  }
}

function validarDinheiroFixo(valueDinheiroFixo) {
  var dinheiroDesconto = document.getElementById("dinheiroDesconto");
  var dinheiroP = document.getElementById("dinheiroP");

  if (valueDinheiroFixo >= 0.10 && valueDinheiroFixo != null) {
    dinheiroDesconto.style.borderColor = "var(--greenColor)";
    dinheiroP.style.display = "none";

    isValidDinheiroFixo = true;
    isValidPorcentagem = true;
  } else {
    dinheiroDesconto.style.borderColor = "var(--redColor)";
    dinheiroP.style.display = "block";

    isValidDinheiroFixo = false;
    isValidPorcentagem = false;
  }
}

function validarValorMinimo(valueValorMinimo) {
  var valorMinimo = document.getElementById("valorMinimo");
  var valorMinimoP = document.getElementById("valorMinimoP");

  if (valueValorMinimo >= 0.10 && valueValorMinimo != null) {
    valorMinimo.style.borderColor = "var(--greenColor)";
    valorMinimoP.style.display = "none";

    isValidValorMinimo = true;
  } else {
    valorMinimo.style.borderColor = "var(--redColor)";
    valorMinimoP.style.display = "block";

    isValidValorMinimo = false;
  }
}

function isValidForm() {
  if (isValidCodCupom && isValidPorcentagem && isValidDinheiroFixo && isValidValorMinimo) {
    enviarForm();

    return true;
  } else {
    alert("Preencha todos os dados pedidos no formulário.")

    return false;
  }
}

function enviarForm() {
  const form = document.getElementById('formCadastroCupom');
  const data = new FormData(form);
  const jsonData = Object.fromEntries(data.entries());
  console.log(jsonData);

  alert('Formulário enviado');

  resetValuesAndValidsForm();
}

function resetValuesAndValidsForm() {
  document.getElementById('campoTexto').value = "";
  document.getElementById('campoPorcentagem').value = "";
  document.getElementById('dinheiroDesconto').value = "";
  document.getElementById('campoData').value = "";
  document.getElementById('valorMinimo').value = "";

  isValidCodCupom = false;
  isValidDinheiroFixo = false;
  isValidPorcentagem = false;
  isValidValorMinimo = false;
}