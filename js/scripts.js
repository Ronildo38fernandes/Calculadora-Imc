// IMC DATA
const data = [
   {
     min: 0,
     max: 18.4,
     classification: "Menor que 18,5",
     info: "Magreza",
     obesity: "0",
   },
   {
     min: 18.5,
     max: 24.9,
     classification: "Entre 18,5 e 24,9",
     info: "Normal",
     obesity: "0",
   },
   {
     min: 25,
     max: 29.9,
     classification: "Entre 25,0 e 29,9",
     info: "Sobrepeso",
     obesity: "I",
   },
   {
     min: 30,
     max: 39.9,
     classification: "Entre 30,0 e 39,9",
     info: "Obesidade",
     obesity: "II",
   },
   {
     min: 40,
     max: 99,
     classification: "Maior que 40,0",
     info: "Obesidade grave",
     obesity: "III",
   },
 ];

 //selecionar elementos
 const imcTable = document.querySelector("#imc-table")

 const heightInput = document.querySelector("#height")

 const weigthInput = document.querySelector("#weight")

 const calcBtn = document.querySelector("#calc-btn")

 const clearBtn = document.querySelector("#clear-btn")

 const imcNumber = document.querySelector("#imc-number span")

 const imcInfo = document.querySelector("#imc-info span")

 const backBtn = document.querySelector("#back-btn")

 const calContaier = document.querySelector("#calc-container")

 const resultContainer = document.querySelector("#result-container")

 //funções
function createTable(data){
  data.forEach((item) => {

    //criando a div
    const div = document.createElement("div")
    div.classList.add("table-data")

    
    const classification = document.createElement("p")
    classification.innerText = item.classification;
    
    const info = document.createElement("p")
    info.innerText = item.info;
    
    const obesity = document.createElement("p")
    obesity.innerText = item.obesity;

    div.appendChild(classification)
    div.appendChild(info)
    div.appendChild(obesity)

    imcTable.appendChild(div)
  });
}
function showOrHideResults(){
  calContaier.classList.toggle("hide")
  resultContainer.classList.toggle("hide")
}

//função para calcular imc
function calcImc(weight,height){

  const imc =(weight/(height * height)).toFixed(1)

  return imc;
  
}
//limpa campos do input
function CleanInputs(){
  heightInput.value = ""
  weigthInput.value = ""
  imcNumber.classList = ""
      imcInfo.classList = "" 

}

//valida digitos 
function validDigits(text){
  return text.replace(/[^0-9,]/g,"");
}
 //inicialização
createTable(data);
 //eventos
 //evento array  valida digitos núméricos
 [heightInput,weigthInput].forEach((el) =>{
  el.addEventListener("input",(e)=>{
    const updateValue = validDigits(e.target.value)
    e.target.value = updateValue
  })
 })

//evento que pega a classificação do imc
calcBtn.addEventListener("click",(e)=>{
  e.preventDefault();

  const weight = +weigthInput.value.replace(",",".")
  const height = +heightInput.value.replace(",",".")

  if(!weight || !height) return;

   const imc = calcImc(weight,height);

  let info;
  data.forEach((item) =>{
    if(imc >= item.min && imc <= item.max){
      info = item.info
    }
  })


  if(!info) return;


  //recebe a classificação
  imcNumber.innerText = imc
  imcInfo.innerText = info

  //classifica as cores 
  switch(info){
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
    break;
    case "Normal":
      imcNumber.classList.add("good")
      imcInfo.classList.add("good")
    break;
    case "Sobrepeso":
      imcNumber.classList.add("low")
      imcInfo.classList.add("low")
    break;  
    case "Obesidade":
      imcNumber.classList.add("medium")
      imcInfo.classList.add("medium")
    break  
    case "Obesidade grave":
      imcNumber.classList.add("hight")
      imcInfo.classList.add("hight") 
    break   
  }



  showOrHideResults();


})

//evento de limpar os inputs
 clearBtn.addEventListener("click",(e)=>{
  e.preventDefault();  
  CleanInputs();
 })

 backBtn.addEventListener("click",()=>{
  CleanInputs()
  showOrHideResults()
 })