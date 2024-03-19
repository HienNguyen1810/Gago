const getObject = async (path) => {
  return new Promise((resolve) => {
    $.getJSON(path, (data) => {
      resolve(data);
    });
  });
};

const moveItemsToStart = (array, n) => {
  // Check if the array has enough items
  if (array.length < n) {
    console.error("Not enough items in the array");
    return;
  }

  // Remove first items
  let itemsToMove = array.splice(array.length - n, array.length);

  // Add the removed items to the beginning of the array
  array.unshift(...itemsToMove);

  return array;
};

const updateTemoinBySizeScreen = (array) => {
  const windowWidth = $(window).width();
  // if (windowWidth > 992) return moveItemsToStart(array, 10);
  // if (windowWidth < 479) return moveItemsToStart(array, 0);
  return array;
};

const executeAddTemoin = async () => {
  const [dataTemoins, dataLanguages] = await Promise.all([
    getObject("./assets/data/data.json"),
    getObject("./assets/data/dataLanguage.json"),
  ]);
  dataTemoin = updateTemoinBySizeScreen(dataTemoins);
  languageOptions = dataLanguages;

  const temoinContainer = document.getElementById("temoinContainer");
  dataTemoin.forEach((temoin) => {
    const temoinDiv = document.createElement("div");
    temoinDiv.id = temoin.id;
    temoinDiv.className = temoin.class;
    temoinDiv.innerHTML = `
                  <div class="bloc-temoin bac3">
                      <img src="${temoin.image}" loading="lazy" sizes="100vw" class="image-2" />
                      <div class="bloc-text">
                          <div class="wrapper-btn-view-more">
                              <div class="row">
                                  <div class="col-12 w-col-tiny-8 p-0" style="text-align: left;">
                                      <h3 class="titre-temoin black">${temoin.title}</h3>
                                      <div id="${temoin.idContent}" class="texte-temoin">${temoin.content}</div>
                                  </div>
                                  <div class="viewMore" style="text-align: right;">
                                      <a target="_blank" href="${temoin.link}">
                                          <button class="btn-view-more link-view-more">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M14.43 5.92993L20.5 11.9999L14.43 18.0699" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                  <path d="M3.5 12H20.33" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                              </svg> <span class="view-more-content">View more</span>
                                          </button>
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              `;

    temoinContainer.appendChild(temoinDiv);
  });
};

executeAddTemoin();
