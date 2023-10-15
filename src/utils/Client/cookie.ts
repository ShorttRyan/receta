export const eraseCookie = (name: string) => {   
  document.cookie = name+'=; Max-Age=-99999999;';  
};
