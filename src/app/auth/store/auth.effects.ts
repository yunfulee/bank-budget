import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface AuthReponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirec: true
  });
};

const handleError = (errorRes: any) => {
  let errorMsg = 'an unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new Authentions.AuthenticateFail(errorMsg);
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMsg = 'this email alrealy exit';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMsg = 'this email does not exit';
      break;

    case 'INVALID PASSWORD':
      errorMsg = 'this password is not correct';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMsg));
}

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthReponseData>(
        '' + environment.firebaseAPIKey, {
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true
      }
      ).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(+resData.expiresIn,
            resData.email,
            resData.localId,
            resData.idToken);
        }),
        catchError(errorRes => {
          return handleError(errorRes)
        })
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirec: false
        });
      }
      return { type: 'DUMMY' }

    })
  );

  @Effect()
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSucessAction: AuthActions.AuthenticateSuccess) => {
      if (authSucessAction.payload.redirec) {
        this.router.navigate(['/']);
      }
    })
  )

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['auth']);
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {

  }
}
