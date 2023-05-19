//Fetches the sound that the user selected in the popup
//Then yeah! Play that thing!
export function playsound()
{
    chrome.storage.local.get("currentSound")
        .then(soundName => {
            //Default sound
            let selectedSound = "metalPipe";

            if (soundName && soundName.currentSound)
            {
                selectedSound = soundName.currentSound;
            }
            else
            {
                //For the sake of consistency, just make metalPipe the default current sound
                chrome.storage.local.set({"currentSound": "metalPipe"});
            }

            var sfURL = chrome.runtime.getURL(`./script/soundFiles/${selectedSound}.mp3`);
            let sound = new Audio(sfURL);
        
            //Deletes the sound file from global execution context so garbage collection go brr and we don't get blamed for chrome lag
            sound.play().then(() => {
                sound = null;
                sfURL = null;             
            }).catch(() => {
                sound = null;
                sfURL = null;
            });

        });
}