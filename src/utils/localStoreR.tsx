export const isTheme = () => {
    const a = JSON.parse(localStorage.getItem('theme') as string);
    
    if(!a)return false;

    return a
}