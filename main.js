import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {upload} from './upload.js'


const firebaseConfig = {
    apiKey: "AIzaSyCvQScWOdmOAh7sjh-fbOtfRPs-wmOF640",
    authDomain: "xraydiagnos.firebaseapp.com",
    projectId: "xraydiagnos",
    storageBucket: "xraydiagnos.appspot.com",
    messagingSenderId: "371080730510",
    appId: "1:371080730510:web:a8c2e0587e3a4f3a2ef6df"
  }
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files){
    files.forEach(file => {
        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', snapshot => {
        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
        const block = blocks[index].querySelector('.preview-info-progress')
        block.textContent = percentage
        block.style.width = percentage
      }, error => {
        console.log(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          console.log('Download URL:', url);
        })
      })
    })
  }
})