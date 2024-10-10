import axios from "axios"

import crypto from 'crypto';

// Hàm để tạo signature
const createSignature = (data, checksumKey) => {
    const baseString = `amount=${data.amount}&cancelUrl=${data.cancelUrl}&description=${data.description}&orderCode=${data.orderCode}&returnUrl=${data.returnUrl}`;
    return crypto.createHmac('sha256', checksumKey).update(baseString).digest('hex');
};
let sig = createSignature({ amount: 2000, cancelUrl: "https://www.facebook.com/", description: "-----------" + JSON.stringify({ userName: "test", type: "1" }) + "-----------", orderCode: 999999999999, returnUrl: 'https://www.facebook.com/' }, "5fdac1456772fbe0ed519f3194578d90d6299c8cb82275face801e250f210e11")

axios.post("https://api-merchant.payos.vn/v2/payment-requests",
    {
        orderCode: 999999999999,
        amount: 2000,
        description: "-----------" + JSON.stringify({ userName: "test", type: "1" }) + "-----------",
        cancelUrl: "https://www.facebook.com/",
        returnUrl: "https://www.facebook.com/",
        signature: sig,
        expiredAt: Math.floor(Date.now() / 1000) + 180,
    },
    {
        headers: {
            'x-client-id': '2e970a7d-4de1-419e-b3b2-d8f220c48bf2', // Thay thế bằng Client ID của bạn
            'x-api-key': '1238870f-7f36-4d92-a2cc-1bc8df36e403' // Thay thế bằng API Key của bạn
        }
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((e) => {
        console.log(e);
    })

// axios.get('https://api-merchant.payos.vn/v2/payment-requests/152464de08b141c9b1871a57a09ccf974', {
//     headers: {
//         'x-client-id': '2e970a7d-4de1-419e-b3b2-d8f220c48bf2', // Thay thế bằng Client ID của bạn
//         'x-api-key': '1238870f-7f36-4d92-a2cc-1bc8df36e403' // Thay thế bằng API Key của bạn
//     }
// })
//     .then((res) => {
//         console.log(res.data.data.transactions);

//     })