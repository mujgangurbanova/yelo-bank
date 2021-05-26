let optionForPaymentType=0;
let optionForCurrency=0;
const input = document.getElementById('toggleswitch');
let resultItem = document.querySelector('.range-result');
let resultItemOne = document.querySelector('.range-result-1');
const range = document.querySelector('.range');
const rangeOne = document.querySelector('.range-one');

const AZN_TABLE = {
    12 : [0.11, 0.115],
    24 : [0.11, 0.115],
    36 : [0.11, 0.115],

};

const USD_TABLE = {
    12 : [0.015, 0.02],
    24 : [0.015, 0.02],
    36 : [0.015, 0.02],

};

const declarePercent=()=>{
    document.querySelector('#depositPercent').innerHTML = faiziHesabla(resultItemOne.innerHTML,optionForCurrency,optionForPaymentType)*100 + '%';

}

const faiziHesabla = (ay,pulVahidi, faizOdenisi) => {
    if (pulVahidi === 0 && faizOdenisi === 1) {
        return AZN_TABLE[ay][1];
    } else if(pulVahidi === 0 && faizOdenisi === 0) {
        return AZN_TABLE[ay][0];
    }else if(pulVahidi === 1 && faizOdenisi === 0) {
        return USD_TABLE[ay][0];
    }else if(pulVahidi === 1 && faizOdenisi === 1) {
        return USD_TABLE[ay][1];
    }
};

//Math.round(num * 100) / 100
const geliriHesabla = (mebleg, muddet, valyuta, faizOdenisi) => {
    const faiz = faiziHesabla(resultItemOne.innerHTML,valyuta, faizOdenisi)
    const umumiGelir  = mebleg *muddet * faiz/12
    const ayliqGelir = (umumiGelir / muddet).toFixed(2)

    return {umumiGelir,ayliqGelir};
}
const ayliqUmumiGelir=() =>{
    let result=geliriHesabla(resultItem.innerHTML,resultItemOne.innerHTML,optionForCurrency,optionForPaymentType);
    document.querySelector("#depositAmount").innerHTML=result['umumiGelir'].toString();
    document.querySelector("#depositAmountMonth").innerHTML=result['ayliqGelir'].toString()
}




range.addEventListener('input',(e) =>{
    resultItem.innerHTML = range.value;
    ayliqUmumiGelir()

});




rangeOne.addEventListener('input',(e) =>{
    resultItemOne.innerHTML = rangeOne.value;
    ayliqUmumiGelir()
});



let val = document.getElementById('selectCurrency');
val.addEventListener('click', function() {
    let options = val.querySelectorAll('option');

});


val.addEventListener('change', function() {
    if (val.value === '1') {
        document.querySelector('.currency-type').innerHTML = 'USD';
        document.querySelector('.azn').innerHTML = 'USD';
        document.querySelector('.monthAzn').innerHTML = 'USD';
        optionForCurrency=1;
        declarePercent()
        ayliqUmumiGelir()


    }else{
        document.querySelector('.currency-type').innerHTML = 'AZN';
        document.querySelector('.azn').innerHTML = 'AZN';
        document.querySelector('.monthAzn').innerHTML = 'AZN';
        optionForCurrency=0;
        declarePercent()
        ayliqUmumiGelir()
    }
});

input.addEventListener('click', function() {
    if(this.checked) {
        optionForPaymentType=1
        document.querySelector('.monthlyItem').style.display = 'none';
        declarePercent()
        ayliqUmumiGelir()
    }else{
        optionForPaymentType=0;
        document.querySelector('.monthlyItem').style.display = 'block';
        declarePercent()
        ayliqUmumiGelir()
    }

});5