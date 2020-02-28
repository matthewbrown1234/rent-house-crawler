module.exports = () => {
    document.getElementById("filter-type").click();
    document.getElementById("residential").click();
    document.getElementById("filter-city").click();
    document.querySelector("#city-dropdown input[name='Fort Collins']").click();
    document.getElementById("filter-pets").click();
    document.querySelector("#pets-dropdown input[name='dogs']").click();
    document.querySelector("#pets-dropdown input[name='cats']").click();
    document.getElementById("apply-filters").click();
    const $allListingItems = $("#all-listings .listing-item");
    const $catsAndDogsListingItems = $allListingItems
        .filter((index, listingItem) => $(listingItem).find(".dogs").length > 0 && $(listingItem).find(".cats").length > 0);
    const rentalsRawInfo = $catsAndDogsListingItems.map((index, listingItem) => ({
        rawInfo: $($(listingItem).find(".info")[0])[0].textContent
    })).get();
    const houses = rentalsRawInfo.map(rental => {
        const rawInfoSplit = rental.rawInfo.split("\n");
        return {
            address: (rawInfoSplit[2] || "").trim(),
            price: (rawInfoSplit[1] || "").trim().substring(4),
            size: (rawInfoSplit[6] || "").trim(),
            available: (rawInfoSplit[11] || "").trim()
        };
    });
    return houses;
}