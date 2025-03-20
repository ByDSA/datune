export type Channel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export function isValidChannelNumber(channelNumber: number): boolean {
  switch (channelNumber) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return true;
    default:
      return false;
  }
}

export function channelFromNumber(channelNumber: number): Channel | null {
  return isValidChannelNumber(channelNumber)
    ? channelNumber as Channel
    : null;
}
