import { CLIENT_ID } from '../constants/Config';
import { GENRES_MAP, IMAGE_SIZES } from '../constants/SongConstants';

export function constructUrl(cat) {
  const catArr = cat.split(' - ');
  let category = catArr[0];
  let result = '//api.soundcloud.com/tracks?linked_partitioning=1&client_id=' +
    `${CLIENT_ID}&limit=50&offset=0`;

  if (category in GENRES_MAP) {
    if (category !== 'house'
    && category !== 'trance'
    && category !== 'dubstep') {
      category = `${category} house`;
    }

    result += `&tags=${category}`;
  } else {
    result += `&q=${category}`;
  }

  return result;
}

export function getImageUrl(s, size = null) {
  let str = s;
  if (!str) {
    return '';
  }

  str = str.replace('http:', '');

  switch (size) {
    case IMAGE_SIZES.LARGE:
      return str.replace('large', IMAGE_SIZES.LARGE);
    case IMAGE_SIZES.XLARGE:
      return str.replace('large', IMAGE_SIZES.XLARGE);
    default:
      return str;
  }
}
