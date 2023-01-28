import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'XYZ') });
        return next.handle(modifiedRequest);
    }
}