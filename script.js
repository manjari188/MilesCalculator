let wheelSize = 19;
const miles100D = document.getElementById('miles-100D');
const milesP100D = document.getElementById('miles-P100D');
//code to handle speed inputs
const inputSpeed = document.getElementById("speed-input");
const inputSpeedUp = document.getElementById("speed-input-up");
const inputSpeeddown = document.getElementById("speed-input-down");
const imgUpSpeed= document.getElementById("arrow-up-image-speed");
const imgDownSpeed= document.getElementById("arrow-down-image-speed");

inputSpeedUp.addEventListener("click",function(e){
    if(+inputSpeed.textContent === 140){
        return;
    }
    imgUpSpeed.classList.remove("disable");
    imgDownSpeed.classList.remove("disable");
    inputSpeed.textContent =  +inputSpeed.textContent + 10;
    if(+inputSpeed.textContent === 140){
        imgUpSpeed.classList.add("disable");     
    }
    calculate100D();
    calculateP100D();
});

inputSpeeddown.addEventListener("click",function(e){
    if(+inputSpeed.textContent === 70){
        return;
    }
    imgUpSpeed.classList.remove("disable");
    imgDownSpeed.classList.remove("disable");
    inputSpeed.textContent=  +inputSpeed.textContent - 10;
    if(+inputSpeed.textContent === 70){
        imgDownSpeed.classList.add("disable");     
    }
    calculate100D();
    calculateP100D();
});


//code to handle temperature inputs 
const inputTemp = document.getElementById("temp-input");
const inputTempUp = document.getElementById("temp-input-up");
const inputTempdown = document.getElementById("temp-input-down");
const imgUpTemp= document.getElementById("arrow-up-image-temp");
const imgDownTemp= document.getElementById("arrow-down-image-temp");

inputTempUp.addEventListener("click",function(e){
    if(+inputTemp.textContent === 40){
        return;
    }
    imgUpTemp.classList.remove("disable");
    imgDownTemp.classList.remove("disable");
    let prevVal= inputTemp.textContent
    inputTemp.textContent=  +inputTemp.textContent + 10;
    changeToggleIcon(inputTemp.textContent, prevVal);
    if(+inputTemp.textContent === 40){
        imgUpTemp.classList.add("disable");     
    }
    calculate100D();
    calculateP100D();
});

inputTempdown.addEventListener("click",function(e){
    if(+inputTemp.textContent === -10){
        return;
    }
    imgUpTemp.classList.remove("disable");
    imgDownTemp.classList.remove("disable");
    let prevVal= inputTemp.textContent
    inputTemp.textContent=  +inputTemp.textContent - 10;
    changeToggleIcon(inputTemp.textContent, prevVal) 
    if(+inputTemp.textContent === -10){
        imgDownTemp.classList.add("disable");     
    }
    calculate100D();
    calculateP100D();
});

//code to handle temp toggle
const toggleTemp = document.getElementById("acSwitch");
const toggleTempText = document.getElementById("acSwitch-text");
const toggleInnerContainer = document.getElementById("ac-inner-container");
const toggleImage = document.getElementById("ac-image");

toggleTemp.addEventListener("click",function(e){
    if(toggleTempText.textContent === 'AC OFF'){
        removeAcOff()
        calculate100D();
        calculateP100D();
    }
    else if(toggleTempText.textContent === 'AC ON'){
        removeAcOn();
        calculate100D();
        calculateP100D();
    }
    else if(toggleTempText.textContent === 'HEAT OFF'){
        removeHeatOff();
        calculate100D();
        calculateP100D();
    }
    else if(toggleTempText.textContent === 'HEAT ON'){
        removeHeatOn();
        calculate100D();
        calculateP100D();
    }
});

//code to select wheel size
const wheelSmall = document.getElementById("wheels-small");
const wheelLarge = document.getElementById("wheels-large");
wheelSmall.addEventListener("click",function(){
    wheelSize =19;
    wheelLarge.classList.remove("wheel-border-selected");
    wheelSmall.classList.add("wheel-border-selected");
    calculate100D();
    calculateP100D();
    toNineteen();
})

