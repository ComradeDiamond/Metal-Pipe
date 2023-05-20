window.setTimeout(() => {
    import("./playSound.js")
        .then(sound => {

            //List of events we want to trigger for
            [
                "keypress",
                "mousedown",
                "scroll",
                "load",
                "copy",
                "cut",
                "paste",
                "resize"
            ].forEach(targetedEvent => {
                document.addEventListener(targetedEvent, sound.playsound);
            });

            //Experimental
            window.setTimeout(() => {
                console.log(Array.from(document.getElementsByTagName("iframe")))
            }, 5000);
            
            //Randomly plays the sound. This is basically 10 hours of silence interrupted by ____________. Does it "recursively"
            //First does initial random time
            setTimeout(() => {
                playAndTime(sound.playsound);
            }, Math.random() * 1000 * 60);

        }).catch(err => {
            console.error(err);
        });
}, 2500);

function playAndTime(playSoundFunc)
{
    playSoundFunc();

    setTimeout(() => {
        playAndTime(playSoundFunc);
    }, Math.random() * 1000 * 60);
}