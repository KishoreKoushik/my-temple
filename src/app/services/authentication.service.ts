import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';


const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private fireauth: AngularFireAuth) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
   }

   checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true); //TODO:what is next?
      }
    })
  }

  login(email, password) {
   return this.fireauth.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
    })
    // alert(123);
    // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
    //   this.authenticationState.next(true);
    // });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  signUp(email, password){
    this.fireauth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res.user) {
          console.log(res.user);
        }
      })
      .catch(err => {
        console.log(`signup failed ${err}`);
        //this.error = err.message;
      });
  }

  recover(email) {
  return this.fireauth.auth.sendPasswordResetEmail(email)
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }

  // logout() {
  //   this.fireauth.auth.signOut().then(() => {
  //     this.router.navigate(['/login']);
  //   })
  // }

  // updateUsername() {
  //   this.user.updateProfile({
  //     displayName: this.username
  //   })
  //     .then(() => {
  //       this.username = '';
  //       this.presentToast('Username updated', false, 'bottom', 1000);
  //       this.error = '';
  //     })
  //     .catch(err => {
  //       console.log(` failed ${err}`);
  //       this.error = err.message;
  //     });
  // }

  // updateImage() {
  //   this.user.updateProfile({
  //     photoURL: `https://picsum.photos/id/${this.image}/200/200`
  //   })
  //     .then(() => {
  //       this.image = null;
  //       this.presentToast('Image updated', false, 'bottom', 1000);
  //       this.error = '';
  //     })
  //     .catch(err => {
  //       console.log(` failed ${err}`);
  //       this.error = err.message;
  //     });
  // }

  // updateEmail() {
  //   user.updateEmail(this.email)
  //     .then(() => {
  //       this.email = '';
  //       this.presentToast('Email updated', false, 'bottom', 1000);
  //       this.error = '';
  //     })
  //     .catch(err => {
  //       console.log(` failed ${err}`);
  //       this.error = err.message;
  //     });
  // }

//   updatePassword() {
//     this.user.updatePassword(this.password)
//       .then(() => {
//         this.password = '';
//         this.presentToast('Password updated', false, 'bottom', 1000);
//         this.error = '';
//       })
//       .catch(err => {
//         console.log(` failed ${err}`);
//         this.error = err.message;
//       });
// }
}
