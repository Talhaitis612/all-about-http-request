import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request on its way');
        const modifiedRequest = req.clone({ headers: req.headers.append('Auth', 'XYZ') });
        return next.handle(modifiedRequest).pipe(tap(event=>{
            console.log(event);
            if(event.type ===HttpEventType.Response){
                console.log('Response arrived');
                console.log(event.body);

            }
        }));
    }
}