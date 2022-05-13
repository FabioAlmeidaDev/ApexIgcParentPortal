export const color = (vp: string) => {
    if(!vp) return 'light-grey';
    
    switch(vp.toUpperCase()){
      case 'A':
        return 'pink';
      case 'B':
        return 'purple';
      case 'C':
        return 'indigo';
      case 'D':
        return 'blue';
      case 'E':
        return 'teal';
      case 'F':
        return 'light-green';
      case 'G':
        return 'orange';
      case 'H':
        return 'deep-orange';
      case 'I':
        return 'amber';
      case 'J':
        return 'red';

      default:
        return 'primary';
    }
};