document.addEventListener("keypress", playsound);

function playsound()
{
    let sound = new Audio("./soundFiles/metalPipe.mp3");

    //Deletes the sound file from global execution context so garbage collection go brr and we don't get blamed for chrome lag
    sound.play().then(() => {
        delete sound;               
    }).catch(() => {
        delete sound;
    })
}