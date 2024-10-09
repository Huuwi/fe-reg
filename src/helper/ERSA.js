import { JSEncrypt } from 'jsencrypt';

async function encryptMessageOAEP(publicKeyPem, message) {
    // Convert PEM to ArrayBuffer
    const keyBuffer = Uint8Array.from(atob(publicKeyPem
        .replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g, '')
    ), c => c.charCodeAt(0)).buffer;

    // Import public key
    const publicKey = await window.crypto.subtle.importKey(
        'spki',
        keyBuffer,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256', // Sử dụng SHA-256
        },
        true,
        ['encrypt']
    );

    // Mã hóa message với RSA-OAEP
    const encodedMessage = new TextEncoder().encode(message);
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: 'RSA-OAEP'
        },
        publicKey,
        encodedMessage
    );

    return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}



const ERSA = async (message) => {


    let encrypted = "..."

    try {
        const response = await fetch('/public.pem');
        const publicKey = await response.text();


        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);

        encrypted = await encryptMessageOAEP(publicKey, message);

        return encrypted

    } catch (error) {
        console.error('err when ecc', error);
    }


};

export default ERSA;
