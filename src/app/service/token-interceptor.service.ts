import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService} from '../service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector :Injector) { }

  intercept(req,next){
    let authService =this.injector.get(AuthService)
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
