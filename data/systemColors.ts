export const systemColors = [
  // gray
  [/*'#f9fafb', '#f4f5f7', '#e5e7eb', */ '#d2d6dc', '#9fa6b2', '#6b7280', '#4b5563', '#374151', '#252f3f', '#161e2e'],
  // cool-gray
  [/*'#f8fafc', '#f1f5f9', '#e2e8f0', */ '#cfd8e3', '#97a6ba', '#64748b', '#475569', '#364152', '#27303f', '#1a202e'],
  // red
  [/*'#fdf2f2', '#fde8e8', '#fbd5d5', */ '#f8b4b4', '#f98080', '#f05252', '#e02424', '#c81e1e', '#9b1c1c', '#771d1d'],
  // orange
  [
    /*'#fff8f1', '#feecdc', '#fcd9bd', */ '#fdba8c',
    '#ff8a4c',
    '#ff5a1f',
    '#d03801' /*, '#b43403', '#8a2c0d', '#73230d'*/,
  ],
  // yellow
  [
    /*'#fdfdea', '#fdf6b2', '#fce96a', */ '#faca15',
    '#e3a008',
    '#c27803',
    '#9f580a' /*, '#8e4b10', '#723b13', '#633112'*/,
  ],
  // green
  [
    /*'#f3faf7', '#def7ec', '#bcf0da', */ '#84e1bc',
    '#31c48d',
    '#0e9f6e',
    '#057a55' /*, '#046c4e', '#03543f', '#014737'*/,
  ],
  // teal
  [
    /*'#edfafa', '#d5f5f6', '#afecef', */ '#7edce2',
    '#16bdca',
    '#0694a2',
    '#047481' /*, '#036672', '#05505c', '#014451'*/,
  ],
  // blue
  [
    /*'#ebf5ff', '#e1effe', '#c3ddfd', */ '#a4cafe',
    '#76a9fa',
    '#3f83f8',
    '#1c64f2' /*, '#1a56db', '#1e429f', '#233876'*/,
  ],
  // indigo
  [
    /*'#f0f5ff', '#e5edff', '#cddbfe', */ '#b4c6fc',
    '#8da2fb',
    '#6875f5',
    '#5850ec' /*, '#5145cd', '#42389d', '#362f78'*/,
  ],
  // purple
  [
    /*'#f6f5ff', '#edebfe', '#dcd7fe', */ '#cabffd',
    '#ac94fa',
    '#9061f9',
    '#7e3af2' /*, '#6c2bd9', '#5521b5', '#4a1d96'*/,
  ],
  // pink
  [
    /*'#fdf2f8', '#fce8f3', '#fad1e8', */ '#f8b4d9',
    '#f17eb8',
    '#e74694',
    '#d61f69' /*, '#bf125d', '#99154b', '#751a3d'*/,
  ],
].reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
