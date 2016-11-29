import { CLIENT_ID } from '../constants/Config';

export function formatSongTitle(str) {
  if (!str) {
    return '';
  }

  const arr = str.replace('–', '-').split(' - ');

  return arr[arr.length - 1].split(' (')[0];
}

export function formatStreamUrl(str) {
  return `${str}?client_id=${CLIENT_ID}`;
}
