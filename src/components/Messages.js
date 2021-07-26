export default function getMessage(type) {
  const index = Math.floor(Math.random() * messages[type].length);
  return messages[type][index];
}
const messages = {
  "minusMessagesUser1": [
    {
      title: 'Normaldiir',
      text: 'Bazen olur öyle şeyler üzülme...',
    },
    {
      title: 'Sanmıyorum',
      text: 'Bidaha bakın genelde haklı oluyor bu kız',
    },
  ],
  "minusMessagesUser2": [
    {
      title: 'Yoğ öle bişe',
      text: 'Doğru bakın hata olmasın',
    },
    {
      title: 'HAYDAAA',
      text: 'Yine mi haksız la\nBu kadar da cahillik olmaz ki',
    },
  ],
  minusMessages: [
    {
      title: 'E YOK ARTIK',
      text: 'Bak emin misin?\nBence o kadar da haksız olamaz.',
    },
    {
      title: 'Nasıl eksiye inebilir ki?',
      text:
        'Hayır anlamıyorum,\nTamam belki haksızdır ama 0 ın altına da inmemiştir yav',
    },
    {
      title: 'Bunun olması imkansız',
      text: 'O düşer ama bu kadar da düşebileceğini hiç sanmıyorum...',
    },
    {
      title: 'Hele Hele',
      text: 'Neler deneniyor böyle bunlar hep şike',
    },
  ],
  "User1": [
    {
      title: 'Her şeyi bilmek nasıl bir duygu?',
    },
    {
      title: 'Nasıl be?',
      text: 'Nasıl bu kadar bilgili olabiliyorsunuz hanımefendi??',
    },
    {
      title: 'Avans bu',
      text: 'User2 avans vermiş olmalı aksi imkansız',
    },
  ],
  "User2": [
    {
      title: 'ehehehe',
      text: 'Her zaman haklı olması dışında\nçok büyük bir kazanç sayılmaz :)',
    },
    {
      title: 'Bunlar normal',
      text: 'Genel olan şeye şaşırmamak lazım tabi...',
    },
    {
      title: 'Aaa yine mi?',
      text: 'Nasıl ya niye hep User2 haklı çıkıyor?',
    },
  ],
};
