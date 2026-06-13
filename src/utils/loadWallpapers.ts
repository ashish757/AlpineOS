import { type Wallpaper } from '../store/personalizationSlice';

export const loadWallpapers = () => {
  const globRes = import.meta.glob('../assets/wallpapers/*.{png,jpg,jpeg,webp}', { 
    eager: true, 
    import: 'default' 
  });
  
  const wallArr: Wallpaper[] = [];
  let idx = 1;

  for (const path in globRes) {
    const url = globRes[path] as string;
    const fName = path.split('/').pop() || '';
    const rawName = fName.split('.')[0];
    const fmtName = rawName
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    wallArr.push({
      id: `wall_${idx}`,
      name: fmtName,
      url: url,
      type: 'local'
    });
    
    idx++;
  }

  return wallArr;
};