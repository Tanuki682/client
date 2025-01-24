import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { LoadingService } from '../_servieces/loading.service'
import { delay, finalize } from 'rxjs'

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingServiec = inject(LoadingService)
  loadingServiec.loading()

  return next(req).pipe(
    // delay(2000),
    finalize(() => {
      loadingServiec.idle()
    })
  )
}
