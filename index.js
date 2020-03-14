
// Functions SDK para criar.
const functions = require('firebase-functions');

// Firebase Admin SDK para poder acessar o Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Pega o parametro de texto e envia para
// Realtime Database no caminho /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Pega o parametro.
    const original = req.query.text;
    // Envia para o Realtime Database usando o Firebase Admin SDK.
    const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redireciona usando o 303 SEE OTHER para o console do firebase onde a msg foi enviada.
    res.redirect(303, snapshot.ref.toString());
  });
  
  exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
  .onCreate((snapshot, context) => {
    // Pega o que foi enviado para o Realtime Database.
    const original = snapshot.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // Vc precisa retornar a Promise quando usar tarefas assincronas dentro das funçoes como
    // escrevendo dentro do Firebase Realtime Database.
    // Definindo "uppercase" como parente no Realtime Database retorna uma Promise.
    return snapshot.ref.parent.child('uppercase').set(uppercase);
  });

  exports.delDocuments = functions.https.onRequest(async (req, res) => {
    // Pega o ID da collection e do doc.
    const colid = req.query.col;
    const docid = req.query.doc;
    // Deleta o documento especificado usando o Firebase Admin SDK.
    db = admin.firestore();
    const snapshot = await db.collection(colid).doc(docid).delete();
	// Uso: /delDocuments?col=COLECAO&doc=DOC
  });