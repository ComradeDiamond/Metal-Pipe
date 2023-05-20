/*
    Google docs act weirdly - when you type into the doc, you're actually typing into an external iframe - and that iframe loads asynchronously 😤
    I have no idea why they would do something so evil but hey, this is a workaround.

    Also casual observation: Manifest v2 loads content scripts AFTER everything is loaded (including external iframes). Manifest v3 doesn't.
*/

const stateMachine = new MutationObserver(processMutation);
stateMachine.observe(document, {
  childList: true,
  subtree: true
});

function processMutation(mutationsList)
{
    for (const mutation of mutationsList) 
    {
        //Did some testing - found that the iframe google docs loads on either iframe[0] or iframe[1] (very unassuming)
        //This first iframe has almost the exact same HTML tag as iframe[0], and every time I test it, I get a different number
        //So the logic here is to find the last iframe that will ever get loaded into Google docs, and then use that as a cue to start processing iframes properly
        const frameElement = document.querySelector('iframe[aria-label="Information Card"]');
        if (frameElement !== null) 
        {
            //iframe has been loaded POG
            processIframe();

            stateMachine.disconnect();
            break;
        }
    }
}

//Built-in compatability feature for later down the line
//If Google decides to reshuffle their iframe order in the future, this will make the code work for a bit
function processIframe()
{
    import("./playSound.js")
        .then(sound => {
            Array.from(document.getElementsByTagName("iframe")).forEach((frameElement) => {
                //Some items don't have contentDocuments
                let foci = frameElement.contentDocument || frameElement.contentWindow;

                try
                {
                    foci.addEventListener("keypress", sound.playsound);
                }
                catch(err)
                {
                    //There's two iframes that will throw an error if we try to access it because it requires Google Account authorization
                    //And because of security features, Manifest v3 will be a pain in the ass and scream at us about it
                    //But that iframe doesn't matter so we'll just error handle it
                    console.log("Processed");
                }
            });
        });    
}