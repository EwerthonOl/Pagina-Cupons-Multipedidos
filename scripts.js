
// VARIAVEIS DE VALIDAÇÃO DE CADA CAMPO DO FORMULARIO
let isValidCodCupom = false;
let isValidPorcentagem = false;
let isValidDinheiroFixo = false;
let isValidValorMinimo = false;


// ARRAY DOS CUPONS CADASTRADOS
const cuponsAdicionados = [];


// DATA DE HOJE
let currentDate = new Date();

// FUNÇÃO PARA TRANSFORMAR A DATA ATUAL PARA O FORMATO DO INPUT DATE HTML
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

// FUNÇÃO PARA MUDAR O TIPO DE DESCONTO ENTRE PORCENTAGEM E DINHEIRO FIXO
function changeDesconto() {
  var selectDesconto = document.getElementById("selectDesconto");
  var inputPorcentagem = document.getElementById("inputPorcentagem");
  var inputDinheiro = document.getElementById("inputDinheiro");

  // SE FOR PORCENTAGEM SOMENTE O CAMPO DE PORCENTAGEM É REQUIRIDO, O DE DINHEIRO DESAPARECE
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

// FUNÇÃO PARA ESCONDER A DATA SE A OPÇÃO DE LIMITAR NÃO ESTIVER ATIVA
function hiddeDate() {
  var checkboxAtivarData = document.getElementById("dataLimiteCheckbox");
  var dataCampoInput = document.getElementById("labelEInputData");
  var campoData = document.getElementById("labelEInputData");

  
  // SE O USUARIO TIVER MARCADO ESCOLHER A DATA O CAMPO DE DATE FICA REQUERIDO
  if (checkboxAtivarData.checked == true) {
    dataCampoInput.style.display = "flex";
    campoData.setAttribute("required", "true");
  } else {
    dataCampoInput.style.display = "none";
    campoData.setAttribute("required", "false");
  }
}
hiddeDate();

// FUNÇÃO PARA MUDAR A SEÇÃO QUE EXPLICA O TIPO DE CUPOM ESCOLHIDO E SUAS ESPECIFICAÇÕES
function changeCupomTipe(valueTipeCupom) {
  var expCupomUnico = document.getElementById("explicacaoCupomUnico");
  var expCupomGeral = document.getElementById("explicacaoCupomGeral");

  var campoCodigoCupom = document.getElementById("campoTexto");

  
  // SE O CUPOM FOR UNICO O CAMPO DE CODIGO É GERADO AUTOMATICAMENTE
  if (valueTipeCupom == "Cupom geral") {
    expCupomUnico.style.display = "none";
    expCupomGeral.style.display = "flex";

    campoCodigoCupom.value = "";
    campoCodigoCupom.removeAttribute("readonly")
  } else if (valueTipeCupom == "Cupom único") {
    expCupomUnico.style.display = "flex";
    expCupomGeral.style.display = "none";

    campoCodigoCupom.value = randomString();
    campoCodigoCupom.setAttribute("readonly", "true")
  }
}
changeCupomTipe(document.getElementById("cupomGeral").value);

// FUNÇÃO PARA GERAR UMA STRING RANDOM PARA O CUPOM UNICO
function randomString() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// FUNÇÃO PARA VALIDAR O INPUT DE CODIGO DE CUPOM
function validarCampoCodCupom(valueCodCupom) {
  var codCupomElement = document.getElementById("campoTexto");
  var codCupomP = document.getElementById("codCupomP");

  if (valueCodCupom == "") {
    codCupomElement.style.borderColor = "var(--redColor)";
    codCupomP.style.display = "block"

    isValidCodCupom = false;
  } else {
    codCupomElement.style.borderColor = "var(--greenColor)";
    codCupomP.style.display = "none"

    isValidCodCupom = true;
  }
}

// FUNÇÃO PARA VALIDAR O INPUT DE PORCENTAGEM DESCONTO
function validarPorcentagem(valuePorcentagem) {
  var campoPorcentagem = document.getElementById("campoPorcentagem");
  var porcentagemP = document.getElementById("porcentagemP");

  
  // VALIDAÇÃO DA PORCENTAGEM QUE DEVE SER ENTRE 1 E 100
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

// FUNÇÃO PARA VALIDAR O INPUT DE DINHEIRO FIXO DE DESCONTO
function validarDinheiroFixo(valueDinheiroFixo) {
  var dinheiroDesconto = document.getElementById("dinheiroDesconto");
  var dinheiroP = document.getElementById("dinheiroP");

  
  // VALIDAÇÃO DE DINHEIRO FIXO MAIOR QUE 10 CENTAVOS
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

// FUNÇÃO PARA VALIDAR O INPUT DE VALOR MINIMO PARA USAR O CUPOM
function validarValorMinimo(valueValorMinimo) {
  var valorMinimo = document.getElementById("valorMinimo");
  var valorMinimoP = document.getElementById("valorMinimoP");

  
  // VALIDAÇÃO DO VALOR MINIMO DO CUPOM MAIOR QUE 10 CENTAVOS
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

// FUNÇÃO PARA VALIDAR SE TODOS OS CAMPOS DO FORM ESTÃO PREENCHIDOS DE ACORDO
function isValidForm() {
  if (isValidCodCupom && isValidPorcentagem && isValidDinheiroFixo && isValidValorMinimo) {
    enviarForm();

    return true;
  } else {
    alert("Preencha as informações e regras do cupom.")

    return false;
  }
}

// FUNÇÃO PARA CADASTRAR O FORM PREENCHIDO
function enviarForm() {
  const form = document.getElementById('formCadastroCupom');
  const data = new FormData(form);
  const jsonData = Object.fromEntries(data.entries());

  addCupomNaTabela(jsonData)

  alert('Cupom cadastrado');

  resetValuesAndValidsForm();
}

// FUNÇÃO PARA RESETAR OS VALORES DO FORM DEPOIS DELE SER CADASTRADO
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


// FUNÇÃO PARA ADICIONAR NOVOS CUPONS NA TABELA
const table = document.getElementById('data-table');
function addCupomNaTabela(cupomNovo) {

  infosCupomNaTabela = {
    codigo: cupomNovo.cupomCodigo,
    desconto: cupomNovo.cupomPorcentagem != "" ? cupomNovo.cupomPorcentagem : cupomNovo.cupomValor,
    tipo: cupomNovo.cupomTipo == "Cupom geral" ? "GERAL" : "ÚNICO",
    pedidoMinimo: cupomNovo.cupomValorMinimo,
    dataLimite: cupomNovo.cupomDataLimite
  }

  cuponsAdicionados.push(infosCupomNaTabela)

  cuponsAdicionados.sort((a, b) => new Date(a.campoData) - new Date(b.campoData));

  cuponsAdicionados.forEach(item => {
    const row = table.insertRow();

    Object.values(item).forEach(val => {
      const cell = row.insertCell();
      cell.textContent = val;
    });
  });
}


// Carregar a biblioteca Chart.js
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
script.onload = () => {
    // Definir os dados e opções do gráfico
    const labels = ['Cupom geral', 'Cupom único'];
    const data = {
        labels: labels,
        datasets: [{
            label: "Legenda",
            data: [12, 19],
            backgroundColor: [
                '#dd2525',
                '#2196f3',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    };

    // Definir as opções do gráfico
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Criar a instância do gráfico de barras
    const ctx = document.getElementById('bar-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
};
document.body.appendChild(script);