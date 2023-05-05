export async function fetchDataFromAPI(fetchOffset: number) {
  try {
    if (fetchOffset <= 1281) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${fetchOffset}&limit=20`
      );
      if (response) {
        return await response.json();
      }
    }
  } catch (e) {
    return e;
  }
  return null;
}

export async function getModalImg(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    return e;
  }
}

export async function getCardsImg(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    return e;
  }
}

export async function getTypesMenu(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    return e;
  }
}

export async function getSpecifyType(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    return e;
  }
}
