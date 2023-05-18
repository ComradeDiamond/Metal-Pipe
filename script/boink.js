document.addEventListener("keypress", playsound);

function playsound()
{
    var sfURL = chrome.runtime.getURL("./script/soundFiles/metalPipe.mp3");
    console.log(sfURL)
    let sound = new Audio(sfURL);

    //Deletes the sound file from global execution context so garbage collection go brr and we don't get blamed for chrome lag
    sound.play().then(() => {
        delete sound;               
    }).catch(() => {
        delete sound;
    })
}