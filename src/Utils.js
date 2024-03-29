export const isURL = (t) => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    return t.match(regex);
}

export const getUSDZ = (t, isRealityFile = false, price = false) => {
    console.log("isRealityFile", isRealityFile);
    const reg = /\.(gltf|glb)$/gi;
    const suffix = price ? "#applePayButtonType=buy&checkoutTitle=Biplane%20Toy&checkoutSubtitle=Rustic%20finish%20with%20rotating%20propeller&price=$15" : "";
    return t.replace(reg, isRealityFile ? `.reality${suffix}` : `.usdz${suffix}`);
}
  
export const getGithubRawURL = (t) => {
    t = t.replace("github.com", "raw.githubusercontent.com");
    t = t.replace("/blob/", "/");
    return t;
}

export const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}