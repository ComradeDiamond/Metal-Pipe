//Confirms the initial funny storage setting. If it doesn't exist, make it metalPipe
chrome.storage.sync.get("currentSound")
    .then(soundName => {
        if (soundName && soundName.currentSound)
        {
            document.getElementById(soundName.currentSound).className = "chosen";
        }
        else
        {
            chrome.storage.sync.set({"currentSound": "metalPipe"})
                .then(() => {
                    document.getElementById("metalPipe").className = "chosen";
                })
        }
    });

//Initializes the popup
const ALL_SELECTIONS = Array.from(document.getElementById("selection").children);
ALL_SELECTIONS.forEach((selectionImg) => {
    selectionImg.addEventListener("click", (e) => {
        processSelection(e, selectionImg, selectionImg.id, ALL_SELECTIONS);
    });
});

/**
 * When user clicks on popup, process it
 * @param {MouseEvent} e Click event data
 * @param {HTMLImageElement} image HTML of the Image
 * @param {String} selectionName User's Selection
 * @param {HTMLImageElement[]} ALL_SELECTIONS Array of all image selections
 */
function processSelection(e, image, selectionName, ALL_SELECTIONS)
{
    //Revert CSS of all selections to normal
    ALL_SELECTIONS.forEach(image => {
        image.className = "";
    });

    //Add CSS to selected image
    image.className = "chosen";

    //Update current funny sound
    chrome.storage.sync.set({"currentSound": selectionName});
}