declare var require: any

var CryptoJS = require("crypto-js");

export function decryptData(ciphertextB64) {  
    // Base64 encoded ciphertext, 32 bytes string as key
    var keyString = "01234012345673456789895678901201";                            
    var key = CryptoJS.enc.Utf8.parse(keyString);                             // Convert into WordArray (using Utf8)
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);   // Use zero vector as IV
    var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, {iv: iv}); // By default: CBC, PKCS7 
    return decrypted.toString(CryptoJS.enc.Utf8);                       // Convert into string (using Utf8)
}
