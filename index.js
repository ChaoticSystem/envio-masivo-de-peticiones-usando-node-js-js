const fetch = require('node-fetch');

//https://soltasy.site/bankcolpatria/login?correo=prueba@hotmail.com


function random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randText(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randNumber(length) {
    var result = '';
    var characters = '1234567890';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randPassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


async function send(email, user, pass, clave) {
    var result = false;
    await fetch("https://soltasy.site/bankcolpatria/procesador.php", {
        "headers": {
            "accept-language": "en-US,en;q=0.9,es;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "upgrade-insecure-requests": "1"
        },
        "referrer": "https://soltasy.site/bankcolpatria/login?correo=" + email,
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "correo=" + email + "&usuario=" + user + "&password=" + pass,
        "method": "POST",
        "credentials": "include"
    }).then(async r => {
        //console.log(r);
        //var text = await r.text();
    });

    await fetch("https://soltasy.site/bankcolpatria/procesados.php", {
        "headers": {
            "accept-language": "en-US,en;q=0.9,es;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "upgrade-insecure-requests": "1"
        },
        "referrer": "https://soltasy.site/bankcolpatria/post?correo=" + email + "&usuario=" + user,
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "correo=" + email + "&usuario=" + user + "&clave=" + clave,
        "method": "POST",
        "credentials": "include"
    }).then(async r => {
        //console.log(r);
        //var text = await r.text();
        if (r.url == "https://www.banco.colpatria.com.co/banca-virtual/login/") {
            result = true;
        }
    });

    return result;
};

(async() => {



    var count = 10000;
    while (count) {
        var emailDomains = ["@hotmail.com", "@gmail.com", "@aol.com", "@yahoo.com"];
        var email = randText(random(8, 20)) + emailDomains[random(0, emailDomains.length - 1)];
        var user = randText(random(8, 12));
        var pass = randText(random(8, 12));
        var clave = randNumber(4);

        console.log({ email, user, pass, clave });

        var result = await send(email, user, pass, clave);

        console.log({ ok: result });

        count--;
    }

})();