wheelLarge.addEventListener("click",function(e){
    wheelSize =21;
    wheelSmall.classList.remove("wheel-border-selected");
    wheelLarge.classList.add("wheel-border-selected");
    calculate100D();
    calculateP100D();
    toTweentyOne();
})


//code to change icon according to temp
function changeToggleIcon(temp, prevTemp){
    // make cold icon
    if(temp >10 && prevTemp <= 10){
        removeAcOn();
    }
    //make hot icon
    else if(temp <= 10 && prevTemp > 10){
        removeAcOn();
        toggleImage.src = "images/icon-wave-gray.svg";
        toggleTempText.textContent = 'HEAT OFF';
    }
}

function removeAcOn(){
    toggleTempText.textContent = 'AC OFF';
    toggleTempText.classList.add("ac-innertext-grey");
    toggleTempText.classList.remove("ac-innertext-white");
    toggleInnerContainer.classList.add("ac-inner-white");
    toggleInnerContainer.classList.remove("ac-inner-blue");
    toggleInnerContainer.classList.remove("ac-inner-red");
    toggleImage.src = "images/icon-fan-gray.svg"
}

function removeAcOff(){
    toggleTempText.textContent = 'AC ON';
    toggleTempText.classList.remove("ac-innertext-grey");
    toggleTempText.classList.add("ac-innertext-white");
    toggleInnerContainer.classList.remove("ac-inner-white");
    toggleInnerContainer.classList.add("ac-inner-blue");
    toggleImage.src = "images/icon-fan-white.svg"
}

function removeHeatOff(){
    toggleTempText.textContent = 'HEAT ON';
    toggleTempText.classList.remove("ac-innertext-grey");
    toggleTempText.classList.add("ac-innertext-white");
    toggleInnerContainer.classList.remove("ac-inner-white");
    toggleInnerContainer.classList.add("ac-inner-red");
    toggleImage.src = "images/icon-wave-white.svg"
}

function removeHeatOn(){
    toggleTempText.textContent = 'HEAT OFF';
    toggleTempText.classList.add("ac-innertext-grey");
    toggleTempText.classList.remove("ac-innertext-white");
    toggleInnerContainer.classList.add("ac-inner-white");
    toggleInnerContainer.classList.remove("ac-inner-blue");
    toggleInnerContainer.classList.remove("ac-inner-red");
    toggleImage.src = "images/icon-wave-gray.svg";
}

function calculate100D(){
    let ac = toggleTempText.textContent.includes('ON') ? 'on' : 'off';
    metric100D.forEach((metric)=>{
        if(metric.temp === +inputTemp.textContent && 
            metric.wheelsize === wheelSize && 
            metric.ac === ac){
                for(let i=0; i<metric.hwy.length; i++){
                    if(metric.hwy[i].kmh === +inputSpeed.textContent){
                        miles100D.textContent =metric.hwy[i].kilometers;
                    }
                }
            }
    })
}

function calculateP100D(){
    let ac = toggleTempText.textContent.includes('ON') ? 'on' : 'off';
    metricP100D.forEach((metric)=>{
        if(metric.temp === +inputTemp.textContent && 
            metric.wheelsize === wheelSize && 
            metric.ac === ac){
                for(let i=0; i<metric.hwy.length; i++){
                    if(metric.hwy[i].kmh === +inputSpeed.textContent){
                        milesP100D.textContent =metric.hwy[i].kilometers;
                    }
                }
            }
    })
}

function toNineteen() {
    var carWheel1 = document.getElementById("wheel1");
    carWheel1.classList.remove('wheel1-21'); 
    carWheel1.classList.add('wheel1-19');
    var carWheel2 = document.getElementById("wheel2");
    carWheel2.classList.remove('wheel2-21'); 
    carWheel2.classList.add('wheel2-19');
}
    
function toTweentyOne() {
    var carWheel1 = document.getElementById("wheel1");
    carWheel1.classList.remove('wheel1-19'); 
    carWheel1.classList.add('wheel1-21');
    var carWheel2 = document.getElementById("wheel2");
    carWheel2.classList.remove('wheel2-19'); 
    carWheel2.classList.add('wheel2-21');
}