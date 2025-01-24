import { HttpInterceptorFn } from '@angular/common/http'
import { AccountService } from '../_services/account.service'
import { inject } from '@angular/core'

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountServicec = inject(AccountService)

  if (accountServicec.data()?.token) {
    req = req.clone({
      setHeaders: {
        authorization: 'Bearer ' + accountServicec.data()?.token
      }
    })
  }
  return next(req)
}
